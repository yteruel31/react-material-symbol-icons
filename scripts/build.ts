import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { BuildOptions, buildPackage } from './build/buildPackage';

const { argv }: { argv: any } = yargs(hideBin(process.argv))
  .option('sourcemap', {
    type: 'boolean',
    default: true,
    description: 'Generate sourcemap.',
  })
  .option('minify', {
    type: 'boolean',
    default: true,
    description: 'Build output minified.',
  })
  .option('formats', {
    type: 'string',
    array: true,
    choices: ['es', 'cjs'],
    default: ['es', 'cjs'],
    description: "Specify module code generation: 'es', 'cjs'.",
  })
  .example([['$0 --formats es cjs', 'Bundle package to es and cjs.']]);

(async () => {
  await buildPackage(argv as BuildOptions);
})();
