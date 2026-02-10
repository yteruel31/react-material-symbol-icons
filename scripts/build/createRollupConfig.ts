import path from 'path';
import {
  ModuleFormat,
  OutputOptions,
  RenderedChunk,
  RollupOptions,
} from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import nodeExternals from 'rollup-plugin-node-externals';
import nodeResolve from '@rollup/plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild';
import replace from '@rollup/plugin-replace';
import fs from 'fs-extra';
import alias, { Alias } from '@rollup/plugin-alias';

interface PkgConfigInput {
  basePath: string;
  format: string;
  entry?: string;
  publicPath?: string;
  externals?: string[];
  sourcemap: boolean;
  minify: boolean;
}

export const createRollupConfig = async (
  config: PkgConfigInput,
): Promise<RollupOptions> => {
  const packageJson = JSON.parse(
    fs
      .readFileSync(path.join(config.basePath, './package.json'))
      .toString('utf-8'),
  );

  const aliasEntries: Alias[] = [
    {
      find: '@',
      replacement: path.join(config.basePath, 'src'),
    },
  ];

  const plugins = [
    commonjs({ defaultIsModuleExports: 'auto' }),
    nodeExternals(),
    nodeResolve({ extensions: ['.ts', '.tsx', '.js', '.jsx'] }),
    esbuild({
      sourceMap: config.sourcemap,
      minify: config.minify,
      tsconfig: path.resolve(process.cwd(), 'tsconfig.json'),
    }),
    alias({ entries: aliasEntries }),
    replace({ preventAssignment: true }),
    {
      name: 'use-client-directive',
      renderChunk(code: string, chunk: RenderedChunk) {
        if (chunk.isEntry) {
          return { code: `"use client";\n${code}`, map: null };
        }
        return null;
      },
    },
  ];

  let strings = Object.keys({
    ...packageJson.peerDependencies,
    ...packageJson.dependencies,
  });

  const externals = [...strings];

  const output: OutputOptions = {
    name: packageJson.name,
    format: config.format as ModuleFormat,
    externalLiveBindings: false,
    sourcemap: config.sourcemap,
  };

  if (config.format === 'es') {
    output.dir = path.resolve(config.basePath, 'dist/esm');
    output.preserveModules = true;
    output.interop = 'compat';
  }

  if (config.format === 'cjs') {
    output.dir = path.resolve(config.basePath, 'dist/cjs');
    output.preserveModules = true;
    output.exports = 'named';
    output.interop = 'compat';
  }

  return {
    input: config?.entry || path.resolve(config.basePath, 'src/index.ts'),
    output,
    external: externals,
    plugins,
    onwarn(warning, warn) {
      if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
      warn(warning);
    },
  };
};
