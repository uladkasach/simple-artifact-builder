import path from 'path';
import { UserInputError } from '../UserInputError';

/**
 * reads an existing nft json file and normalizes the traced file paths such that they're all relative to the projectRootDirectory
 */
export const readExistingTraceOutputFile = async ({
  projectRootDirectory,
  existingTraceOutputFilePath,
}: {
  projectRootDirectory: string;
  existingTraceOutputFilePath: string;
}): Promise<string[]> => {
  // load the file by json
  const absolutePathOfTraceOutputFile = `${projectRootDirectory}/${existingTraceOutputFilePath}`;
  const contents = await import(absolutePathOfTraceOutputFile);
  if (!contents.files || !Array.isArray(contents.files))
    throw new UserInputError(`invalid trace output file detected: ${existingTraceOutputFilePath}`, {
      potentialSolution:
        'make sure that file outputs a `files` array of dependency files. are you sure the file was generated with @vercel/nft?',
    });
  const tracedFilePathsRelativeToTraceOutputFile = contents.files as string[];

  // now get absolute paths of the traced files, relative to the file the dir of the trace output
  const traceOutputFileDirectory = absolutePathOfTraceOutputFile
    .split('/')
    .slice(0, -1) // drop the file name portion, keeping just the directory
    .join('/');
  const absolutePathsOfTracedFiles = tracedFilePathsRelativeToTraceOutputFile.map((tracedFilePath) =>
    path.resolve(traceOutputFileDirectory, tracedFilePath),
  );

  // now make those paths relative to the project root directory
  const tracedFilePaths = absolutePathsOfTracedFiles.map(
    (absoluteTracedFilePath) => absoluteTracedFilePath.replace(`${projectRootDirectory}/`, ''), // remove the prefix of the project dir
  );
  return tracedFilePaths.sort();
};
