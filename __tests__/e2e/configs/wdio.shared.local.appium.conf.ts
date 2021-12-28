import {config} from './wdio.shared.conf';

// ====================
// Runner Configuration
// ====================
//
config.port = 4723;

// ===================
// Test Configurations
// ===================
//
config.services =
  (config.services || []).concat(
  [
    [
      'appium',
      {
        command: 'appium',
      },
    ],
  ]
);

export default config;
