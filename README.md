# Sauce Labs My Demo App React Native
In this repository you will find the Sauce Labs My Demo App for React Native You can use it as a sample app for
testautomation on your local machine, in our Android Emulator/iOS Simulator, or Real Device Cloud.
The latest version of the iOS and Android app can be found [here](https://github.com/saucelabs/sample-app-mobile/releases).

## Table of contents
1. [Functionalities](#functionalities)
2. [Touch / Face ID](#touch--face-id)
    1. [Enabling Touch / Face ID on Android emulators](#enabling-touch--face-id-on-android-emulators)
    1. [Enabling Touch / Face ID on iOS simulators](#enabling-touch--face-id-on-ios-simulators)
3. [Deep linking](#deep-linking)
   1. [Android from CLI](#android-from-cli)
   1. [Use with iOS](#use-with-ios)
      1. [iOS from CLI](#ios-from-cli)
      1. [With Safari](#with-safari)
4. [Different languages](#different-languages)
5. [QR code scanner](#qr-code-scanner)
6. [Gestures](#gestures)
7. [Geo Location](#geo-location)
8. [Drawing](#drawing)
9. [Contributing to the app](#contributing-to-the-app)
10. [FAQ](#faq)
11. [Good to know](#good-to-know)
12. [TODO](#todo)

## Functionalities
### Touch / Face ID
This app supports TouchID and FaceID for Android and iOS and will only show when the phone supports and has this enabled.

#### Enabling Touch / Face ID on Android emulators
To enable this on Android emulators you need to do the following (when you have an emulator that supports this):

- Open an emulator
- Activate Screenlock from `Settings -> Security`
- Go to `Fingerprint` to add new fingerprint
- When prompt to place your finger on the scanner, emulate the fingerprint using adb command.

    ```bash
    adb -e emu finger touch <finger_id>
    
    #Example
    adb -e emu finger touch 1234
    ```

- You should see fingerprint detected message. That’s it. Done.

> **NOTE:<br>**
> Make sure you remember the fingerprint number you selected, that needs to be used to select a (non)matching finger print!

#### Enabling Touch / Face ID on iOS simulators
To enable this on iOS simulators you need to do the following (when you have a simulator that supports this):

- Open a simulator
- For Touch ID go to the Simulator menu and open `Hardware > Touch ID` and select `Enrolled`
- For Face ID go to the Simulator menu and open `Hardware > Face ID` and select `Enrolled`

In the previous mentioned menu you can also select a (non)matching Touch / Face ID when the phone is asking for it.

### Deep linking
This app supports deep linking for iOS and for Android, this means that screens can directly be opened with a deep link.

The prefix deep link is `mydemoapprn://` and the following screens (with their arguments) can be used:

| **Screen**            | **Path**                                     | **Remark**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|-----------------------|----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Products              | `store-overview`                             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Product details       | `product-details/{id}`                       | A *mandatory* number (from 1-6), basically the `id` of the products, see [here](./src/data/inventoryData.ts)                                                                                                                                                                                                                                                                                                                                                                                                |
| Cart                  | `cart/{products}`                            | A *optional* string like this `id=2&amount=2&color=black,id=2&amount=5&color=gray`, the `id` is mandatory, the rest will be defaulted if it's not/incorrect provided                                                                                                                                                                                                                                                                                                                                        |
| Login                 | `login`                                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Webview               | `webview`                                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Checkout Address      | `checkout-address`                           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Checkout Payment      | `checkout-payment`                           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Checkout Review Order | `checkout-review-order/{products}/{payment}` | - `products`: A *mandatory* string like this `id=2&amount=2&color=black,id=2&amount=5&color=gray`, the `id` is mandatory, the rest will be defaulted if it's not/incorrect provided <br/> - `payment`: An *optional* string which can be `default` or `different`. `default` means it uses default payment details and the same shipping address, `different` means it uses default payement details and a different shipping address.<br/><br/> **NOTE:** By default the address details are defaulted |
| Checkout Complete     | `checkout-complete`                          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| QR Code Scanner       | `qr-code-scanner`                            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Geo Location          | `geo-locations`                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Drawing               | `drawing`                                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| About                 | `about`                                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

#### Android from CLI
To trigger deep linking for Android you can use ADB commands. For more information see below.

> **NOTE:** the string needs to be escaped when characters like `&` are being used, so `cart/id=2&amount=2&color=black`
> becomes `cart/id=2\&amount=2\&color=black`

```bash
adb shell am start -W -a android.intent.action.VIEW -d "mydemoapprn://product-details/1" com.saucelabs.mydemoapp.rn
adb shell am start -W -a android.intent.action.VIEW -d "mydemoapprn://cart/id=2\&amount=2\&color=black" com.saucelabs.mydemoapp.rn
adb shell am start -W -a android.intent.action.VIEW -d "mydemoapprn://login" com.saucelabs.mydemoapp.rn
```

#### Use with iOS
There are 2 ways of using deep links with iOS, through a terminal or through Safari

##### iOS from CLI
> **NOTE:** the string needs to be escaped when characters like `&` are being used, so `cart/id=2&amount=2&color=black`
> becomes `cart/id=2\&amount=2\&color=black`
```bash
xcrun simctl openurl booted mydemoapprn://product-details/1
xcrun simctl openurl booted mydemoapprn://cart/id=2\&amount=2\&color=black
xcrun simctl openurl booted mydemoapprn://login
```

##### With Safari
Open Safari and type the following

```bash
mydemoapprn://product-details/1
```

It will prompt a dialog asking you to open the app, select *Yes* and it will open the screen you selected.

#### For Appium scripts
For Appium script the following command can be used

```js
// sample.spec.ts
import {openDeepLinkUrl} from '../../helpers/utils';

describe('Sample test', ()=>{
  it('should be able to open a screen through a deepling', async ()=>{
    // Open the product details screen for product 1, which is the `Backpack`
    await openDeepLinkUrl('product-details/1');
    
    // Open the cart screen with
    //  - product 1 (Backpack, amount is 1 and color is black)
    //  - product 1 (Backpack, amount is 2 and color is blue)
    await openDeepLinkUrl('cart/id=1&amount=1&color=black,id=1&amount=2&color=blue,');
    
    // Open the login page
    await openDeepLinkUrl('login');
  });
});
```

### Different languages
This app supports ~~4~~ 1 different languages and will automatically check the language of the device to set the right 
language. The supported languages are:

- ~~Dutch~~ @TODO
- ~~English
- ~~German~~ @TODO
- ~~Spanish~~ @TODO

### QR code scanner
This app now also has a QR code scanner.
You can find it in the menu under the option "QR CODE SCANNER".
This page opens the camera (you first need to allow the app to use the camera) which can be used to scan a QR Code.
If the QR code holds an URL it will automatically open it in a browser. The following image can be used to demo this option.

![QR Code](./docs/assets/qr-code.png)

### Gestures
~~This app also support different Gestures which can be found below.~~ @TODO

### Geo Location
This app now also supports testing changing the Geo Location. It will pick up changes when the location is mocked.

### Drawing
Drawing your favorite Sauce Bolt can now been done in this app, you can even save it to your camera roll.

## Contributing to the app
If you want to contribute to the app and add new functionalities, please check the documentation [here](./docs/CONTRIBUTING.md).

## FAQ
### React Native on Android: Cannot run program “node”: error=2, No such file or directory
Check [this](https://stackoverflow.com/questions/61922174/react-native-on-android-cannot-run-program-node-error-2-no-such-file-or-dir)
post.

### Android Studio error "Installed Build Tools revision 31.0.0/32.0.0 is corrupted"
See [this SO answer](https://stackoverflow.com/a/68430992/5911978).

## Good to know
### Added FBJS
We needed to add [fbjs](https://www.npmjs.com/package/fbjs) as an extra dependency for `react-native-cameraroll`, it was
included as a dependency of the package. There is a PR created for this, but at the time of migration this wasn't merged
yet, see [here](https://github.com/react-native-cameraroll/react-native-cameraroll/pull/365).

### Disabled fade for bootslash
After upgrading to `0.64.4` I got an issue with `reat-native-bootsplash`, the error was

    NSInvalidArgumentException: Application tried to present modally an active controller

I needed to change this
```jsx
return (
  <StoreProvider>
    <SafeAreaProvider>
      <SwagLabsStatusBar />
      <NavigationContainer
        linking={Linking}
        onReady={() => RNBootSplash.hide({fade: true})}>
        <RootRouter />
      </NavigationContainer>
    </SafeAreaProvider>
  </StoreProvider>
);
```

to this
```jsx
 return (
    <StoreProvider>
      <SafeAreaProvider>
        <SwagLabsStatusBar />
        <NavigationContainer
          linking={Linking}
          onReady={() => RNBootSplash.hide()}>
          <RootRouter />
        </NavigationContainer>
      </SafeAreaProvider>
    </StoreProvider>
  );
```
See [here](https://github.com/zoontek/react-native-bootsplash/issues/161#issuecomment-1002114293)


## TODO
- [x] TestIds
- [ ] TestFairy integration
  - [ ] Add TF SDK
  - [ ] Add TF events, see [this](https://github.com/saucelabs/sample-app-mobile/pull/74) for an example
- [x] Splash screen
- [x] Android/iOS icons
- [x] About screen
- [x] Empty cart
- [x] TouchId/FaceId
- [x] Deep linking with login
- [x] Webview
- [ ] Different Languages
  - [x] English
  - [ ] Dutch
  - [ ] Spanish
  - [ ] Deutsch
- [x] QR-code scanner
- [ ] Gestures
  - [ ] Drag and Drop
  - [ ] Pinch Zoom
  - [ ] Swipe
- [x] GEO location
- [x] Drawing
- [ ] Think if we need to store data to the _local_ storage or keep it in the session storage.
- [ ] Write Tests:
  - [ ] Unit Tests
  - [x] E2E Tests
    - [x] Catalog
    - [x] Product details
    - [x] Cart
    - [x] Login
    - [x] Checkout Address
    - [x] Checkout Payment
    - [x] Checkout Review Order
    - [x] Checkout Complete
- [ ] Upgrade dependencies (to all  `npx react-native init TsDemo --template react-native-template-typescript` v:`0.66.4`)
  - [] Dependencies
    - [x] react-native
    - [x] @react-native-community/cameraroll
    - [x] @react-native-community/masked-view
    - [x] @react-navigation/bottom-tabs
    - [x] card-validator
    - [x] expo-local-authentication
    - [x] i18n-js
    - [x] react-native-bootsplash
    - [x] react-native-camera
    - [x] react-native-fs
    - [x] react-native-geolocation-service
    - [x] react-native-gesture-handler
    - [x] react-native-keyboard-aware-scroll-view
    - [x] react-native-localize
    - [x] react-native-permissions
    - [x] react-native-qrcode-scanner
    - [x] react-native-reanimated
    - [x] react-native-safe-area-context
    - [x] react-native-screens
    - [x] react-native-signature-canvas
    - [ ] react-native-testfairy
    - [x] react-native-unimodules
    - [x] react-native-vector-icons
    - [x] react-native-version-number
    - [x] react-native-webview
    - [x] rn-fetch-blob
  - [x] devDependencies
    - [x] babel 
    - [x] @react-native-community/eslint-config
    - [x] @types/i18n-js
    - [x] eslint
    - [x] eslint-plugin-wdio
    - [x] jest
    - [x] react-native-clean-project
    - [x] react-native-version
    - [x] ts-node
    - [x] typescript 
    - [x] wdio
- [ ] Remove dependencies
  - [ ] Remove FBJS, see [here](#added-fbjs) 
