import { UserInputError } from '../UserInputError';
import { TEST_ASSETS_DIRECTORY } from '../__test_assets__/testAssetsDirectory';
import { defineAllTracedFilesSpecified } from './defineAllTracedFilesSpecified';

describe('defineALlTracedFilesSpecified', () => {
  it('should throw a helpful error message if it finds that the user requested tracing of a file that is not supported', async () => {
    try {
      await defineAllTracedFilesSpecified({
        projectRootDirectory: `${TEST_ASSETS_DIRECTORY}/lambda-project-simple-deps`,
        traceFileGlobs: ['dist/**/*'],
      });
      throw new Error('should not reach here');
    } catch (error) {
      expect(error).toBeInstanceOf(UserInputError);
      expect((error as UserInputError).message).toMatchSnapshot(); // it should look good
    }
  });
  it('should correctly trace files + dependencies of files that we have to run tracing on ourselves', async () => {
    const filePaths = await defineAllTracedFilesSpecified({
      projectRootDirectory: `${TEST_ASSETS_DIRECTORY}/lambda-project-simple-deps`,
      traceFileGlobs: ['dist/handler.js'],
    });
    expect(filePaths.length).toBeGreaterThan(1);
    expect(filePaths).toContain('dist/handler.js');
    expect(filePaths).toContain('dist/server.js');
    expect(filePaths).toContain('package.json');
  });
  it('should correctly trace dependencies of files that were specified by existing nft.json trace output files', async () => {
    const filePaths = await defineAllTracedFilesSpecified({
      projectRootDirectory: `${TEST_ASSETS_DIRECTORY}/nextjs-mui-project-next-dir-only`,
      traceFileGlobs: ['.next/**/*.nft.json'],
    });
    expect(filePaths.length).toBeGreaterThan(1);
    expect(filePaths).toMatchSnapshot(); // save an example
  });
  it('should combine both trace dependencies of existing trace output files and of files we need to trace', async () => {
    const filePaths = await defineAllTracedFilesSpecified({
      projectRootDirectory: `${TEST_ASSETS_DIRECTORY}/nextjs-mui-project-next-dir-only`,
      traceFileGlobs: ['dist/handler.js', '.next/**/*.nft.json'],
    });
    expect(filePaths.length).toBeGreaterThan(1);
    expect(filePaths).toContain('dist/handler.js'); // to show that it did grab the handler
    expect(filePaths).toContain('dist/server.js'); // to show that it did grab the handler's dependency
    expect(filePaths).toContain('.next/server/webpack-runtime.js'); // to show it did grab the .next directory things
    expect(filePaths).toMatchSnapshot(); // save an example
  });
});
