import { StorybookConfig } from '@storybook/react-webpack5';

const path = require('path');
const storiesPath = path
  .resolve(__dirname, '../src/**/*.story.@(ts|tsx)')
  .replace(/\\/g, '/');

const config: StorybookConfig = {
  stories: [storiesPath],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, '../src'),
      };
    }
    return config;
  },
};

export default config;
