import path, { basename, resolve } from 'path';
import fse from 'fs-extra';
import { parseSync } from 'svgson';

export const ICONS_DIR = path.join(__dirname, '../../svg-icons');

export const toCamelCase = (string) => {
  return string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) =>
    p2 ? p2.toUpperCase() : p1.toLowerCase(),
  );
};

export const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);

  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};

export const readSvgDirectory = (directory) => {
  return fse
    .readdirSync(directory)
    .filter((file) => path.extname(file) === '.svg');
};

export const readSvg = (fileName, directory) => {
  return fse.readFileSync(path.join(directory, fileName), 'utf-8');
};

const getThemeMapFromName = (name): 'rounded' | 'outlined' | 'filled' => {
  if (name.includes('rounded')) {
    return 'rounded';
  }

  if (name.includes('outlined')) {
    return 'outlined';
  }

  return 'filled';
};

export const readSvgs = () => {
  const svgFiles = readSvgDirectory(ICONS_DIR);
  return svgFiles.map((svgFile) => {
    console.log('svgFile', svgFile);
    const name = basename(svgFile, '.svg'),
      namePascal = toPascalCase(`${name}`),
      contents = readSvg(svgFile, ICONS_DIR).trim(),
      path = resolve(ICONS_DIR, svgFile),
      themeMap = getThemeMapFromName(name),
      obj = parseSync(
        contents.replace(
          '<path stroke="none" d="M0 0h24v24H0z" fill="none"/>',
          '',
        ),
      );

    return {
      name,
      themeMap,
      namePascal,
      contents,
      obj,
      path,
    };
  });
};
