# Appium Automation

## Table of contents

1. [Getting Started](#getting-started)
1. [Using Touch / Face ID / Fingerprint during automation](#using-touch--face-id--fingerprint-during-automation)
1. [Using Camera Image Injection during Real Device automation](#using-camera-image-injection-during-real-device-automation)
1. [Mocking GEO Location during automation](#mocking-geo-location-during-automation)

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
