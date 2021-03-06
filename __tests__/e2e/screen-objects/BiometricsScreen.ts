import AppScreen from './AppScreen';
import {locatorStrategy} from '../helpers/utils';

class BiometricsScreen extends AppScreen {
  constructor() {
    super(locatorStrategy('biometrics screen'));
  }

  private get biometricsNotEnabledModal() {
    const iosSelector =
      '-ios class chain:**/XCUIElementTypeAlert[`label == "Biometrics"`]';
    const androidSelector =
      '//android.widget.TextView[contains(@text, "Biometrics is or not supported")]';

    return $(driver.isIOS ? iosSelector : androidSelector);
  }

  private get alertCloseButton() {
    const iosSelector =
      '-ios class chain:**/XCUIElementTypeButton[`label == "OK"`]';
    const androidSelector = '//android.widget.Button[contains(@text, "OK")]';

    return $(driver.isIOS ? iosSelector : androidSelector);
  }

  private get biometricsSwitch() {
    return $(locatorStrategy('biometrics switch'));
  }

  async enableBiometrics() {
    const switchValue = await this.biometricsSwitch.getText();
    const isDisabled = switchValue === (driver.isIOS ? '0' : 'OFF');

    if (isDisabled) {
      await this.biometricsSwitch.click();
    }
  }

  async disableBiometrics() {
    const switchValue = await this.biometricsSwitch.getText();
    const isEnabled = switchValue === (driver.isIOS ? '1' : 'ON');

    if (isEnabled) {
      await this.biometricsSwitch.click();
    }
  }

  async waitForBiometricsNotEnabledModal() {
    await this.biometricsNotEnabledModal.waitForDisplayed();
  }

  async closeAlert() {
    return this.alertCloseButton.click();
  }
}

export default new BiometricsScreen();
