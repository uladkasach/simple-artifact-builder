import fastGlob from 'fast-glob';

export const defineAllPickedFilesSpecified = async ({
  projectRootDirectory,
  pickFileGlobs,
}: {
  projectRootDirectory: string;
  pickFileGlobs: string[];
}) => {
  // run glob against each glob given and pull back the files specified
  const filePaths = await fastGlob(pickFileGlobs, { cwd: projectRootDirectory });
  return filePaths.sort();
};
