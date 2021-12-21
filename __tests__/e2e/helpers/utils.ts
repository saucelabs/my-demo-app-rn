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
const hideKeyboard = async () => {
  // The hideKeyboard is not working on ios devices, so take a different approach
  if (!(await driver.isKeyboardShown())) {
    return;
  }

  if (driver.isIOS) {
    await $('id=Return').click();
  } else {
    try {
      await driver.hideKeyboard('pressKey', 'Done');
    } catch (e) {
      // Fallback
      await driver.back();
    }
  }

  // Wait for the keyboard animation to be done
  return driver.pause(750);
};
const hideNumericKeyboard = async () => {
  // The hideKeyboard is not working on ios devices, so take a different approach
  if (!(await driver.isKeyboardShown())) {
    return;
  }

  if (driver.isIOS) {
    await driver.execute('mobile: tap', {
      element: await $('id=1'),
      x: 0,
      y: -100,
    });
  } else {
    try {
      await driver.hideKeyboard('pressKey', 'Done');
    } catch (e) {
      // Fallback
      await driver.back();
    }
  }

  // Wait for the keyboard animation to be done
  return driver.pause(750);
};
const openDeepLinkUrl = async (url: string): Promise<void | string> => {
  const prefix = 'mydemoapprn://';

  if (driver.isAndroid) {
    // Life is so much easier
    return driver.execute('mobile:deepLink', {
      url: `${prefix}${url}`,
      package: 'com.saucelabs.mydemoapp.rn',
    });
  }

  // This works for Simulators, not for real devices so we need to fix that
  await driver.url(`${prefix}${url}`);
  // try {
  //   // Wait for the notification and accept it
  //   const openSelector =
  //     "type == 'XCUIElementTypeButton' && name CONTAINS 'Open'";
  //   const openButton = await $(`-ios predicate string:${openSelector}`);
  //   await openButton.waitForDisplayed({timeout: 6000});
  //
  //   return openButton.click();
  // } catch (e) {
  //   console.log('openDeepLinkUrl error = ', e);
  //   return;
  // }
};

export {
  getTextOfElement,
  hideKeyboard,
  hideNumericKeyboard,
  locatorStrategy,
  openDeepLinkUrl,
  restartApp,
};
