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
};

export default config;
