import CatalogScreen from '../../screen-objects/CatalogScreen';
import Menu from '../../screen-objects/Menu';
import BiometricsScreen from '../../screen-objects/BiometricsScreen';
import LoginScreen from '../../screen-objects/LoginScreen';
import {restartApp} from '../../helpers/utils';
import AndroidSettings from '../../screen-objects/AndroidSettings';

describe('Biometrics for Emulators and Simulators', () => {
  async function prepareBiometrics(): Promise<void> {
    let biometricsDisabled = true;

    // Restart the app before each session, only not for the first session
    await restartApp();

    // Prepare the biometrics
    await CatalogScreen.waitForIsShown();
    await Menu.openMenu();
    await Menu.openBiometrics();

    // It could be that biometrics is not enabled and an alert will be shown.
    // The screen will then not be in the foreground
    try {
      await BiometricsScreen.waitForIsShown();
      biometricsDisabled = false;
    } catch (ign) {
      // the screen is not there so the alert must be there
    }

    // Biometrics is disabled, so enable it
    if (biometricsDisabled) {
      if (driver.isIOS) {
        await driver.toggleEnrollTouchId(true);
        return prepareBiometrics();
      }
      // Android is more verbose, we need to enabled it when we are on an emulator
      await AndroidSettings.enableBiometricLogin();
      return prepareBiometrics();
    }

    return BiometricsScreen.enableBiometrics();
  }

  it('should be able to login with biometrics', async () => {
    // Prepare enabling biometrics on the devices
    await prepareBiometrics();
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
    // Prepare enabling biometrics on the devices
    await prepareBiometrics();
    // Go to the login
    await Menu.openMenu();
    await Menu.openLogin();
    // Biometrics login will automatically be triggered.
    await LoginScreen.waitForBiometricsModal();
    // Provide an incorrect biometrics signal
    await LoginScreen.submitBiometrics(false);
    // Just wait
    await driver.pause(2000);
    // No assertion will be done here because if the element is not shown it would fail
    await LoginScreen.waitForBiometricsFailureModal();
  });

  it('should be able to cancel biometrics and open the modal again', async () => {
    // Prepare enabling biometrics on the devices
    await prepareBiometrics();
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

  it('should give a warning if biometrics is not enabled', async () => {
    // Prepare disabling biometrics on the device
    if (driver.isIOS) {
      await driver.toggleEnrollTouchId(false);
    } else if (driver.isAndroid) {
      try {
        await AndroidSettings.disableBiometricLogin();
      } catch (ign) {
        // Something failed in the Android settings, ignore that.
        // Reason could be that the biometrics have not been set
      }
    }

    await restartApp();
    await CatalogScreen.waitForIsShown();
    await Menu.openMenu();
    await Menu.openBiometrics();

    // No assertion is needed, if the element is not available it will fail
    await LoginScreen.waitForBiometricsNotEnabledModal();
  });
});
