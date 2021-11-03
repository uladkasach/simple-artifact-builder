import fs from 'fs';

/**
 * clears out the artifact directory so we can start from a blank slate
 */
export const clearArtifactDirectory = async ({ projectRootDirectory }: { projectRootDirectory: string }) => {
  // make sure the artifact directory doesn't exist yet to run from a clean slate
  await fs.promises.rmdir(`${projectRootDirectory}/.artifact`, { recursive: true });
};
