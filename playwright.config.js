// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { worker } from 'node:cluster';
import { time } from 'node:console';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests/',
  // retries: 1,
  // workers: 5,
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  use: {
   browserName: 'chromium',
   trace: 'on',
   headless : true,
   screenshot: 'on',

  },
});
module.exports = config;

