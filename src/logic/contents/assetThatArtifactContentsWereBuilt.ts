import fs from 'fs';
import { UserInputError } from '../UserInputError';

export const assertThatArtifactContentsWereBuilt = async ({
  projectRootDirectory,
}: {
  projectRootDirectory: string;
}) => {
  const toAbsolutePath = (relativePath: string) => `${projectRootDirectory}/${relativePath}`;

  // check that artifact contents exist
  const artifactContentsExist = await fs.promises
    .stat(toAbsolutePath('.artifact/contents'))
    .then(() => true)
    .catch(() => false);
  if (!artifactContentsExist)
    throw new UserInputError(
      'no .artifact/contents directory was found. are you sure you built the artifact contents first?',
    );
};
