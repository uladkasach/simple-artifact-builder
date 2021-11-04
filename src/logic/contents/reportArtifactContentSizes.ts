import fs from 'fs';
import { assertThatArtifactContentsWereBuilt } from './assetThatArtifactContentsWereBuilt';
import prettyBytes from 'pretty-bytes';

const roundToHundredths = (x: number) => Math.round(100 * x) / 100;

export enum DirectoryContentType {
  FILE = 'FILE',
  DIRECTORY = 'DIRECTORY',
}
interface DirectoryContent {
  path: string;
  type: DirectoryContentType;
  sizeInBytes: number | null; // null for directory
}

const getDirectoryContents = async ({
  absoluteDirectoryPath,
}: {
  absoluteDirectoryPath: string;
}): Promise<DirectoryContent[]> => {
  const names = await fs.promises.readdir(absoluteDirectoryPath);
  const stats = await Promise.all(
    names.map(async (name) => ({
      name,
      path: `${absoluteDirectoryPath}/${name}`,
      stat: await fs.promises.stat(`${absoluteDirectoryPath}/${name}`),
    })),
  );
  return stats.map(
    ({ path, stat }): DirectoryContent => ({
      path,
      type: stat.isDirectory() ? DirectoryContentType.DIRECTORY : DirectoryContentType.FILE,
      sizeInBytes: stat.isDirectory() ? null : stat.size,
    }),
  );
};
const getDirectoryContentsRecursively = async ({
  absoluteDirectoryPath,
}: {
  absoluteDirectoryPath: string;
}): Promise<DirectoryContent[]> => {
  // lookup the contents of this directory
  const contents = await getDirectoryContents({ absoluteDirectoryPath });

  // pick out the file contents, since this already have a size and dont need further processing
  const immediatelyNestedFiles = contents.filter((content) => content.type === DirectoryContentType.FILE);

  // now get the contents of each nested directory + define a size for each of these directories based on their immediate children
  const immediatelyNestedDirectoriesWithoutSizes = contents.filter(
    (content) => content.type === DirectoryContentType.DIRECTORY,
  );
  const immediatelyNestedDirectoriesAndTheirRecursivelyNestedContentsWithSizes = (
    await Promise.all(
      immediatelyNestedDirectoriesWithoutSizes.map((nestedDirectory) =>
        getDirectoryContentsRecursively({ absoluteDirectoryPath: nestedDirectory.path }),
      ),
    )
  ).flat();

  // now define the immediate children of this directory
  const immediateContentsWithSizes = [
    ...immediatelyNestedFiles,
    ...immediatelyNestedDirectoriesAndTheirRecursivelyNestedContentsWithSizes.filter(
      (content) =>
        content.path
          .split('/')
          .slice(0, -1)
          .join('/') === absoluteDirectoryPath, // the directory that content is in === this directory
    ),
  ];

  // now define the size of this directory
  const thisDirectoryContent: DirectoryContent = {
    path: absoluteDirectoryPath,
    type: DirectoryContentType.DIRECTORY,
    sizeInBytes: immediateContentsWithSizes.reduce(
      (summary, thisContentFile) => summary + thisContentFile.sizeInBytes!,
      0,
    ), // add up the sizes of the immediate children
  };

  // now merge the contents and return them
  return [
    thisDirectoryContent,
    ...immediatelyNestedFiles,
    ...immediatelyNestedDirectoriesAndTheirRecursivelyNestedContentsWithSizes,
  ];
};

export const reportArtifactContentSizes = async ({ projectRootDirectory }: { projectRootDirectory: string }) => {
  const toAbsolutePath = (relativePath: string) => `${projectRootDirectory}/${relativePath}`;

  // check that contents to get stats about exist
  await assertThatArtifactContentsWereBuilt({ projectRootDirectory });

  // get file size of total contents directory
  const directoryContentsWithAbsolutePaths = await getDirectoryContentsRecursively({
    absoluteDirectoryPath: toAbsolutePath('.artifact/contents'),
  });

  // drop the project root directory from the paths
  const directoryContents = directoryContentsWithAbsolutePaths.map((content) => ({
    ...content,
    path: content.path
      .replace(`${projectRootDirectory}/.artifact/contents`, '')
      .replace(/^\//, '')
      .replace(/^$/, '.'), // at this point the root directories path is an empty string. update that to `.`
  }));

  // sort the directory contents by size
  const sortedDirectoryContents = directoryContents.sort((a, b) => (a.sizeInBytes! > b.sizeInBytes! ? -1 : 1));

  // and make the sizes human readable
  const totalSize = sortedDirectoryContents[0].sizeInBytes!;
  const sortedDirectoryContentsWithHumanReadableSizes = sortedDirectoryContents.map((content) => ({
    ...content,
    sizeInHuman: prettyBytes(content.sizeInBytes!),
    sizeInScale: `${roundToHundredths((content.sizeInBytes! / totalSize) * 100)}%`,
  }));

  // record the contents "manifest" (i.e., all of the files that are in the contents)
  await fs.promises.writeFile(
    toAbsolutePath('.artifact/contents.sizes.json'),
    JSON.stringify({ sizes: sortedDirectoryContentsWithHumanReadableSizes }, null, 2),
  );
};
