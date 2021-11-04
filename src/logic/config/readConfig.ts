import { ArtifactConfig } from '../../domain';
import { readYmlFile } from '../../utils/fileio/readYmlFile';

export const readConfig = async ({ absoluteConfigPath }: { absoluteConfigPath: string }) => {
  const projectRootDirectory = absoluteConfigPath
    .split('/')
    .slice(0, -1)
    .join('/'); // drop the file name
  const ymlContents = await readYmlFile({ filePath: absoluteConfigPath });
  return {
    projectRootDirectory,
    config: new ArtifactConfig({
      trace: ymlContents.trace ?? [],
      pick: ymlContents.pick ?? [],
    }),
  };
};
