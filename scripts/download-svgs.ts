import path from 'path';
import fetch from 'cross-fetch';
import fse from 'fs-extra';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { Logger } from './utils/Logger';
import Queue from './utils/Queue';
import retry from './utils/retry';
import sleep from './utils/sleep';

export interface Icon {
  index: number;
  name: string;
  version: number;
  popularity: number;
  codepoint: number;
  unsupported_families: any[];
  categories: string[];
  tags: string[];
  sizes_px: number[];
}

const logger = new Logger('download-svgs');

const { argv }: { argv: any } = yargs(hideBin(process.argv))
  .usage('Usage: $0 [options]')
  .option('startIndex', {
    type: 'number',
    default: 0,
    description: 'Resume at the following index',
  });

const currentDirectory = __dirname;

const themeMap = {
  baseline: '', // filled
  outline: '_outlined',
  round: '_round',
  sharp: '_sharp',
};

const themeFileMap = {
  baseline: '', // filled
  outline: '_outlined',
  round: '_rounded',
  sharp: '_sharp',
};

const downloadIcon = (icon) => {
  logger.info(`DownloadIcon ${icon.index}: ${icon.name}`);

  return Promise.all(
    Object.keys(themeMap).map(async (theme) => {
      const formattedTheme = themeMap[theme].split('_').join('');
      const response = await fetch(
        `https://fonts.gstatic.com/s/i/materialicons${formattedTheme}/${icon.name}/v${icon.version}/24px.svg`,
      );
      if (response.status !== 200) {
        throw new Error(`status ${response.status}`);
      }
      const SVG = await response.text();
      await fse.writeFile(
        path.join(
          currentDirectory,
          `../svg-icons/${icon.name}${themeFileMap[theme]}.svg`,
        ),
        SVG,
      );
    }),
  );
};

(async () => {
  try {
    await fse.emptyDir(path.join(currentDirectory, '../svg-icons'));
    const response = await fetch('https://fonts.google.com/metadata/icons');
    const text = await response.text();
    const data = JSON.parse(text.replace(")]}'", ''));
    let icons: Icon[] = data.icons;
    icons = icons.map((icon, index) => ({ index, ...icon }));
    icons = icons.splice(argv.startAfter || 0);
    const queue = new Queue<Icon>(
      async (icon) => {
        await retry(async ({ tries }) => {
          await sleep((tries - 1) * 100);
          await downloadIcon(icon);
        });
      },
      { concurrency: 5 },
    );
    queue.push(icons);
    await queue.wait({ empty: true });
    logger.success(`All icons downloaded: ${icons.length} icons`);
  } catch (err) {
    logger.error("Couldn't download icons");
    console.error(err);
    process.stdout.write(`${err.toString('minimal')}\n`);
    process.exit(1);
  }
})();
