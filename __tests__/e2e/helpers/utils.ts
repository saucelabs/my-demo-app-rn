import {MobileConfig} from '../configs/wdio.shared.conf';

const getTextOfElement = async (element: WebdriverIO.Element) => {
  let visualText = '';

  try {
    // Android doesn't hold the text on the parent element
    // so each text view in the parent needs to be checked
    if (driver.isAndroid) {
      const elements = await element.$$('*//android.widget.TextView');
      for (let elm of elements) {
        visualText = `${visualText} ${await elm.getText()}`;
      }
    } else {
      visualText = await element.getText();
    }
  } catch (e) {
    visualText = await element.getText();
  }

  return visualText.trim();
};
const locatorStrategy = (selector: string) => {
  return driver.isIOS ? `id=${selector}` : `//*[@content-desc="${selector}"]`;
};
const restartApp = async () => {
  if (!(driver.config as MobileConfig).firstAppStart) {
    await driver.reset();
  }

  // Set the firstAppstart to false to say that the following test can be reset
  (driver.config as MobileConfig).firstAppStart = false;
};
const hideKeyboard = async (element?: WebdriverIO.Element) => {
  // The hideKeyboard is not working on ios devices, so take a different approach
  if (!(await driver.isKeyboardShown())) {
    return;
  }

  if (driver.isIOS) {
    return driver.touchAction({
      action: 'tap',
      // x: 0,
      // y: -40,
      element,
    });
  }

  try {
    return driver.hideKeyboard('pressKey', 'Done');
  } catch (e) {
    // Fallback
    return driver.back();
  }
};
const openDeepLinkUrl = (url: string): Promise<void | string> => {
  const prefix = 'mydemoapprn://';

  if (driver.isAndroid) {
    // Life is so much easier
    return driver.execute('mobile:deepLink', {
      url: `${prefix}${url}`,
      package: 'com.saucelabs.mydemoapp.rn',
    });
  }

  // This works for Simulators, not for real devices so we need to fix that
  return driver.url(`${prefix}${url}`);
};

export {
  getTextOfElement,
  hideKeyboard,
  locatorStrategy,
  openDeepLinkUrl,
  restartApp,
};
