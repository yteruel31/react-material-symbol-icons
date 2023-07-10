import path from 'path';
import prettier from 'prettier';
import fse from 'fs-extra';
import { readSvgs } from './utils/svgs';

const componentTemplate = ({ namePascal, children }) => `\
import createIconComponent from '../../../utils/createIconComponent';
export default createIconComponent('${namePascal}', ${JSON.stringify(
  children,
)});`;

(async () => {
  const argv = {
    key: true,
    pascalCase: false,
    pretty: true,
  };

  const svgIcons = readSvgs();

  for (const svgIcon of svgIcons) {
    const children = svgIcon.obj.children
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
        const [name, attributes] = i;
        return !attributes.d || attributes.d !== 'M0 0h24v24H0z';
      });

    const component = componentTemplate({
      namePascal: svgIcon.namePascal,
      children,
    });

    const output = argv.pretty
      ? await prettier.format(component, {
          singleQuote: true,
          trailingComma: 'all',
          parser: 'babel',
        })
      : component;

    let filePath = path.resolve(
      __dirname,
      '../src/components/Icons/generated',
      `${svgIcon.namePascal}.tsx`,
    );

    fse.writeFileSync(filePath, output, 'utf-8');
  }
})();
