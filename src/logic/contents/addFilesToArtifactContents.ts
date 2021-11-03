import fs from 'fs';
import { UserInputError } from '../UserInputError';

const checkFileExists = (file: string) => {
  return fs.promises
    .access(file, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);
};

/**
 * copies over the files specified into the artifact contents directory, ready for zipping up
 *
 * note: ideally this function is only called once so that you can be sure that there are no duplicate requests, for performance (i.e., no one asks to move the same file more than once)
 */
export const addFilesToArtifactContents = async ({
  projectRootDirectory,
  relativeFilePaths,
}: {
  projectRootDirectory: string;
  relativeFilePaths: string[];
}) => {
  const toAbsolutePath = (relativePath: string) => `${projectRootDirectory}/${relativePath}`;

  // target directory
  const targetDirectory = '.artifact/contents';
  await fs.promises.mkdir(toAbsolutePath(targetDirectory), { recursive: true }); // find or create the target dir

  // record the contents "manifest" (i.e., all of the files that are in the contents)
  await fs.promises.writeFile(
    toAbsolutePath('.artifact/contents.manifest.json'),
    JSON.stringify({ files: relativeFilePaths }, null, 2),
  );

  // copy over the files to the target dir
  const nonExistentSourceFilePaths: string[] = [];
  await Promise.all(
    relativeFilePaths.map(async (sourceRelativeFilePath) => {
      const destinationRelativeFilePath = `${targetDirectory}/${sourceRelativeFilePath}`;

      // check that the file exists
      const existsSourceFile = await checkFileExists(toAbsolutePath(sourceRelativeFilePath));
      if (!existsSourceFile) {
        nonExistentSourceFilePaths.push(sourceRelativeFilePath);
        return; // stop here if it doesn't exist
      }

      // create the dir in the target directory for the file
      await fs.promises.mkdir(
        toAbsolutePath(destinationRelativeFilePath)
          .split('/')
          .slice(0, -1)
          .join('/'),
        {
          recursive: true,
        },
      );

      // move the file into it
      await fs.promises.copyFile(toAbsolutePath(sourceRelativeFilePath), toAbsolutePath(destinationRelativeFilePath));
    }),
  );

  // if any of the files did not exist, throw an error now
  if (nonExistentSourceFilePaths.length)
    throw new UserInputError('not all of the dependencies identified as required were found when building artifact', {
      potentialSolution: `please track down the following missing files: ${[
        '',
        ...nonExistentSourceFilePaths.slice(0, 21),
        ...(nonExistentSourceFilePaths.length > 21 ? ['...'] : []), // add `...` as last row if more than 21 imports missing
      ].join('\n - ')}`,
    });
};
