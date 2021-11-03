import { TEST_ASSETS_DIRECTORY } from '../__test_assets__/testAssetsDirectory';
import { defineAllPickedFilesSpecified } from './defineAllPickedFilesSpecified';

describe('defineAllPickedFilesSpecified', () => {
  it('should be possible to pick all of the files in a .next directory excluding the cache files', async () => {
    const filePaths = await defineAllPickedFilesSpecified({
      projectRootDirectory: `${TEST_ASSETS_DIRECTORY}/nextjs-mui-project-next-dir-only`,
      pickFileGlobs: ['.next/**/*', '!.next/cache/**/*'],
    });
    expect(filePaths.length).toBeGreaterThan(1);
    expect(filePaths.filter((path) => path.includes('cache/')).length).toEqual(0); // should not have included any of the cache files
  });
});
