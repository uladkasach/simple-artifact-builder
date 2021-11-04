import { removeFileAsync } from '../../utils/fileio/removeFileAsync';
import { listFilesInDirectory } from '../../utils/filepaths/listFilesInDirectory';
import { log } from '../../utils/logger';
import { TEST_ASSETS_DIRECTORY } from '../__test_assets__/testAssetsDirectory';
import { zip } from './zip';

const logSpy = jest.spyOn(console, 'log').mockImplementation(() => log.debug); // swap to log debug so its not displaying during tests by default

describe('apply', () => {
  beforeEach(() => jest.clearAllMocks());
  it('should be able to apply for an example project', async () => {
    const projectRootDirectory = `${TEST_ASSETS_DIRECTORY}/lambda-project-simple-deps-with-config`;

    // delete the generated files to get the testing environment to a clean state
    const autoGeneratedFilesInDirectory = [
      '.artifact/contents.manifest.json',
      '.artifact/contents.sizes.json',
      '.artifact/contents.zip',
    ];
    const filesInDirectory = await listFilesInDirectory({ directory: projectRootDirectory });
    await Promise.all(
      filesInDirectory
        .filter((path) => autoGeneratedFilesInDirectory.includes(path))
        .map((path) => removeFileAsync({ path: `${projectRootDirectory}/${path}` })),
    );

    // now apply
    await zip({
      absoluteConfigPath: `${projectRootDirectory}/artifact.yml`,
    });
    expect(logSpy.mock.calls).toMatchSnapshot(); // log an example of what the user will see

    // and check that the autogenerated files now exist
    const filesInDirectoryNow = await listFilesInDirectory({ directory: projectRootDirectory });
    autoGeneratedFilesInDirectory.forEach((file) => expect(filesInDirectoryNow).toContain(file));
  });
});
