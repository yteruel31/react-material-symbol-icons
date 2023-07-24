import { OutputOptions, rollup, RollupOptions } from 'rollup';

export const compile = async (config: RollupOptions) => {
  const build = await rollup(config);
  const outputs: OutputOptions[] = Array.isArray(config.output)
    ? config.output
    : [config.output];

  return Promise.all(outputs.map((output) => build.write(output)));
};
