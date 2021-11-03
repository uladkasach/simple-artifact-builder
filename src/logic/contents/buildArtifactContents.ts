import { Config } from '../../domain';
import { addFilesToArtifactContents } from './addFilesToArtifactContents';
import { defineAllPickedFilesSpecified } from './defineAllPickedFilesSpecified';
import { defineAllTracedFilesSpecified } from './defineAllTracedFilesSpecified';

export const buildArtifactContents = async ({
  projectRootDirectory,
  config,
}: {
  projectRootDirectory: string;
  config: Config;
}) => {
  // resolve all of the picked files specified
  const pickedFilesSpecified = await defineAllPickedFilesSpecified({
    projectRootDirectory,
    pickFileGlobs: config.pick,
  });

  // resolve all of the traced files specified
  const tracedFilesSpecified = await defineAllTracedFilesSpecified({
    projectRootDirectory,
    traceFileGlobs: config.trace,
  });

  // merge all of the files specified
  const relativeFilePaths = [...new Set([...pickedFilesSpecified, ...tracedFilesSpecified])].sort();

  // add them all to artifact contents
  await addFilesToArtifactContents({
    projectRootDirectory,
    relativeFilePaths,
  });
};
