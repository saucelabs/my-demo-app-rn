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
config.services = (config.services || []).concat([
  [
    'appium',
    {
      command: 'appium',
    },
  ],
]);

// Never run the RDC tests
config.exclude = ['./__tests__/e2e/specs/default/*.rdc.spec.ts'];

export default config;
