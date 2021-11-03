import fastGlob from 'fast-glob';
import { TEST_ASSETS_DIRECTORY } from '../__test_assets__/testAssetsDirectory';
import { addFilesToArtifactContents } from './addFilesToArtifactContents';
import { clearArtifactDirectory } from './clearArtifactDirectory';

describe('addFilesToArtifactContents', () => {
  it('should be able to add nested files into an artifact directory that doesnt even exist yet', async () => {
    const projectRootDirectory = `${TEST_ASSETS_DIRECTORY}/project-with-files-to-test-adding-to-artifact`;

    // make sure the artifact directory doesn't exist yet to run from a clean slate
    await clearArtifactDirectory({ projectRootDirectory });

    // add files to the artifact directory
    await addFilesToArtifactContents({
      projectRootDirectory,
      relativeFilePaths: ['src/thingA.ts', 'mode_nodules/simple-thing-doer/src/index.js'],
    });

    // now check that we moved them successfully, and only them
    const movedFiles = await fastGlob('.artifact/contents/**/*', {
      cwd: projectRootDirectory,
    });
    expect(movedFiles).toContain('.artifact/contents/src/thingA.ts');
    expect(movedFiles).toContain('.artifact/contents/mode_nodules/simple-thing-doer/src/index.js');
    expect(movedFiles).not.toContain('.artifact/contents/dist/logic/thingB.js');
  });
});
