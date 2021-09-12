import AppScreen from './AppScreen';
import {
  getTextOfElement,
  hideKeyboard,
  locatorStrategy,
} from '../helpers/utils';
import {findElementBySwipe} from '../helpers/gestures';

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
    return $(locatorStrategy('Biometrics button'));
  }

  private get loginButton() {
    return $(locatorStrategy('Login button'));
  }

  private get androidBiometricModal() {
    return $("//android.widget.TextView[contains(@text,'Sign in')]");
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

  async submitBiometrics(match: boolean) {
    if (driver.isAndroid) {
      await this.androidBiometricModal.waitForDisplayed();
      return driver.fingerPrint(match ? 1 : 0);
    }

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
