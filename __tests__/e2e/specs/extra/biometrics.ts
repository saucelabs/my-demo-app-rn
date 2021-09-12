import CatalogScreen from '../../screen-objects/CatalogScreen';
import Menu from '../../screen-objects/Menu';
import BiometricsScreen from '../../screen-objects/BiometricsScreen';
import LoginScreen from '../../screen-objects/LoginScreen';
import {restartApp} from '../../helpers/utils';

describe('Biometrics', () => {
  beforeEach(async () => {
    // Restart the app before each session, only not for the first session
    await restartApp();

    // Prepare the biometrics
    await CatalogScreen.waitForIsShown();
    await Menu.openMenu();
    await Menu.openBiometrics();
    await BiometricsScreen.waitForIsShown();
    await BiometricsScreen.enableBiometrics();
  });

  it('should be able to login with biometrics', async () => {
    // Go to the login
    await Menu.openMenu();
    await Menu.openLogin();

    // On Android emulators we first go to the login screen
    if (driver.isAndroid) {
      await LoginScreen.waitForIsShown();

      // Open the biometrics option
      await LoginScreen.openBiometricsModal();
      await LoginScreen.submitBiometrics(true);
    }
    // For iOS simulators we go directly from the login to the catalog

    // The Catalog should be shown
    await CatalogScreen.waitForIsShown();
  });
});
