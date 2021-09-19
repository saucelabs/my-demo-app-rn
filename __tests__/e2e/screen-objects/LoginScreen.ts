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

  // Biometrics injected by RDC
  ////
  // Text: Sign in
  // element: android.widget.TextView
  ////
  // Text: CANCEL
  // element: android.widget.Button
  //

  private get containerHeader() {
    return $(locatorStrategy('container header'));
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
      : '-ios class chain:**/XCUIElementTypeOther/**/XCUIElementTypeStaticText[`label == "Face ID"`]';
    const androidSelector = process.env.RDC
      ? // On RDC we have a different selector
        '//android.widget.TextView[contains(@text,"Sign in with FingerPrint")]'
      : '//android.widget.TextView[@resource-id="com.android.systemui:id/dialog"]';

    return $(driver.isIOS ? iosSelector : androidSelector);
  }

  private get tryAgainBiometricsModal() {
    const selector =
      '-ios class chain:**/XCUIElementTypeOther/**/XCUIElementTypeButton[`label CONTAINS "Try" AND label CONTAINS "Again"`]';

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
    const containerHeader = await this.containerHeader;

    await this.usernameField.addValue(username);
    // Fail save to always see the next field
    await hideKeyboard(containerHeader);
    await this.passwordField.addValue(password);
    // Fail save to always see the button
    await hideKeyboard(containerHeader);
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
