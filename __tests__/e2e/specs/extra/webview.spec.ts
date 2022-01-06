import {restartApp} from '../../helpers/utils';
import Menu from '../../screen-objects/Menu';
import WebviewScreen from '../../screen-objects/WebviewScreen';

describe('Webview', () => {
  beforeEach(async () => {
    // Restart the app before each session, only not for the first session
    await restartApp();
    await Menu.openMenu();
    await Menu.openWebview();
    await WebviewScreen.waitForIsShown();
  });

  it('should be able to see the error message when an incorrect url is being entered', async () => {
    await WebviewScreen.submitURL('http://saucelabs.com');

    await expect(await WebviewScreen.getErrorMessage()).toContain(
      'Please provide a correct https url.',
    );
  });

  it('should be able open the Sauce Labs website in the webview', async () => {
    await WebviewScreen.submitURL('https://www.saucelabs.com');
    await WebviewScreen.switchToWebView({title: 'Sauce Labs'});

    await expect(await driver.getUrl()).toContain('saucelabs.com');
  });
});
