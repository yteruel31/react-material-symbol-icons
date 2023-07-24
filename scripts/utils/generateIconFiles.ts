import path from 'path';
import fse from 'fs-extra';
import { Logger } from './Logger';
import { readSvgs, SvgOutput } from './svg';

const generatedIconsPath = path.join(
  __dirname,
  `../../src/components/Icons/generated`,
);

export const themes = ['outlined', 'rounded', 'sharp'] as const;

export const weights = [
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
] as const;

const initialIconKeysTemplate = (keys: string) => `\
// This file is generated automatically
// Run \`yarn generate:components\` to update

const iconKeys: readonly string[] = [${keys}] as const;
export type IconKey = typeof iconKeys[number];
`;

const initialIconChildrenTemplate = (iconChildren: string) => `\
// This file is generated automatically
// Run \`yarn generate:components\` to update

export const ICONS: Record<string, any> = {${iconChildren}};
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

function processSvgs(
  svgs: Awaited<SvgOutput>[],
  argv,
  iconChildren: string[],
  theme: string,
  weight: string,
  iconKeys: string[],
) {
  for (const svg of svgs) {
    const children = svg.obj.children
      .map(({ name, attributes }, i) => {
        if (argv.key) {
          attributes.key = `svg-${i}`;
        }

        if (argv.pascalCase) {
          attributes.strokeWidth = attributes['stroke-width'];
          delete attributes['stroke-width'];
        }

        return [name, attributes];
      })
      .filter((i) => {
        const [_name, attributes] = i;
        return (
          !(attributes as Record<string, string>).d ||
          (attributes as Record<string, string>).d !== 'M0 0h24v24H0z'
        );
      });

    iconChildren.push(
      `'${svg.name}_${theme}_${weight}': ${JSON.stringify(children)}`,
    );

    if (!svg.filled) {
      iconKeys.push(`'${svg.name}'`);
    }
  }
}

async function processThemes(
  materialSymbolsPackagePath: string,
  argv,
  iconChildren: string[],
  weight: string,
  iconKeys: string[],
) {
  for (const theme of themes) {
    const svgPath = `${materialSymbolsPackagePath}/${theme}`;
    const svgs = await readSvgs(svgPath);

    processSvgs(svgs, argv, iconChildren, theme, weight, iconKeys);
  }
}

export const generateIconFiles = async (argv) => {
  const logger = new Logger('generate-icon-files');

  let iconChildren: string[] = [];
  let iconKeys: string[] = [];

  for (const weight of weights) {
    const materialSymbolsPackagePath = path.dirname(
      require.resolve(`@material-symbols/svg-${weight}/package.json`),
    );

    await processThemes(
      materialSymbolsPackagePath,
      argv,
      iconChildren,
      weight,
      iconKeys,
    );
  }

  await fse.mkdir(generatedIconsPath, { recursive: true });

  writeFile(iconKeys, 'generated-icon-keys.ts', initialIconKeysTemplate);

  writeFile(
    iconChildren,
    'generated-icon-children.ts',
    initialIconChildrenTemplate,
  );

  logger.success(`Generated all files`);
};
