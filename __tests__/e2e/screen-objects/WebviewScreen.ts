import AppScreen from './AppScreen';
import {
  getTextOfElement,
  hideKeyboard,
  locatorStrategy,
} from '../helpers/utils';

export const CONTEXT_REF = {
  NATIVE: 'native',
  WEBVIEW: 'webview',
};
type androidContextsType = {
  proc: string;
  webview: string;
  info: string;
  pages: [
    {
      description: string;
      devtoolsFrontendUrl: string;
      id: string;
      title: string;
      type: string;
      url: string;
      webSocketDebuggerUrl: string;
    },
  ];
  webviewName: string;
}[];
type internalContextType = {
  id: string;
  title: string;
  url: string;
  // For Android
  webviewName?: string;
  // For iOS
  bundleId?: string;
}[];

class WebviewScreen extends AppScreen {
  constructor() {
    super(locatorStrategy('webview selection screen'));
  }

  get input() {
    return $(locatorStrategy('URL input field'));
  }

  get go() {
    return $(locatorStrategy('Go To Site button'));
  }

  get errorMessage() {
    return $(locatorStrategy('URL-error-message'));
  }

  async switchToWebView({
    title = '',
    url = '',
  }: {
    title?: string;
    url?: string;
  }) {
    // This method will wait until a condition becomes true. In our case we want
    // to wait until we have a webview that contains our title or url
    // See https://webdriver.io/docs/api/browser/waitUntil/
    await driver.waitUntil(
      async () => {
        // Get all the current contexts
        const contexts = await this.getCurrentContexts();
        const webview = contexts
          // first filter out the `NATIVE_APP` context
          .filter(context => context.id !== 'NATIVE_APP')
          // Now find a matching title,url
          .find(context => {
            // Check if the title or url includes our expectation. If so, then return it
            return title
              ? context.title.includes(title)
              : context.url.includes(url);
          });

        // If we didn't find a matching webview then retry,
        if (!webview) {
          return false;
        }

        // For iOS we can just switch to the webview based on it's webviewId
        if (driver.isIOS) {
          await driver.switchContext(webview.id);

          // Now tell the function that we are done by returning true
          return true;
        }

        // Android will only have 1 webview for the app, but that webview will contain multiple "tabs/windows"
        // We first need to switch to the webview
        // @ts-ignore
        await driver.switchContext(webview.webviewName);
        // and now switch to the "tab/window".
        await driver.switchToWindow(webview.id);

        // Now tell the function that we are done by returning true
        return true;
      },
      {
        timeout: 15000,
        timeoutMsg: `The webview containing ${title ? 'title' : 'url'}: "${
          title ? title : url
        }" was not found.`,
      },
    );
  }

  async submitURL(url: string) {
    await this.input.addValue(url);
    await hideKeyboard();

    return this.go.click();
  }

  async getErrorMessage() {
    await this.errorMessage.waitForDisplayed();

    return getTextOfElement(await this.errorMessage);
  }

  async getCurrentContexts(): Promise<internalContextType> {
    // Instead of using the method `driver.getContexts` we are going to use this
    // because it will return more data, see also
    // http://appium.io/docs/en/commands/context/get-contexts/
    const contexts = await driver.execute('mobile: getContexts');

    // Now return the data
    return driver.isIOS
      ? (contexts as internalContextType)
      : this.parsedAndroidContexts(contexts as androidContextsType);
  }

  /**
   * Parse the Android array and return the same object as iOS
   * @param {object} contexts
   *
   * Android will return something like this
   *
   * [
   *  {
   *    "proc": "@webview_devtools_remote_24408",
   *    "webview": "WEBVIEW_24408",
   *    "info": {
   *      "Android-Package": "com.saucelabshybridapp",
   *      "Browser": "Chrome/74.0.3729.185",
   *      "Protocol-Version": "1.3",
   *      "User-Agent": "Mozilla/5.0 (Linux; Android 10; Android SDK built for x86 Build/QSR1.200403.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/74.0.3729.185 Mobile Safari/537.36",
   *      "V8-Version": "7.4.288.28",
   *      "WebKit-Version": "537.36 (@22955682f94ce09336197bfb8dffea991fa32f0d)",
   *      "webSocketDebuggerUrl": "ws://127.0.0.1:10900/devtools/browser"
   *    },
   *    "pages": [
   *      {
   *        "description": "{\"attached\":true,\"empty\":false,\"height\":1827,\"screenX\":0,\"screenY\":66,\"visible\":true,\"width\":1080}",
   *        "devtoolsFrontendUrl": "http://chrome-devtools-frontend.appspot.com/serve_rev/@22955682f94ce09336197bfb8dffea991fa32f0d/inspector.html?ws=127.0.0.1:10900/devtools/page/F12DEA4C43DEE2BA6A1B7DF25A9960D4",
   *        "faviconUrl": "https://saucelabs.com/images/favicon.png",
   *        "id": "F12DEA4C43DEE2BA6A1B7DF25A9960D4",
   *        "title": "Cross Browser Testing, Selenium Testing, Mobile Testing | Sauce Labs",
   *        "type": "page",
   *        "url": "https://saucelabs.com/",
   *        "webSocketDebuggerUrl": "ws://127.0.0.1:10900/devtools/page/F12DEA4C43DEE2BA6A1B7DF25A9960D4"
   *      },
   *      {
   *        "description": "{\"attached\":false,\"empty\":false,\"height\":1827,\"screenX\":0,\"screenY\":0,\"visible\":true,\"width\":1080}",
   *        "devtoolsFrontendUrl": "http://chrome-devtools-frontend.appspot.com/serve_rev/@22955682f94ce09336197bfb8dffea991fa32f0d/inspector.html?ws=127.0.0.1:10900/devtools/page/59487B4462BDBAC07550CE9DCFA4A55D",
   *        "faviconUrl": "https://www.saucedemo.com/favicon.ico",
   *        "id": "59487B4462BDBAC07550CE9DCFA4A55D",
   *        "title": "Swag Labs",
   *        "type": "page",
   *        "url": "https://www.saucedemo.com/",
   *        "webSocketDebuggerUrl": "ws://127.0.0.1:10900/devtools/page/59487B4462BDBAC07550CE9DCFA4A55D"
   *      },
   *      {
   *        "description": "",
   *        "devtoolsFrontendUrl": "http://chrome-devtools-frontend.appspot.com/serve_rev/@22955682f94ce09336197bfb8dffea991fa32f0d/worker_app.html?ws=127.0.0.1:10900/devtools/page/374D4E2AAE28A145E0132A41E3189C34",
   *        "id": "374D4E2AAE28A145E0132A41E3189C34",
   *        "title": "Service Worker https://www.saucedemo.com/service-worker.js",
   *        "type": "service_worker",
   *        "url": "https://www.saucedemo.com/service-worker.js",
   *        "webSocketDebuggerUrl": "ws://127.0.0.1:10900/devtools/page/374D4E2AAE28A145E0132A41E3189C34"
   *      }
   *    ],
   *    "webviewName": "WEBVIEW_com.saucelabs.mydemoapp.rn"
   *  }
   *]
   */
  private parsedAndroidContexts(
    contexts: androidContextsType,
  ): internalContextType {
    // Android can give back multiple apps that support WebViews, so an array of WebView apps.
    // We know that our webview has the name `WEBVIEW_com.saucelabs.mydemoapp.rn` so we are going to
    // search for it and filter all other apps out.
    return (
      contexts
        .filter(
          webview =>
            webview.webviewName === 'WEBVIEW_com.saucelabs.mydemoapp.rn',
        )[0]
        .pages // The pages array can contain real web pages, but also other types, like service workers.
        // We only need to have the real web pages, so we filter out all types that are not `type=page`
        .filter(page => page.type === 'page')
        // Reconstruct the data so it will be equal to iOS WebView object
        .map(page => ({
          // Keep in mind that all "tabs/windows" consist out of `CDwindow-{webviewId}` so we need to add that string
          id: `CDwindow-${page.id}`,
          title: page.title,
          url: page.url,
          webviewName: contexts[0].webviewName,
        }))
    );
  }
}

export default new WebviewScreen();
