# Appium Automation

## Table of contents

1. [Getting Started](#getting-started)
1. [Run all default tests](#run-all-default-tests)
1. [Using Touch / Face ID / Fingerprint during automation](#using-touch--face-id--fingerprint-during-automation)
1. [Using Camera Image Injection during Real Device automation](#using-camera-image-injection-during-real-device-automation)
1. [Automating a Webview with Appium](#automating-a-webview-with-appium)
1. [Mocking GEO Location during automation](#mocking-geo-location-during-automation)
1. [Use Appium to draw on a screen](#use-appium-to-draw-on-a-screen)
1. [FAQ](#faq)

## Getting Started

> **NOTE:** Make sure you've set up your local machine before running the tests, see
> [Set Up Your Environment](./SET_UP_ENVIRONMENT.md) for more information.

Tests are run with:

- [webdriver.io](http://webdriver.io/): This is the testrunner that will orchestrate the tests between different devices
- [Mocha](https://mochajs.org/): The testingframework that is used to write the tests
- [Appium](http://appium.readthedocs.io/en/latest/README/): The cross-platfrom tool for native, hybrid and mobile web apps.

and, like the source code of the app, written in TypeScript.

> **NOTE:** Before you can run the tests on Sauce Labs Android Emulators/iOS Simulators or Real Devices you first need
> to upload the apps to the Sauce Labs Storage. More information about how to do this can be found
> [here](https://docs.saucelabs.com/mobile-apps/app-storage/).

Local Android tests are executed on a Google Pixel 3 with Android 10 which has the deviceName `Pixel_3_10.0`. Make sure
you have the same configuration which can be found [here](../__tests__/e2e/configs/wdio.android.local.emu.conf.ts), or
alter it to what you would like to use.

Local iOS tests are executed on an iPhone 13 with iOS 15.2 which has the deviceName `iPhone 13`. Make sure you have the
same configuration which can be found [here](../__tests__/e2e/configs/wdio.ios.local.sim.conf.ts), or alter it to what
you would like to use.

## Run all default tests

### Run on Android

#### Local or Sauce Labs Emulators

The folder [`_tests__/e2e/specs/default/`](../_tests__/e2e/specs/default/) will hold all default tests that can be executed on:

- local Android Emulators / iOS simulators
- Sauce Labs Android Emulators / iOS simulators
- Sauce Labs Android / iOS real devices

This set of tests will validate the core functionality of the app and can be executed with the following command(s).

### Run on Android

#### Local or Sauce Labs Emulators

```bash
# Run on local Android emulators
yarn test.e2e.android.local.emu

# Run on Sauce Labs Android emulators in the EU cloud
yarn test.e2e.android.sauce.emu.eu
# Run on Sauce Labs Android emulators in the US cloud
yarn test.e2e.android.sauce.emu.us
```

#### Sauce Labs Real Device

```bash
# Run on Sauce Labs Android Real Devices in the EU cloud
yarn test.e2e.android.sauce.rdc.eu
# Run on Sauce Labs Android Real Devices in the US cloud
yarn test.e2e.android.sauce.rdc.us
```

### Run on iOS

#### Local or Sauce Labs Simulators

```bash
# Run on local iOS simulators
yarn test.e2e.ios.local.sim

# Run on Sauce Labs iOS Simulators in the EU cloud
yarn test.e2e.ios.sauce.sim.eu
# Run on Sauce Labs iOS Simulators in the US cloud
yarn test.e2e.ios.sauce.sim.us
```

#### Sauce Labs Real Device

```bash
# Run on Sauce Labs iOS Real Devices in the EU cloud
yarn test.e2e.ios.sauce.rdc.eu
# Run on Sauce Labs iOS Real Devices in the US cloud
yarn test.e2e.ios.sauce.rdc.us
```

### Logs
Running the test, on for example your local machine, will lead to the following logs (for Android, iOS will look similar)
<details>
<summary>Click to view the logs</summary>
```log
yarn test.e2e.android.local.emu                                                                                                                        took  1m 38s
yarn run v1.22.17
warning ../../../../package.json: No license field
$ npx wdio __tests__/e2e/configs/wdio.android.local.emu.conf.ts

Execution of 9 workers started at 2022-01-06T12:12:27.551Z

[0-0] RUNNING in Android - /__tests__/e2e/specs/default/cart.spec.ts
[0-0] PASSED in Android - /__tests__/e2e/specs/default/cart.spec.ts
[0-1] RUNNING in Android - /__tests__/e2e/specs/default/catalog.spec.ts
[0-1] PASSED in Android - /__tests__/e2e/specs/default/catalog.spec.ts
[0-2] RUNNING in Android - /__tests__/e2e/specs/default/checkout.address.spec.ts
[0-2] PASSED in Android - /__tests__/e2e/specs/default/checkout.address.spec.ts
[0-3] RUNNING in Android - /__tests__/e2e/specs/default/checkout.complete.spec.ts
[0-3] PASSED in Android - /__tests__/e2e/specs/default/checkout.complete.spec.ts
[0-4] RUNNING in Android - /__tests__/e2e/specs/default/checkout.payment.spec.ts
[0-4] PASSED in Android - /__tests__/e2e/specs/default/checkout.payment.spec.ts
[0-5] RUNNING in Android - /__tests__/e2e/specs/default/checkout.review.order.spec.ts
[0-5] PASSED in Android - /__tests__/e2e/specs/default/checkout.review.order.spec.ts
[0-6] RUNNING in Android - /__tests__/e2e/specs/default/item.details.spec.ts
[0-6] PASSED in Android - /__tests__/e2e/specs/default/item.details.spec.ts
[0-7] RUNNING in Android - /__tests__/e2e/specs/default/login.spec.ts
[0-7] Error in "Login.should be able to logout"
Error: element ("//android.widget.Button[contains(@text,'LOG OUT')]") still not displayed after 15000ms
    at /Users/Sauce/Git/sauce-apps/my-demo-app-rn/node_modules/webdriverio/build/commands/browser/waitUntil.js:66:23
    at async Element.wrapCommandFn (/Users/Sauce/Git/sauce-apps/my-demo-app-rn/node_modules/@wdio/utils/build/shim.js:131:29)
    at async Element.elementErrorHandlerCallbackFn (/Users/Sauce/Git/sauce-apps/my-demo-app-rn/node_modules/webdriverio/build/middlewares.js:24:32)
    at async Element.wrapCommandFn (/Users/Sauce/Git/sauce-apps/my-demo-app-rn/node_modules/@wdio/utils/build/shim.js:131:29)
    at async Element.wrapCommandFn (/Users/Sauce/Git/sauce-apps/my-demo-app-rn/node_modules/@wdio/utils/build/shim.js:131:29)
    at async Element.elementErrorHandlerCallbackFn (/Users/Sauce/Git/sauce-apps/my-demo-app-rn/node_modules/webdriverio/build/middlewares.js:24:32)
    at async Element.wrapCommandFn (/Users/Sauce/Git/sauce-apps/my-demo-app-rn/node_modules/@wdio/utils/build/shim.js:131:29)
    at async Menu.logout (/Users/Sauce/Git/sauce-apps/my-demo-app-rn/__tests__/e2e/screen-objects/Menu.ts:143:5)
    at async Context.<anonymous> (/Users/Sauce/Git/sauce-apps/my-demo-app-rn/__tests__/e2e/specs/default/login.spec.ts:45:5)
[0-7] FAILED in Android - /__tests__/e2e/specs/default/login.spec.ts
[0-8] RUNNING in Android - /__tests__/e2e/specs/default/navigation.spec.ts
[0-8] PASSED in Android - /__tests__/e2e/specs/default/navigation.spec.ts

 "spec" Reporter:
------------------------------------------------------------------
[emulator-5554 Android 10 #0-0] Running: emulator-5554 on Android 10 executing /Users/Sauce/Git/sauce-apps/my-demo-app-rn/android/app/build/outputs/apk/debug/Android-MyDemoAppRN.1.0.0.apk
[emulator-5554 Android 10 #0-0] Session ID: 0a2c42e2-1932-44ed-a593-9bae493d2850
[emulator-5554 Android 10 #0-0]
[emulator-5554 Android 10 #0-0] » /__tests__/e2e/specs/default/cart.spec.ts
[emulator-5554 Android 10 #0-0] Cart
[emulator-5554 Android 10 #0-0]    ✓ should not show any bought products and allow you to go back to the catalog
[emulator-5554 Android 10 #0-0]    ✓ should verify that the screen will be updated when one item will be removed with the counter
[emulator-5554 Android 10 #0-0]    ✓ should verify that the screen will be updated when one item will be added with the counter
[emulator-5554 Android 10 #0-0]    ✓ should be able to remove a single item with multiple orders from the cart with the remove item button
[emulator-5554 Android 10 #0-0]    ✓ should be able to remove a second item with the remove item button
[emulator-5554 Android 10 #0-0]    ✓ should navigate to the login screen when a user wants to proceed to checkout but was never logged in
[emulator-5554 Android 10 #0-0]    ✓ should navigate to the checkout screen when a user was already logged in
[emulator-5554 Android 10 #0-0]
[emulator-5554 Android 10 #0-0] 7 passing (1m 29.4s)
------------------------------------------------------------------
[emulator-5554 Android 10 #0-1] Running: emulator-5554 on Android 10 executing /Users/Sauce/Git/sauce-apps/my-demo-app-rn/android/app/build/outputs/apk/debug/Android-MyDemoAppRN.1.0.0.apk
[emulator-5554 Android 10 #0-1] Session ID: 92d414ef-5512-4bb4-8662-76fc7c5d3058
[emulator-5554 Android 10 #0-1]
[emulator-5554 Android 10 #0-1] » /__tests__/e2e/specs/default/catalog.spec.ts
[emulator-5554 Android 10 #0-1] Catalog
[emulator-5554 Android 10 #0-1]    ✓ should be able to load the initial catalog screen
[emulator-5554 Android 10 #0-1]    ✓ should be able submit a review
[emulator-5554 Android 10 #0-1]    ✓ should be able to sort the items
[emulator-5554 Android 10 #0-1]    ✓ should be able to open the Backpack
[emulator-5554 Android 10 #0-1]    ✓ should be able to open the Bike Light
[emulator-5554 Android 10 #0-1]    ✓ should be able to open the Bolt T-Shirt
[emulator-5554 Android 10 #0-1]    ✓ should be able to open the Fleece Jacket
[emulator-5554 Android 10 #0-1]    ✓ should be able to open the Onesie
[emulator-5554 Android 10 #0-1]    ✓ should be able to open the Test.allTheThings()
[emulator-5554 Android 10 #0-1]
[emulator-5554 Android 10 #0-1] 9 passing (1m 38.7s)
------------------------------------------------------------------
[emulator-5554 Android 10 #0-2] Running: emulator-5554 on Android 10 executing /Users/Sauce/Git/sauce-apps/my-demo-app-rn/android/app/build/outputs/apk/debug/Android-MyDemoAppRN.1.0.0.apk
[emulator-5554 Android 10 #0-2] Session ID: c1ea9988-b796-478f-b3ed-d8eef5597e49
[emulator-5554 Android 10 #0-2]
[emulator-5554 Android 10 #0-2] » /__tests__/e2e/specs/default/checkout.address.spec.ts
[emulator-5554 Android 10 #0-2] Checkout Address Page
[emulator-5554 Android 10 #0-2]    ✓ should show all errors when an empty form is submitted
[emulator-5554 Android 10 #0-2]    ✓ should be able to submit minimal data
[emulator-5554 Android 10 #0-2]    ✓ should be able to submit with all data
[emulator-5554 Android 10 #0-2]
[emulator-5554 Android 10 #0-2] 3 passing (36.7s)
------------------------------------------------------------------
[emulator-5554 Android 10 #0-3] Running: emulator-5554 on Android 10 executing /Users/Sauce/Git/sauce-apps/my-demo-app-rn/android/app/build/outputs/apk/debug/Android-MyDemoAppRN.1.0.0.apk
[emulator-5554 Android 10 #0-3] Session ID: 93d531a5-753c-44c7-818e-3d743e1a0ade
[emulator-5554 Android 10 #0-3]
[emulator-5554 Android 10 #0-3] » /__tests__/e2e/specs/default/checkout.complete.spec.ts
[emulator-5554 Android 10 #0-3] Checkout Complete
[emulator-5554 Android 10 #0-3]    ✓ should be able to continue shopping
[emulator-5554 Android 10 #0-3]
[emulator-5554 Android 10 #0-3] 1 passing (4s)
------------------------------------------------------------------
[emulator-5554 Android 10 #0-4] Running: emulator-5554 on Android 10 executing /Users/Sauce/Git/sauce-apps/my-demo-app-rn/android/app/build/outputs/apk/debug/Android-MyDemoAppRN.1.0.0.apk
[emulator-5554 Android 10 #0-4] Session ID: ce7e2528-edfb-475d-acee-fcb8ed856b11
[emulator-5554 Android 10 #0-4]
[emulator-5554 Android 10 #0-4] » /__tests__/e2e/specs/default/checkout.payment.spec.ts
[emulator-5554 Android 10 #0-4] Checkout Payment Page
[emulator-5554 Android 10 #0-4]    ✓ should show all card data errors when an empty card data form is submitted
[emulator-5554 Android 10 #0-4]    ✓ should show card data errors after entering incorrect data
[emulator-5554 Android 10 #0-4]    ✓ should show all billing address errors when an empty billing address form is submitted
[emulator-5554 Android 10 #0-4]    ✓ should be able to submit card data
[emulator-5554 Android 10 #0-4]    ✓ should be able to submit card and minimal billing address data
[emulator-5554 Android 10 #0-4]    ✓ should be able to submit card and all billing address data
[emulator-5554 Android 10 #0-4]
[emulator-5554 Android 10 #0-4] 6 passing (1m 42.8s)
------------------------------------------------------------------
[emulator-5554 Android 10 #0-5] Running: emulator-5554 on Android 10 executing /Users/Sauce/Git/sauce-apps/my-demo-app-rn/android/app/build/outputs/apk/debug/Android-MyDemoAppRN.1.0.0.apk
[emulator-5554 Android 10 #0-5] Session ID: 48b30bfb-3b87-43c8-abb8-31f9ea1feee6
[emulator-5554 Android 10 #0-5]
[emulator-5554 Android 10 #0-5] » /__tests__/e2e/specs/default/checkout.review.order.spec.ts
[emulator-5554 Android 10 #0-5] Checkout Review Order
[emulator-5554 Android 10 #0-5]    ✓ should verify that all details are shown properly when 1 item is added
[emulator-5554 Android 10 #0-5]    ✓ should verify that the billing address can be different
[emulator-5554 Android 10 #0-5]    ✓ should verify multiple items could have been added
[emulator-5554 Android 10 #0-5]    ✓ should be able to place an order
[emulator-5554 Android 10 #0-5]
[emulator-5554 Android 10 #0-5] 4 passing (31.9s)
------------------------------------------------------------------
[emulator-5554 Android 10 #0-6] Running: emulator-5554 on Android 10 executing /Users/Sauce/Git/sauce-apps/my-demo-app-rn/android/app/build/outputs/apk/debug/Android-MyDemoAppRN.1.0.0.apk
[emulator-5554 Android 10 #0-6] Session ID: fbd7c922-3b15-4e2e-8f74-ec1481e66649
[emulator-5554 Android 10 #0-6]
[emulator-5554 Android 10 #0-6] » /__tests__/e2e/specs/default/item.details.spec.ts
[emulator-5554 Android 10 #0-6] Item Details
[emulator-5554 Android 10 #0-6]    ✓ should be able to navigate back
[emulator-5554 Android 10 #0-6]    ✓ should be able submit a review
[emulator-5554 Android 10 #0-6]    ✓ should be able add items to the cart
[emulator-5554 Android 10 #0-6]    ✓ should be able validate the counter
[emulator-5554 Android 10 #0-6]
[emulator-5554 Android 10 #0-6] 4 passing (45.8s)
------------------------------------------------------------------
[emulator-5554 Android 10 #0-7] Running: emulator-5554 on Android 10 executing /Users/Sauce/Git/sauce-apps/my-demo-app-rn/android/app/build/outputs/apk/debug/Android-MyDemoAppRN.1.0.0.apk
[emulator-5554 Android 10 #0-7] Session ID: 3a9cc5fe-1df3-4ea3-a0d1-77bca9ffe0f8
[emulator-5554 Android 10 #0-7]
[emulator-5554 Android 10 #0-7] » /__tests__/e2e/specs/default/login.spec.ts
[emulator-5554 Android 10 #0-7] Login
[emulator-5554 Android 10 #0-7]    ✓ should be able to login with valid credentials
[emulator-5554 Android 10 #0-7]    ✓ should be able to login through the autofill
[emulator-5554 Android 10 #0-7]    ✖ should be able to logout
[emulator-5554 Android 10 #0-7]    ✓ should validate that an error message is shown when no username is provided
[emulator-5554 Android 10 #0-7]    ✓ should validate that an error message is shown when no password is provided
[emulator-5554 Android 10 #0-7]    ✓ should validate that an error message is shown when invalid credentials are provided
[emulator-5554 Android 10 #0-7]    ✓ should validate that an error message is shown when credentials of a locked out user are provided
[emulator-5554 Android 10 #0-7]    ✓ should validate that an error message is shown when credentials of a locked out user are provided through the autofill
[emulator-5554 Android 10 #0-7]
[emulator-5554 Android 10 #0-7] 7 passing (2m 2.5s)
[emulator-5554 Android 10 #0-7] 1 failing
[emulator-5554 Android 10 #0-7]
[emulator-5554 Android 10 #0-7] 1) Login should be able to logout
[emulator-5554 Android 10 #0-7] element ("//android.widget.Button[contains(@text,'LOG OUT')]") still not displayed after 15000ms
[emulator-5554 Android 10 #0-7] Error: element ("//android.widget.Button[contains(@text,'LOG OUT')]") still not displayed after 15000ms
[emulator-5554 Android 10 #0-7]     at /Users/Sauce/Git/sauce-apps/my-demo-app-rn/node_modules/webdriverio/build/commands/browser/waitUntil.js:66:23
[emulator-5554 Android 10 #0-7]     at async Element.wrapCommandFn (/Users/Sauce/Git/sauce-apps/my-demo-app-rn/node_modules/@wdio/utils/build/shim.js:131:29)
[emulator-5554 Android 10 #0-7]     at async Element.elementErrorHandlerCallbackFn (/Users/Sauce/Git/sauce-apps/my-demo-app-rn/node_modules/webdriverio/build/middlewares.js:24:32)
[emulator-5554 Android 10 #0-7]     at async Element.wrapCommandFn (/Users/Sauce/Git/sauce-apps/my-demo-app-rn/node_modules/@wdio/utils/build/shim.js:131:29)
[emulator-5554 Android 10 #0-7]     at async Element.wrapCommandFn (/Users/Sauce/Git/sauce-apps/my-demo-app-rn/node_modules/@wdio/utils/build/shim.js:131:29)
[emulator-5554 Android 10 #0-7]     at async Element.elementErrorHandlerCallbackFn (/Users/Sauce/Git/sauce-apps/my-demo-app-rn/node_modules/webdriverio/build/middlewares.js:24:32)
[emulator-5554 Android 10 #0-7]     at async Element.wrapCommandFn (/Users/Sauce/Git/sauce-apps/my-demo-app-rn/node_modules/@wdio/utils/build/shim.js:131:29)
[emulator-5554 Android 10 #0-7]     at async Menu.logout (/Users/Sauce/Git/sauce-apps/my-demo-app-rn/__tests__/e2e/screen-objects/Menu.ts:143:5)
[emulator-5554 Android 10 #0-7]     at async Context.<anonymous> (/Users/Sauce/Git/sauce-apps/my-demo-app-rn/__tests__/e2e/specs/default/login.spec.ts:45:5)
------------------------------------------------------------------
[emulator-5554 Android 10 #0-8] Running: emulator-5554 on Android 10 executing /Users/Sauce/Git/sauce-apps/my-demo-app-rn/android/app/build/outputs/apk/debug/Android-MyDemoAppRN.1.0.0.apk
[emulator-5554 Android 10 #0-8] Session ID: 7f55c016-b0ff-4717-80ed-4d850fa5f9b7
[emulator-5554 Android 10 #0-8]
[emulator-5554 Android 10 #0-8] » /__tests__/e2e/specs/default/navigation.spec.ts
[emulator-5554 Android 10 #0-8] Navigation
[emulator-5554 Android 10 #0-8]    ✓ should be able to navigate from the cart to the payment screen and back
[emulator-5554 Android 10 #0-8]    ✓ should be able to navigate to all screens from the menu
[emulator-5554 Android 10 #0-8]
[emulator-5554 Android 10 #0-8] 2 passing (1m 0.8s)


Spec Files:      8 passed, 1 failed, 9 total (100% completed) in 00:11:50
```
</details>
## Using Touch / Face ID / Fingerprint during automation

There are some test cases (success and failure) created for testing Touch / Face ID for emulators and simulators, please
see below for the instructions.

> **NOTE:** When you want to test TouchID/FaceID/Fingerprint on Sauce Labs Real Device you need to make sure that the
> settings of the uploaded apps have:
>
> - **AND** `Instrumentation`
> - **AND** `Biometrics Interception` enabled.
>
> See [this](https://docs.saucelabs.com/mobile-apps/features/biometric-authentication/) for more information.

### Run on Android

#### Local or Sauce Labs Emulators

> **NOTE:**
> The test script for Android Emulators ([`biometrics.emusim.spec.ts`](../__tests__/e2e/specs/extra/biometrics.emusim.spec.ts))
> will automatically enable Fingerprint for you, even if your Android emulator has not been configured for it yet.
> The script supports the Android 7-12 emulator workflow.

```bash
# Run on local Android emulators
yarn test.e2e.android.local.emu --spec=__tests__/e2e/specs/extra/biometrics.emusim.spec.ts

# Run on Sauce Labs Android emulators in the EU cloud
yarn test.e2e.android.sauce.emu.eu --spec=__tests__/e2e/specs/extra/biometrics.emusim.spec.ts
# Run on Sauce Labs Android emulators in the US cloud
yarn test.e2e.android.sauce.emu.us --spec=__tests__/e2e/specs/extra/biometrics.emusim.spec.ts
```

#### Sauce Labs Real Device

> **NOTE:**
> When `BIOMETRICS=true` has been provided from the command line it will start the driver with `allowTouchIdEnroll`
> enabled, see [`wdio.android.sauce.rdc.conf.ts`](../__tests__/e2e/configs/wdio.android.sauce.rdc.conf.ts)

```bash
# Run on Sauce Labs Android Real Devices in the EU cloud
BIOMETRICS=true yarn test.e2e.android.sauce.rdc.eu --spec=__tests__/e2e/specs/extra/biometrics.rdc.spec.ts
# Run on Sauce Labs Android Real Devices in the US cloud
BIOMETRICS=true yarn test.e2e.android.sauce.rdc.us --spec=__tests__/e2e/specs/extra/biometrics.rdc.spec.ts
```

### Run on iOS

#### Local or Sauce Labs Simulators

> **NOTE 1: <br>**
> Be aware of the usage of `autoAcceptAlerts: true,` when you run tests with Touch / Face ID.
> Even though it will automatically close the "Do you want to allow ..." alert, it will also automatically close the alert if you want to
> check a negative test where you need to verify that Touch / Face ID failed because it was not enabled on the device
> itself.

> **NOTE 2:<br>**
> The test script for iOS Simulators ([`biometrics.emusim.spec.ts`](../__tests__/e2e/specs/extra/biometrics.emusim.spec.ts))
> will automatically enable TouchId/FaceId for you, even if your iOS simulator has not been configured for it yet.

```bash
# Run on local iOS simulators
yarn test.e2e.ios.local.sim --spec=__tests__/e2e/specs/extra/biometrics.emusim.spec.ts

# Run on Sauce Labs iOS Simulators in the EU cloud
yarn test.e2e.ios.sauce.sim.eu --spec=__tests__/e2e/specs/extra/biometrics.emusim.spec.ts
# Run on Sauce Labs iOS Simulators in the US cloud
yarn test.e2e.ios.sauce.sim.us --spec=__tests__/e2e/specs/extra/biometrics.emusim.spec.ts
```

#### Sauce Labs Real Device

> **NOTE:**
> When `BIOMETRICS=true` has been provided from the command line it will start the driver with `allowTouchIdEnroll`
> enabled, see [`wdio.ios.sauce.rdc.conf.ts`](../__tests__/e2e/configs/wdio.ios.sauce.rdc.conf.ts)

```bash
# Run on Sauce Labs iOS Real Devices in the EU cloud
BIOMETRICS=true yarn test.e2e.ios.sauce.rdc.eu --spec=__tests__/e2e/specs/extra/biometrics.rdc.spec.ts
# Run on Sauce Labs iOS Real Devices in the US cloud
BIOMETRICS=true yarn test.e2e.ios.sauce.rdc.us --spec=__tests__/e2e/specs/extra/biometrics.rdc.spec.ts
```

## Using Camera Image Injection during Real Device automation

The Sauce Labs Real Device cloud supports camera image injection, see
[here](https://docs.saucelabs.com/mobile-apps/features/camera-image-injection/). This means that the camera
implementation in an app can be tested through manual or automated tests.

This app holds a QR-Code scanner that will automatically open the URL from the QR-code in a system browser. For this app
we use this image

![QR Code](assets/qr-code.png)

> **NOTE 1:**
>
> When you want to test Camera Image Injection on Sauce Labs Real Device you need to make sure that the
> settings of the uploaded apps have `Image Injection` enabled.

> **NOTE 2:**
>
> The app project setting for `Image Injection` can be overruled by providing the `sauceLabsImageInjectionEnabled`
> -capability with the value `true`. **This is also a best practice, so you always test what you want to test.**

### Run on Android

#### Sauce Labs Real Device

> **NOTE:**
> When `IMAGE_INJECTION=true` has been provided from the command line it will start the driver with
> `sauceLabsImageInjectionEnabled` enabled, see
> [`wdio.android.sauce.rdc.conf.ts`](../__tests__/e2e/configs/wdio.android.sauce.rdc.conf.ts)

```bash
# Run on Sauce Labs Android Real Devices in the EU cloud
IMAGE_INJECTION=true yarn test.e2e.android.sauce.rdc.eu --spec=__tests__/e2e/specs/extra/image.injection.rdc.spec.ts
# Run on Sauce Labs Android Real Devices in the US cloud
IMAGE_INJECTION=true yarn test.e2e.android.sauce.rdc.us --spec=__tests__/e2e/specs/extra/image.injection.rdc.spec.ts
```

### Run on iOS

#### Sauce Labs Real Device

> **NOTE:**
> When `IMAGE_INJECTION=true` has been provided from the command line it will start the driver with
> `sauceLabsImageInjectionEnabled` enabled, see
> [`wdio.ios.sauce.rdc.conf.ts`](../__tests__/e2e/configs/wdio.ios.sauce.rdc.conf.ts)

```bash
# Run on Sauce Labs iOS Real Devices in the EU cloud
IMAGE_INJECTION=true yarn test.e2e.ios.sauce.rdc.eu --spec=__tests__/e2e/specs/extra/image.injection.rdc.spec.ts
# Run on Sauce Labs iOS Real Devices in the US cloud
IMAGE_INJECTION=true yarn test.e2e.ios.sauce.rdc.us --spec=__tests__/e2e/specs/extra/image.injection.rdc.spec.ts
```

## Automating a Webview with Appium

There is a simple test that opens a url in a webview, you can find it [here](../__tests__/e2e/specs/extra/webview.spec.ts).

### Run on Android

#### Local or Sauce Labs Emulators

```bash
# Run on local Android emulators
yarn test.e2e.android.local.emu --spec=__tests__/e2e/specs/extra/webview.spec.ts

# Run on Sauce Labs Android emulators in the EU cloud
yarn test.e2e.android.sauce.emu.eu --spec=__tests__/e2e/specs/extra/webview.spec.ts
# Run on Sauce Labs Android emulators in the US cloud
yarn test.e2e.android.sauce.emu.us --spec=__tests__/e2e/specs/extra/webview.spec.ts
```

#### Sauce Labs Real Device

```bash
# Run on Sauce Labs Android Real Devices in the EU cloud
yarn test.e2e.android.sauce.rdc.eu --spec=__tests__/e2e/specs/extra/webview.spec.ts
# Run on Sauce Labs Android Real Devices in the US cloud
yarn test.e2e.android.sauce.rdc.us --spec=__tests__/e2e/specs/extra/webview.spec.ts
```

### Run on iOS

#### Local or Sauce Labs Simulators

```bash
# Run on local iOS simulators
yarn test.e2e.ios.local.sim --spec=__tests__/e2e/specs/extra/webview.spec.ts

# Run on Sauce Labs iOS Simulators in the EU cloud
yarn test.e2e.ios.sauce.sim.eu --spec=__tests__/e2e/specs/extra/webview.spec.ts
# Run on Sauce Labs iOS Simulators in the US cloud
yarn test.e2e.ios.sauce.sim.us --spec=__tests__/e2e/specs/extra/webview.spec.ts
```

#### Sauce Labs Real Device

```bash
# Run on Sauce Labs iOS Real Devices in the EU cloud
yarn test.e2e.ios.sauce.rdc.eu --spec=__tests__/e2e/specs/extra/webview.spec.ts
# Run on Sauce Labs iOS Real Devices in the US cloud
yarn test.e2e.ios.sauce.rdc.us --spec=__tests__/e2e/specs/extra/webview.spec.ts
```

## Mocking GEO Location during automation

There is a simple test that mocks the GPS location and validates if it changed, you can find it [here](../__tests__/e2e/specs/extra/geo.location.spec.ts).

### Run on Android

#### Local or Sauce Labs Emulators

```bash
# Run on local Android emulators
yarn test.e2e.android.local.emu --spec=__tests__/e2e/specs/extra/geo.location.spec.ts

# Run on Sauce Labs Android emulators in the EU cloud
yarn test.e2e.android.sauce.emu.eu --spec=__tests__/e2e/specs/extra/geo.location.spec.ts
# Run on Sauce Labs Android emulators in the US cloud
yarn test.e2e.android.sauce.emu.us --spec=__tests__/e2e/specs/extra/geo.location.spec.ts
```

#### Sauce Labs Real Device

```bash
# Run on Sauce Labs Android Real Devices in the EU cloud
yarn test.e2e.android.sauce.rdc.eu --spec=__tests__/e2e/specs/extra/geo.location.spec.ts
# Run on Sauce Labs Android Real Devices in the US cloud
yarn test.e2e.android.sauce.rdc.us --spec=__tests__/e2e/specs/extra/geo.location.spec.ts
```

### Run on iOS

#### Local or Sauce Labs Simulators

```bash
# Run on local iOS simulators
yarn test.e2e.ios.local.sim --spec=__tests__/e2e/specs/extra/geo.location.spec.ts

# Run on Sauce Labs iOS Simulators in the EU cloud
yarn test.e2e.ios.sauce.sim.eu --spec=__tests__/e2e/specs/extra/geo.location.spec.ts
# Run on Sauce Labs iOS Simulators in the US cloud
yarn test.e2e.ios.sauce.sim.us --spec=__tests__/e2e/specs/extra/geo.location.spec.ts
```

#### Sauce Labs Real Device

```bash
# Run on Sauce Labs iOS Real Devices in the EU cloud
yarn test.e2e.ios.sauce.rdc.eu --spec=__tests__/e2e/specs/extra/geo.location.spec.ts
# Run on Sauce Labs iOS Real Devices in the US cloud
yarn test.e2e.ios.sauce.rdc.us --spec=__tests__/e2e/specs/extra/geo.location.spec.ts
```

## Use Appium to draw on a screen

There is a simple test that will draw a Sauce Bolt on a canvas, you can find it [here](../__tests__/e2e/specs/extra/drawing.spec.ts).

> **NOTE:** There is no validation because it's not really possible with drawing

### Run on Android

#### Local or Sauce Labs Emulators

```bash
# Run on local Android emulators
yarn test.e2e.android.local.emu --spec=__tests__/e2e/specs/extra/drawing.spec.ts

# Run on Sauce Labs Android emulators in the EU cloud
yarn test.e2e.android.sauce.emu.eu --spec=__tests__/e2e/specs/extra/drawing.spec.ts
# Run on Sauce Labs Android emulators in the US cloud
yarn test.e2e.android.sauce.emu.us --spec=__tests__/e2e/specs/extra/drawing.spec.ts
```

#### Sauce Labs Real Device

```bash
# Run on Sauce Labs Android Real Devices in the EU cloud
yarn test.e2e.android.sauce.rdc.eu --spec=__tests__/e2e/specs/extra/drawing.spec.ts
# Run on Sauce Labs Android Real Devices in the US cloud
yarn test.e2e.android.sauce.rdc.us --spec=__tests__/e2e/specs/extra/drawing.spec.ts
```

### Run on iOS

#### Local or Sauce Labs Simulators

```bash
# Run on local iOS simulators
yarn test.e2e.ios.local.sim --spec=__tests__/e2e/specs/extra/drawing.spec.ts

# Run on Sauce Labs iOS Simulators in the EU cloud
yarn test.e2e.ios.sauce.sim.eu --spec=__tests__/e2e/specs/extra/drawing.spec.ts
# Run on Sauce Labs iOS Simulators in the US cloud
yarn test.e2e.ios.sauce.sim.us --spec=__tests__/e2e/specs/extra/drawing.spec.ts
```

#### Sauce Labs Real Device

```bash
# Run on Sauce Labs iOS Real Devices in the EU cloud
yarn test.e2e.ios.sauce.rdc.eu --spec=__tests__/e2e/specs/extra/drawing.spec.ts
# Run on Sauce Labs iOS Real Devices in the US cloud
yarn test.e2e.ios.sauce.rdc.us --spec=__tests__/e2e/specs/extra/drawing.spec.ts
```

## FAQ

### `An unknown server-side error occurred while processing the command` while sending text to an iOS simulator

Check [this](https://gist.github.com/wswebcreation/6ac27598718eb001cd208dd691db2a84) article on how to fix it.

### Tests are extremely slow / fail very often

It could be that the debugger is still on. Run tests without the debugger, the second issue could be that slowness is seen with Appium and iOS 15.x.
There are known issues with XCUITest and inputting values. This should have been solved with Appium `1.22.2` or higher.

### Appium ChromeDriver error

This app also uses a Webview. To be able to automate the Webview on Android you need to have the right version of ChromeDriver installed
together with Appium.
If you don't have the proper version of ChromeDriver on your machine (Appium will by default install the latest version on your machine
during the installation of Appium) you might get an error like this.

```bash
[Pixel_8.1 Android 8.1 #0-0] unknown error: An unknown server-side error occurred while processing the command. Original error: No Chromedriver found that can automate Chrome '61.0.3163'. See https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/web/chromedriver.md for more details.
```

Please following the instructions [here](https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/web/chromedriver.md) to
know how to solve this issue.
