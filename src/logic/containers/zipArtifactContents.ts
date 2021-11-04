import archiver from 'archiver';
import fs from 'fs';
import { assertThatArtifactContentsWereBuilt } from '../contents/assetThatArtifactContentsWereBuilt';
import { UserInputError } from '../UserInputError';

/**
 * zips a directory
 *
 * ref: https://stackoverflow.com/a/51518100/3068233
 */
const zipDirectory = ({ source, destination }: { source: string; destination: string }) => {
  const archive = archiver('zip', { zlib: { level: 9 } });
  const stream = fs.createWriteStream(destination);
  return new Promise((resolve, reject) => {
    archive
      .directory(source, false)
      .on('error', (err) => reject(err))
      .pipe(stream);
    stream.on('close', () => resolve(true));
    archive.finalize();
  });
};

export const zipArtifactContents = async ({ projectRootDirectory }: { projectRootDirectory: string }) => {
  const toAbsolutePath = (relativePath: string) => `${projectRootDirectory}/${relativePath}`;

  // check that artifact contents exist
  await assertThatArtifactContentsWereBuilt({ projectRootDirectory });

  // zip the contents
  await zipDirectory({
    source: toAbsolutePath('.artifact/contents'),
    destination: toAbsolutePath('.artifact/contents.zip'),
  });
};
