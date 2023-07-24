import path, { basename, resolve } from 'path';
import fse from 'fs-extra';
import { INode, parseSync } from 'svgson';

import { toPascalCase } from './string.formatter';

export type SvgOutput = {
  name: string;
  namePascal: string;
  obj: INode;
  filled: boolean;
  contents: any;
  path: string;
};

const isFilled = (filename: string) => {
  return filename.endsWith('fill');
};

export const readSvgDirectory = async (directory) => {
  const files = await fse.readdir(directory);

  return files.filter((file) => path.extname(file) === '.svg');
};
export const readSvg = async (fileName, directory) => {
  return fse.readFile(path.join(directory, fileName), 'utf-8');
};
export const readSvgs = async (svgDir: string) => {
  const svgFiles = await readSvgDirectory(svgDir);

  return Promise.all(
    svgFiles.map(async (svgFile) => {
      const name = basename(svgFile, '.svg'),
        filled = isFilled(name),
        namePascal = toPascalCase(name),
        contents = (await readSvg(svgFile, svgDir)).trim(),
        path = resolve(svgDir, svgFile),
        obj = parseSync(
          contents.replace(
            '<path stroke="none" d="M0 0h24v24H0z" fill="none"/>',
            '',
          ),
        );

      return {
        name,
        filled,
        namePascal,
        contents,
        obj,
        path,
      } as SvgOutput;
    }),
  );
};
