import { zip } from '../../logic/commands/zip';
import SimpleArtifactBuilder from './zip';

jest.mock('../../logic/commands/zip');
const zipMock = zip as jest.Mock;

describe('generate', () => {
  it('should call the apply command logic', async () => {
    await SimpleArtifactBuilder.run(['-c', '/some/path/to/use']);
    expect(zipMock).toBeCalledTimes(1);
    expect(zipMock).toHaveBeenCalledWith({
      absoluteConfigPath: '/some/path/to/use',
    });
  });
});
