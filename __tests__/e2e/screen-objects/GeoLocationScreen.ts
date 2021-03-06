import AppScreen from './AppScreen';
import {locatorStrategy} from '../helpers/utils';

class GeoLocationScreen extends AppScreen {
  constructor() {
    super(locatorStrategy('geo location screen'));
  }

  private get permissionModal() {
    const iosSelector =
      '-ios class chain:**/XCUIElementTypeAlert[`label CONTAINS "Allow"`]';
    const androidSelector =
      '//android.widget.TextView[contains(@text,"Allow")]';

    return $(driver.isIOS ? iosSelector : androidSelector);
  }

  get allowOnce() {
    const iosSelector =
      '-ios class chain:**/XCUIElementTypeButton[`label == "Allow Once" or label == "Allow"`]';
    const androidSelector =
      '//android.widget.Button[contains(@text,"Allow") or contains(@text,"ALLOW") or contains(@text,"Only") or contains(@text,"ONLY")]';

    return $(driver.isIOS ? iosSelector : androidSelector);
  }

  get androidOkButton() {
    return $(
      '//android.widget.Button[contains(@text,"OK") or contains(@text,"Ok")]',
    );
  }

  get latitude() {
    return $(locatorStrategy('latitude data'));
  }

  get longitude() {
    return $(locatorStrategy('longitude data'));
  }

  async acceptPermission(isShown = true) {
    try {
      await this.permissionModal.waitForDisplayed({
        timeout: 6000,
        reverse: !isShown,
      });
      await this.allowOnce.click();
      // Some emulators might give you a location permission alert
      // @ts-ignore
      if (parseInt(driver.capabilities.platformVersion, 10) < 10) {
        await this.androidOkButton.waitForDisplayed({
          timeout: 3000,
          reverse: !isShown,
        });
        await this.androidOkButton.click();
      }
    } catch (ign) {
      // Do nothing
    }
  }

  async setLocation({
    longitude,
    latitude,
  }: {
    longitude: number;
    latitude: number;
  }) {
    await driver.setGeoLocation({longitude, latitude});
  }

  async waitUntilPositionChanged(longitude: number, latitude: number) {
    await driver.waitUntil(
      async () => {
        const currentLongitude = await this.getLongitudeValue();
        const currentLatitude = await this.getLatitudeValue();

        return currentLongitude === longitude && currentLatitude === latitude;
      },
      {
        // Android can take some time
        timeout: driver.isIOS ? 60000 : 120000,
        timeoutMsg: 'The position did not change in time!',
      },
    );
  }

  async getLatitudeValue(): Promise<number> {
    return Number(await this.latitude.getText());
  }

  /**
   * Get the the longitude value
   *
   * @returns {number}
   */
  async getLongitudeValue(): Promise<number> {
    return Number(await this.longitude.getText());
  }
}

export default new GeoLocationScreen();
