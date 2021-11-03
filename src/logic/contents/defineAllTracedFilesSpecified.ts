import { nodeFileTrace } from '@vercel/nft';

import { UserInputError } from '../UserInputError';
import { defineAllPickedFilesSpecified } from './defineAllPickedFilesSpecified';
import { readExistingTraceOutputFile } from './readExistingTraceOutputFile';

export const defineAllTracedFilesSpecified = async ({
  projectRootDirectory,
  traceFileGlobs,
}: {
  projectRootDirectory: string;
  traceFileGlobs: string[];
}) => {
  // pick out all of the files specified by the trace file globs
  const filesToTrace = await defineAllPickedFilesSpecified({ projectRootDirectory, pickFileGlobs: traceFileGlobs });

  // split the files between the ones we need to trace for + the ones that are already trace outputs
  const filesToRunTracingFor = filesToTrace.filter((fileToTrace) => fileToTrace.endsWith('.js')); // if it ends with .js, we need to trace it _and_ follow the dependencies
  const filesToUseTracingOf = filesToTrace.filter((fileToTrace) => fileToTrace.endsWith('.nft.json')); // if it ends with .nft.json, it is already the output of tracing and we can just follow the dependencies

  // log out if we find a file that was specified for tracing can not be traced (because its not supported)
  const filesNotCapableOfTracing = filesToTrace.filter(
    (fileToTrace) => !filesToRunTracingFor.includes(fileToTrace) && !filesToUseTracingOf.includes(fileToTrace), // if its not included in either of the two lists, then we cant run tracing for it
  );
  if (filesNotCapableOfTracing.length)
    throw new UserInputError('files specified for tracing on which tracing can not be run', {
      potentialSolution: `only '.js' files and '.nft.json' files are usable for tracing. please review: ${[
        '',
        ...filesNotCapableOfTracing,
      ].join('\n - ')}`,
    });

  // now for each of those files, define whether we can trace for that file
  const filesTracedByRunningTracing = (
    await nodeFileTrace(
      filesToRunTracingFor.map((relativePath) => `${projectRootDirectory}/${relativePath}`),
      {
        base: projectRootDirectory, // returns file paths relative to this dir
        processCwd: projectRootDirectory, // uses this dir as `process.cwd()` inside
      },
    )
  ).fileList;

  // now load all of the dependencies of the `.nft.json` files
  const filesTracedByUsingExistingTraceOutputs: string[] = (
    await Promise.all(
      filesToUseTracingOf.map((existingTraceOutputFilePath) =>
        readExistingTraceOutputFile({ projectRootDirectory, existingTraceOutputFilePath }),
      ),
    )
  ).flat();

  // now dedupe all of the files that were traced and return those
  return [
    ...new Set([
      ...filesToRunTracingFor, // the files that we were asked to run tracing for
      ...filesTracedByRunningTracing, // the files that were traced as dependencies
      ...filesTracedByUsingExistingTraceOutputs, // the files that were reported as dependencies by pre-existing trace files
    ]),
  ].sort();
};
