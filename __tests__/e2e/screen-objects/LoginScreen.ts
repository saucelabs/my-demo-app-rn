import AppScreen from './AppScreen';
import {
  getTextOfElement,
  hideKeyboard,
  locatorStrategy,
} from '../helpers/utils';
import {findElementBySwipe} from '../helpers/gestures';
import {DEFAULT_PIN, INCORRECT_PIN} from '../configs/constants';

class LoginScreen extends AppScreen {
  constructor() {
    super(locatorStrategy('login screen'));
  }

  private get usernameField() {
    return $(locatorStrategy('Username input field'));
  }

  private get usernameErrorMessage() {
    return $(locatorStrategy('Username-error-message'));
  }

  private get passwordField() {
    return $(locatorStrategy('Password input field'));
  }

  private get passwordErrorMessage() {
    return $(locatorStrategy('Password-error-message'));
  }

  private get genericErrorMessage() {
    return $(locatorStrategy('generic-error-message'));
  }

  private get biometricButton() {
    return $(locatorStrategy('biometrics-button'));
  }

  private get loginButton() {
    return $(locatorStrategy('Login button'));
  }

  private get androidBiometricModal() {
    const selector = "//android.widget.TextView[contains(@text,'Sign in')]";

    return $(selector);
  }

  private get biometricsModal() {
    const iosSelector = process.env.RDC
      ? // On RDC we have a different selector
        '-ios class chain:**/XCUIElementTypeStaticText[`label CONTAINS "Touch ID Verification" OR label CONTAINS "Face ID Verification"`]'
      : '-ios class chain:**/XCUIElementTypeOther/**/XCUIElementTypeStaticText[`label CONTAINS "Face ID" or label CONTAINS "Touch ID"`]';
    const androidSelector = process.env.RDC
      ? // On RDC we have a different selector
        '//android.widget.TextView[contains(@text,"Sign in with FingerPrint")]'
      : '//android.widget.TextView[@resource-id="com.android.systemui:id/dialog"]';

    return $(driver.isIOS ? iosSelector : androidSelector);
  }

  private get tryAgainBiometricsModal() {
    const selector =
      '-ios class chain:**/XCUIElementTypeOther/**/XCUIElementTypeButton[`(label CONTAINS "Try" AND label CONTAINS "Again") OR label CONTAINS "Enter Password"`]';

    return $(selector);
  }

  private get biometricsCancelButton() {
    const iosSelector =
      '-ios class chain:**/XCUIElementTypeOther/**/XCUIElementTypeButton[`label == "Cancel"`]';
    // On RDC the text is uppercase for the cancel button
    const androidSelector =
      "//android.widget.Button[contains(@text,'Cancel') or contains(@text,'CANCEL')]";

    return $(driver.isIOS ? iosSelector : androidSelector);
  }

  private get biometricsNotEnabledModal() {
    const iosSelector =
      '-ios class chain:**/XCUIElementTypeAlert[`label == "Biometrics"`]';
    const androidSelector = '//*[@resource-id="android:id/alertTitle"]';

    return $(driver.isIOS ? iosSelector : androidSelector);
  }

  private get allowBiometricsModal() {
    const iosSelector =
      '-ios class chain:**/XCUIElementTypeStaticText[`label CONTAINS "Do you want to allow"`]';

    return $(iosSelector);
  }

  private get allowBiometricsButton() {
    // The selector is an accessibility selector, we can select on the `OK`-text
    return $('~OK');
  }

  async getUsernameErrorMessage(): Promise<string> {
    return getTextOfElement(await this.usernameErrorMessage);
  }

  async getPasswordErrorMessage(): Promise<string> {
    return getTextOfElement(await this.passwordErrorMessage);
  }

  async getGenericErrorMessage(): Promise<string> {
    return getTextOfElement(await this.genericErrorMessage);
  }

  async openBiometricsModal() {
    await this.biometricButton.click();
  }

  async allowBiometrics() {
    // Android does not have this permission modal
    if (driver.isIOS) {
      try {
        // Only wait 3 seconds for it, then it will not slow down if it's not there
        await this.allowBiometricsModal.waitForDisplayed({timeout: 3000});
        await this.allowBiometricsButton.click();
      } catch (ign) {
        // Do nothing
      }
    }

    return;
  }

  async waitForBiometricsModal(isShown = true) {
    await this.biometricsModal.waitForDisplayed({reverse: !isShown});
  }

  async waitForBiometricsFailureModal() {
    // Android DOES NOT have a new failure screen, iOS has
    if (driver.isIOS) {
      await this.tryAgainBiometricsModal.waitForDisplayed();
    } else {
      await this.biometricsModal.waitForDisplayed();
    }
  }

  async waitForBiometricsNotEnabledModal() {
    await this.biometricsNotEnabledModal.waitForDisplayed();
  }

  async cancelBiometrics() {
    // iOS does not have cancel button, this should be done by sending a negative
    // face/touchId
    if (driver.isIOS) {
      await this.submitBiometrics(false);
      // On RDC the biometrics modal will disappear after a failure
      // so wait for it
      if (process.env.RDC) {
        return this.waitForBiometricsModal(false);
      }
      await this.waitForBiometricsFailureModal();
    }

    await this.biometricsCancelButton.click();
  }

  async submitBiometrics(match: boolean) {
    // On the Sauce Labs RDC cloud we need to send the following command
    if (process.env.RDC) {
      return driver.execute(`sauce:biometrics-authenticate=${match}`);
    }
    // Android emulators need to have this
    if (driver.isAndroid) {
      await this.androidBiometricModal.waitForDisplayed();
      return driver.fingerPrint(match ? DEFAULT_PIN : INCORRECT_PIN);
    }

    // And this is for iOS simulators
    return driver.touchId(match);
  }

  async submitLogin({username = '', password = ''}) {
    await this.usernameField.addValue(username);
    // Fail save to always see the next field
    await hideKeyboard();
    await this.passwordField.addValue(password);
    // Fail save to always see the button
    await hideKeyboard();
    await this.loginButton.click();
    // Wait for animation to be done
    await driver.pause(750);
  }

  async submitLoginWithAutofill(valid = true) {
    await (
      await findElementBySwipe({
        element: await $(
          locatorStrategy(
            valid
              ? 'bob@example.com-autofill'
              : 'alice@example.com (locked out)-autofill',
          ),
        ),
        scrollableElement: await $(locatorStrategy('login screen')),
      })
    )?.click();
    await this.loginButton.click();
    // Wait for animation to be done
    await driver.pause(750);
  }
}

export default new LoginScreen();
