import {join} from 'path';
import config from './wdio.shared.local.appium.conf';
import {version} from '../../../package.json';

// ============
// Capabilities
// ============
//
config.maxInstances = 1;
// For all capabilities please check
// http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
config.capabilities = [
  {
    // The defaults you need to have in your config
    platformName: 'Android',
    // For W3C the appium capabilities need to have an extension prefix
    // http://appium.io/docs/en/writing-running-appium/caps/
    // This is `appium:` for all Appium Capabilities which can be found here
    'appium:deviceName': 'Pixel_3_10.0',
    'appium:platformVersion': '10.0',
    'appium:orientation': 'PORTRAIT',
    'appium:automationName': 'UiAutomator2',
    // The path to the app
    'appium:app': join(
      __dirname,
      '../../../',
      `./android/app/build/outputs/apk/debug/Android-MyDemoAppRN.${version}.apk`,
    ),
    // @ts-ignore
    'appium:appWaitActivity': 'com.saucelabs.mydemoapp.rn.MainActivity',
    // Read the reset strategies very well, they differ per platform, see
    // http://appium.io/docs/en/writing-running-appium/other/reset-strategies/
    'appium:noReset': true,
    'appium:newCommandTimeout': 240,
    // @ts-ignore
    'appium:allowInvisibleElements': true,
  },
];

exports.config = config;
