import chalk from 'chalk';
import { readConfig } from '../config/readConfig';
import { zipArtifactContents } from '../containers/zipArtifactContents';
import { buildArtifactContents } from '../contents/buildArtifactContents';

export const zip = async ({ absoluteConfigPath }: { absoluteConfigPath: string }) => {
  // read the config
  console.log('🔎 reading config...'); // tslint:disable-line: no-console
  const { config, projectRootDirectory } = await readConfig({ absoluteConfigPath });

  // build the artifact
  console.log('🔨 building artifact...'); // tslint:disable-line: no-console
  await buildArtifactContents({ projectRootDirectory, config });

  // zip the artifact
  console.log('🗜️  zipping artifact...'); // tslint:disable-line: no-console
  await zipArtifactContents({ projectRootDirectory });

  console.log(`🎉 done! ${chalk.grey('(.artifact/contents.zip)')}`); // tslint:disable-line: no-console
};
