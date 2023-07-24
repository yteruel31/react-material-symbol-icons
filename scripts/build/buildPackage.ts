import path from 'path';
import chalk from 'chalk';
import { Logger } from '../utils/Logger';
import packageFile from '../../package.json';
import { generateDts } from '../utils/generate-dts';
import { compile } from '../utils/compile';
import { createRollupConfig } from './createRollupConfig';

const logger = new Logger('build-package');

export interface BuildOptions {
  sourcemap: boolean;
  minify: boolean;
  formats: string[];
}

export const buildPackage = async (options: BuildOptions) => {
  const rootPath = path.join(__dirname, '../..');

  logger.info(`Build ${packageFile.name}`);

  try {
    await generateDts(rootPath);

    for (const format of options?.formats) {
      const config = await createRollupConfig({
        ...options,
        basePath: rootPath,
        format,
      });

      logger.info(`Building to ${chalk.cyan(format)} format...`);
      await compile(config);
    }
  } catch (e) {
    logger.error(`Failed to compile package: ${chalk.cyan(packageFile.name)}`);
    process.stdout.write(`${e.toString('minimal')}\n`);
    process.exit(1);
  }
};
