import { StorybookConfig } from '@storybook/react-vite';

const path = require('path');
const storiesPath = path
  .resolve(__dirname, '../src/**/*.story.@(ts|tsx)')
  .replace(/\\/g, '/');

const config: StorybookConfig = {
  stories: [storiesPath],
  addons: ['@storybook/addon-essentials'],
  framework: '@storybook/react-vite',
};

export default config;
