import {join} from 'path';
import {readFileSync} from 'fs';
import {isBrowserOpened, restartApp} from '../../helpers/utils';
import CatalogScreen from '../../screen-objects/CatalogScreen';
import Menu from '../../screen-objects/Menu';
import QrCodeScreen from '../../screen-objects/QrCodeScreen';

// The image needs to be provided as a base64 string
const qrCodeImage = readFileSync(
  join(__dirname, '../../../../', 'docs/assets/qr-code.png'),
  'base64',
);

describe('Sauce Labs Image Injection', () => {
  beforeEach(async () => {
    await restartApp();
    await CatalogScreen.waitForIsShown();
  });

  it('should be able to scan the QR code and open the browser', async () => {
    // Now go to QR Code page
    await Menu.openMenu();
    await Menu.openQrCodeScanner();
    // Accept access if asked
    await QrCodeScreen.acceptCameraAccess();

    // Wait for the page to be shown
    await QrCodeScreen.waitForIsShown();

    // Now provide the transformed image to the device with this command
    await driver.execute(`sauce:inject-image=${qrCodeImage}`);

    // Verify that the browser is running
    await expect(await isBrowserOpened()).toEqual(true);

    // For demo purpose so we can see the image injection in the movie
    await driver.pause(5000);
  });
});
