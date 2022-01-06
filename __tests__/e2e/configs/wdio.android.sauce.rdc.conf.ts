import config from './wdio.shared.sauce.conf';

const buildName = `Android My React Native Demo app: ${new Date().getTime()}`;

// ============
// Capabilities
// ============
//
// For all capabilities please check
// http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
config.capabilities = [
  {
    // The defaults you need to have in your config
    platformName: 'Android',
    // We're using dynamic device allocation
    // See https://docs.saucelabs.com/mobile-apps/automated-testing/appium/real-devices/#dynamic-device-allocation
    deviceName: '(Samsung Galaxy S(7|8|9|10|20|21).*)|(Google Pixel.*)',
    automationName: 'UIAutomator2',
    // The name of the App in the Sauce Labs storage, for more info see
    // https://docs.saucelabs.com/mobile-apps/app-storage/
    app: 'storage:filename=Android.MyDemoAppRN.apk',
    appWaitActivity: 'com.saucelabs.mydemoapp.rn.MainActivity',
    build: buildName,
    newCommandTimeout: 240,
    // Select only phone devices
    // @ts-ignore
    phoneOnly: true,
    // Only resign for Android if biometrics or image injection needs to be tested, otherwise don't.
    // That will save time
    resigningEnabled: !!process.env.BIOMETRICS || !!process.env.IMAGE_INJECTION,
    // If `BIOMETRICS=true` has been provided from the command line it will
    // start the driver with `allowTouchIdEnroll` enabled
    // @ts-ignore
    allowTouchIdEnroll: !!process.env.BIOMETRICS,
    // If `IMAGE_INJECTION=true` has been provided from the command line it will
    // start the driver with `sauceLabsImageInjectionEnabled` enabled
    // @ts-ignore
    sauceLabsImageInjectionEnabled: !!process.env.IMAGE_INJECTION,
    // This will adjust the Appium server in such a way that it will return all
    // non visible elements so we can assert against it.
    // @ts-ignore
    allowInvisibleElements: true,
  },
];

// Never run the EMUSIM tests
config.exclude = ['./__tests__/e2e/specs/default/*.emusim.spec.ts'];

exports.config = config;
