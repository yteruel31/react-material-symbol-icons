import path from 'path';
import fse from 'fs-extra';
import got from 'got';
import { Logger } from './Logger';

const generatedIconsPath = path.join(
  __dirname,
  `../../src/components/Icons/generated`,
);

const initialIconKeysTemplate = (keys: string) => `\
// This file is generated automatically
// Run \`yarn generate:keys\` to update

export const iconKeys: readonly string[] = [${keys}] as const;
export type IconKey = typeof iconKeys[number];
`;

const writeFile = (
  lines: string[],
  filename: string,
  initialTemplate: (lines: string) => string,
) => {
  const generatedIconKeysFilePath = path.resolve(generatedIconsPath, filename);

  const concatenatedLines = lines.join(',');

  const template = initialTemplate(concatenatedLines);

  fse.writeFileSync(generatedIconKeysFilePath, template, {
    flag: 'w',
    encoding: 'utf-8',
  });
};

export const generateIconKeysFile = async () => {
  const logger = new Logger('generate-icon-files');

  const response = await got(
    'https://fonts.google.com/metadata/icons?key=material_symbols&incomplete=true',
  );

  let data = response.body;

  data = data.substring(data.indexOf('\n'));

  const { icons } = JSON.parse(data) as {
    icons: {
      name: string;
      unsupported_families: string[];
    }[];
  };

  const iconNames = icons
    .filter((i) => i.unsupported_families.some((f) => f.includes('Icons')))
    .map((i) => i.name);

  const iconKeys = [...new Set(iconNames)].map((i) => `'${i}'`);

  await fse.mkdir(generatedIconsPath, { recursive: true });

  writeFile(iconKeys, 'generated-icon-keys.ts', initialIconKeysTemplate);

  logger.success(`Generated all files`);
};
