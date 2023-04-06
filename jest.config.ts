import type { Config } from 'jest';

const config: Config = {
  verbose: false,
  testPathIgnorePatterns: [
    'node_modules',
    'mapping',
    '.husky',
    'public',
    'dist',
  ],
  preset: 'ts-jest',
  testEnvironment: 'node'
};

export default config;