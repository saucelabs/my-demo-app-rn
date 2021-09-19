import CatalogScreen from '../../screen-objects/CatalogScreen';
import Menu from '../../screen-objects/Menu';
import BiometricsScreen from '../../screen-objects/BiometricsScreen';
import LoginScreen from '../../screen-objects/LoginScreen';
import {restartApp} from '../../helpers/utils';

describe('Biometrics for Sauce Labs Real Devices', () => {
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
    // Biometrics login will automatically be triggered.
    await LoginScreen.waitForBiometricsModal();
    // Open the biometrics option
    await LoginScreen.submitBiometrics(true);
    // The Catalog should be shown
    await CatalogScreen.waitForIsShown();
  });

  it('should not be able to login with a incorrect biometric signal', async () => {
    // Go to the login
    await Menu.openMenu();
    await Menu.openLogin();
    // Biometrics login will automatically be triggered.
    await LoginScreen.waitForBiometricsModal();
    // Provide an incorrect biometrics signal
    await LoginScreen.submitBiometrics(false);
    // No assertion will be done here because if the element is not shown it would fail
    await LoginScreen.waitForBiometricsModal(false);
  });

  it('should be able to cancel biometrics and open the modal again', async () => {
    // Go to the login
    await Menu.openMenu();
    await Menu.openLogin();
    // Biometrics login will automatically be triggered.
    await LoginScreen.waitForBiometricsModal();
    // Cancel biometrics option
    await LoginScreen.cancelBiometrics();
    // The Login screen should be shown
    await LoginScreen.waitForIsShown();
    // Now open Login through biometrics again
    await LoginScreen.openBiometricsModal();
    // Biometrics login will automatically be triggered.
    // No assertion will be done here because if the element is not shown it would fail
    await LoginScreen.waitForBiometricsModal();
  });
});
