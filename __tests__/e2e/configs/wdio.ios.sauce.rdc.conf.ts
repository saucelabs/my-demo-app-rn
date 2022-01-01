import config from './wdio.shared.sauce.conf';

const buildName = `iOS My React Native Demo app: ${new Date().getTime()}`;

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
    // We're using dynamic device allocation
    // See https://docs.saucelabs.com/mobile-apps/automated-testing/appium/real-devices/#dynamic-device-allocation
    deviceName: 'iPhone (11|12|13|X.*).*',
    automationName: 'XCUITest',
    // The name of the App in the Sauce Labs storage, for more info see
    // https://docs.saucelabs.com/mobile-apps/app-storage/
    app: 'storage:filename=iOS.MyDemoAppRN.ipa',
    noReset: true,
    // @ts-ignore
    // There is an issue with noReset: true and driver.reset(). This cap fixes that
    shouldTerminateApp: true,
    build: buildName,
    newCommandTimeout: 240,
    // If BIOMETRICS=true has been provided from the command line it will
    // start the driver with `allowTouchIdEnroll` enabled
    // @ts-ignore
    allowTouchIdEnroll: !!process.env.BIOMETRICS,
  },
];

// Also run biometrics on iPhones with Touch ID support when BIOMETRICS is provided
if (process.env.BIOMETRICS) {
  // @ts-ignore
  config.capabilities = config.capabilities.concat({
    // The defaults you need to have in your config
    platformName: 'iOS',
    // We're using dynamic device allocation
    // See https://docs.saucelabs.com/mobile-apps/automated-testing/appium/real-devices/#dynamic-device-allocation
    deviceName: 'iPhone ([6-8]|SE).*',
    automationName: 'XCUITest',
    // The name of the App in the Sauce Labs storage, for more info see
    // https://docs.saucelabs.com/mobile-apps/app-storage/
    app: 'storage:filename=iOS.MyDemoAppRN.ipa',
    // Read the reset strategies very well, they differ per platform, see
    // http://appium.io/docs/en/writing-running-appium/other/reset-strategies/
    noReset: true,
    // @ts-ignore
    // There is an issue with noReset: true and driver.reset(). This cap fixes that
    shouldTerminateApp: true,
    build: buildName,
    newCommandTimeout: 240,
    // If BIOMETRICS=true has been provided from the command line it will
    // start the driver with `allowTouchIdEnroll` enabled
    // @ts-ignore
    allowTouchIdEnroll: !!process.env.BIOMETRICS,
  });
}

exports.config = config;
