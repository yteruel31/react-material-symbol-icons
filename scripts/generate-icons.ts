import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { generateIconFiles } from './utils/generateIconFiles';

const { argv }: { argv: any } = yargs(hideBin(process.argv)).option('key', {
  type: 'boolean',
  default: true,
  description: 'Generate svg path keys.',
});

(async () => {
  await generateIconFiles(argv);
})();
