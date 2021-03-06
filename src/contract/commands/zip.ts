import { Command, flags } from '@oclif/command';
import { zip } from '../../logic/commands/zip';

export default class Apply extends Command {
  public static description = 'builds and zips the artifact';

  public static flags = {
    help: flags.help({ char: 'h' }),
    config: flags.string({
      char: 'c',
      description: 'path to the artifact config yml',
      required: true,
      default: 'artifact.yml',
    }),
  };

  public async run() {
    const { flags } = this.parse(Apply);
    const config = flags.config!;

    // define config path
    const absoluteConfigPath = config.slice(0, 1) === '/' ? config : `${process.cwd()}/${config}`; // if starts with /, consider it as an absolute path
    await zip({ absoluteConfigPath });
  }
}
