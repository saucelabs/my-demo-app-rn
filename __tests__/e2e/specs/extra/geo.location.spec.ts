import {restartApp} from '../../helpers/utils';
import CatalogScreen from '../../screen-objects/CatalogScreen';
import GeoLocationScreen from '../../screen-objects/GeoLocationScreen';
import Menu from '../../screen-objects/Menu';

describe('Geo Location Page', () => {
  beforeEach(async () => {
    // Restart the app before each session, only not for the first session
    await restartApp();
    await CatalogScreen.waitForIsShown();
    await Menu.openMenu();
    await Menu.openGeoLocation();
    // Accept the permissions, if it's not there it will proceed after x amount of seconds
    await GeoLocationScreen.acceptPermission();
    await GeoLocationScreen.waitForIsShown();
  });

  it('should be able to set and validate the geo location with Appium', async () => {
    // Appium for Android (v1.19.0 and lower) is cutting the data to 5 chars
    // see
    // https://github.com/appium/io.appium.settings/blob/master/app/src/main/java/io/appium/settings/receivers/LocationInfoReceiver.java#L48
    const newLongitude = 52.50032;
    const newLatitude = 13.45143;
    await GeoLocationScreen.setLocation({
      longitude: newLongitude,
      latitude: newLatitude,
    });

    // Give the GPS some time to process the new data
    await driver.pause(1000);

    // Wait until the position has changed
    await GeoLocationScreen.waitUntilPositionChanged(newLongitude, newLatitude);

    await expect(await GeoLocationScreen.getLongitudeValue()).toBe(
      newLongitude,
    );
    await expect(await GeoLocationScreen.getLatitudeValue()).toBe(newLatitude);
  });
});
