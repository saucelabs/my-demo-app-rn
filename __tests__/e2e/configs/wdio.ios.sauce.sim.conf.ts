import config from './wdio.shared.sauce.conf';

const buildName = `iOS My Demo app: ${new Date().getTime()}`;

// ============
// Capabilities
// ============
//
// For all capabilities please check
// http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
config.capabilities = [
  {
    // The defaults you need to have in your config
    platformName: 'iOS',
    // For W3C the appium capabilities need to have an extension prefix
    // http://appium.io/docs/en/writing-running-appium/caps/
    // This is `appium:` for all Appium Capabilities which can be found here
    deviceName: 'iPhone 12 Simulator',
    platformVersion: '14.5',
    orientation: 'PORTRAIT',
    automationName: 'XCUITest',
    // The path to the app
    app: 'storage:filename=iOS.MyDemoAppRN.zip',
    // Read the reset strategies very well, they differ per platform, see
    // http://appium.io/docs/en/writing-running-appium/other/reset-strategies/
    noReset: true,
    build: buildName,
    newCommandTimeout: 240,
    // @ts-ignore
    allowTouchIdEnroll: true,
  },
];

exports.config = config;
