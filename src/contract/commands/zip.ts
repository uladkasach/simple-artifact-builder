import { Command, flags } from '@oclif/command';
import { apply } from '../../logic/commands/apply';

export default class Apply extends Command {
  public static description =
    "apply fixes to all files which have failed to adhere to any of the project's declared practices and have an automatic fix available.";

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
    const configPath = config.slice(0, 1) === '/' ? config : `${process.cwd()}/${config}`; // if starts with /, consider it as an absolute path
    await apply({ configPath, });
  }
}
