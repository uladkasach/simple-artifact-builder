import { TEST_ASSETS_DIRECTORY } from '../__test_assets__/testAssetsDirectory';
import { readConfig } from './readConfig';

describe('readConfig', () => {
  it('should be able to read a valid config file', async () => {
    const projectRootDirectory = `${TEST_ASSETS_DIRECTORY}/lambda-project-simple-deps-with-config`;
    const { config, projectRootDirectory: detectedProjectRootDirectory } = await readConfig({
      absoluteConfigPath: `${projectRootDirectory}/artifact.yml`,
    });
    expect(config).toEqual({
      trace: ['dist/handler.js'],
      pick: ['config/*.json'],
    });
    expect(detectedProjectRootDirectory).toEqual(projectRootDirectory);
  });
});
