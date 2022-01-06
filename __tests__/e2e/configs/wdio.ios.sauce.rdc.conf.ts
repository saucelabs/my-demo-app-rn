import config from './wdio.shared.sauce.conf';

const buildName = `iOS My React Native Demo app iOS: ${new Date().getTime()}`;
// There seems to be an issue with iOS 15.x, RDC and extreme slowness causing the tests to fail.
// This means we need to limit the OS versions to 13 and 14
const osVersions = ['13', '14'];
// There seems to be an issue with iOS 14.3 which keeps hanging on Appium commands which doesn't happen on 14.8
// We use a random value 13/15 here, but only when image injection is used
const imageInjectionOsVersions = ['13', '15'];
const getRandomOsVersion = (versions: string[]): string =>
  versions[Math.floor(Math.random() * versions.length)];
const randomImageInjectionOsVersions = Math.floor(
  Math.random() * imageInjectionOsVersions.length,
);
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
    platformVersion: getRandomOsVersion(osVersions),
    // The name of the App in the Sauce Labs storage, for more info see
    // https://docs.saucelabs.com/mobile-apps/app-storage/
    app: 'storage:filename=MyRNDemoApp.ipa',
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
    // If `IMAGE_INJECTION=true` has been provided from the command line it will
    // start the driver with `sauceLabsImageInjectionEnabled` enabled
    // @ts-ignore
    sauceLabsImageInjectionEnabled: !!process.env.IMAGE_INJECTION,
    // There seems to be an issue with iOS 14.3 which keeps hanging on Appium commands which doesn't happen on 14.8
    // We use a random value 13/15 here, but only when image injection is used
    ...(process.env.IMAGE_INJECTION
      ? {
          platformVersion: getRandomOsVersion(imageInjectionOsVersions),
        }
      : {}),
    appiumVersion: '1.22.0',
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
    platformVersion: getRandomOsVersion(osVersions),
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
    // If `BIOMETRICS=true` has been provided from the command line it will
    // start the driver with `allowTouchIdEnroll` enabled
    // @ts-ignore
    allowTouchIdEnroll: !!process.env.BIOMETRICS,
  });
}

config.exclude = ['./__tests__/e2e/specs/default/*.emusim.spec.ts'];

exports.config = config;
