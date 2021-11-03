import fs from 'fs';
import { UserInputError } from '../UserInputError';

import { TEST_ASSETS_DIRECTORY } from '../__test_assets__/testAssetsDirectory';
import { buildArtifactContents } from './buildArtifactContents';
import { clearArtifactDirectory } from './clearArtifactDirectory';

describe('buildArtifactContents', () => {
  it('should be able to build artifact contents for a next.js project using nexts outputted trace files + user server files', async () => {
    const projectRootDirectory = `${TEST_ASSETS_DIRECTORY}/nextjs-mui-project-next-dir-for-building`;

    // make sure the artifact directory doesn't exist yet to run from a clean slate
    await clearArtifactDirectory({ projectRootDirectory });

    // run it
    try {
      await buildArtifactContents({
        projectRootDirectory,
        config: {
          trace: [
            'dist/handler.js', // include all dependencies of the handler,
            '.next/**/*.nft.json', // include all of the dependencies of the .next server (includes dependencies for server-side-rendering, e.g., mui)
            '!.next/cache/**/*', // exclude the cache though, since that's only needed while compiling and is very large/heavy
          ],
          pick: [
            '.next/**/*', // include this whole directory, since the nextjs-server-side-rendering server uses its contents through dynamic imports
            '!.next/cache/**/*', // exclude the cache though, since that's only needed while compiling and is very large/heavy
          ],
        },
      });
      throw new Error('should not reach here');
    } catch (error) {
      // we expect an error because the node modules are not there
      expect(error).toBeInstanceOf(UserInputError);
      expect((error as UserInputError).message).toContain(
        'Not all of the dependencies identified as required were found when building artifact',
      );
    }

    // but we can still check that it would have outputted all the files desired from the manifest
    const artifactContentsManifest: string = await fs.promises.readFile(
      `${projectRootDirectory}/.artifact/contents.manifest.json`,
      { encoding: 'utf8' },
    );
    const artifactContentsFiles: string[] = JSON.parse(artifactContentsManifest).files;
    expect(artifactContentsFiles).toContain('dist/handler.js'); // the traced file
    expect(artifactContentsFiles).toContain('dist/server.js'); // atleast one dependency of the traced file
    expect(artifactContentsFiles).toContain('.next/BUILD_ID'); // atleast one of the picked files
    expect(artifactContentsFiles).toContain('node_modules/@emotion/cache/package.json'); // atleast one of the existing trace output files dependencies
    expect(artifactContentsFiles).not.toContain('.next/node_modules/chalk/index.js'); // the .next/node_modules is the bug that we've seen, should just be node_modules; (note, we saw this when we included the .next/cache/... .nft.json files, so solution is just to exclude that)
    expect(artifactContentsFiles).toMatchSnapshot();
  });
});
