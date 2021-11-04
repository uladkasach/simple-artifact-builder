import fs from 'fs';
import { TEST_ASSETS_DIRECTORY } from '../__test_assets__/testAssetsDirectory';
import { reportArtifactContentSizes } from './reportArtifactContentSizes';

describe('reportArtifactContentsSize', () => {
  it('should be able to report the size of an artifact contents directory, with total + all files/dirs over 5% size showing', async () => {
    const projectRootDirectory = `${TEST_ASSETS_DIRECTORY}/nextjs-mui-project-next-dir-for-sizing`;
    const targetOutputFilePath = `${projectRootDirectory}/.artifact/contents.sizes.json`;

    // remove the previous file if it exists
    await fs.promises.unlink(targetOutputFilePath).catch(() => {}); // do nothing on error, e.g., if file didn't already exist

    // generate the file
    await reportArtifactContentSizes({ projectRootDirectory });

    // check its contents
    const contents = JSON.parse((await fs.promises.readFile(targetOutputFilePath, { encoding: 'utf8' })) as string) as {
      sizes: any[];
    };
    expect(contents.sizes.length).toBeGreaterThan(1);
    expect(contents).toMatchSnapshot(); // log the example
  });
});
