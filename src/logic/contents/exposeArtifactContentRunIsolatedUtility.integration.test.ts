import fs from 'fs';
import { TEST_ASSETS_DIRECTORY } from '../__test_assets__/testAssetsDirectory';
import { exposeArtifactContentRunIsolatedUtility } from './exposeArtifactContentRunIsolatedUtility';

describe('exposeARtifactContentRunIsolatedUtility', () => {
  it('should create the run isolated utility file', async () => {
    const projectRootDirectory = `${TEST_ASSETS_DIRECTORY}/empty-artifact-directory-for-run-isolated-util`;
    const targetOutputFilePath = `${projectRootDirectory}/.artifact/contents.run.isolated.js`;

    // delete the file if it already exists from a previous test
    await fs.promises.unlink(targetOutputFilePath).catch(() => {}); // do nothing on error, e.g., if file didn't already exist

    // provision the file
    await exposeArtifactContentRunIsolatedUtility({ projectRootDirectory });

    // check it is correct
    const contents = await fs.promises.readFile(targetOutputFilePath, { encoding: 'utf8' });
    expect(contents).toContain('🚧 this is a utility to aid in testing your artifacts 🚧');
  });
});
