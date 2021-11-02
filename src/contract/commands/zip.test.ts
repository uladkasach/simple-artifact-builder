import { apply } from '../../logic/commands/zip';
import SimpleArtifactBuilder from './zip';

jest.mock('../../logic/commands/apply');
const applyMock = apply as jest.Mock;

describe('generate', () => {
  it('should call the apply command logic', async () => {
    await SimpleArtifactBuilder.run(['-c', '/some/path/to/use']);
    expect(applyMock).toBeCalledTimes(1);
    expect(applyMock).toHaveBeenCalledWith({
      usePracticesConfigPath: '/some/path/to/use',
    });
  });
});
