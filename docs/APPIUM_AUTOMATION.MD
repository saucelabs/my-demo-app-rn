# Appium Automation

## Table of contents
1. [Intro](#intro)
1. [Using Touch / Face ID during automation](#using-touch--face-id-during-automation)
    1. [Run on Android](#run-on-android)
    2. [Run on iOS](#run-on-ios)
    3. 
## Intro
Tests are run with:

* [webdriver.io](http://webdriver.io/): This is the testrunner that will orchestrate the tests between different devices
* [Mocha](https://mochajs.org/): The testingframework that is used to write the tests
* [Appium](http://appium.readthedocs.io/en/latest/README/): The cross-platfrom tool for native, hybrid and mobile web apps.

Tests are written in TypeScript.

> **@TODO: write more docs**

## Using Touch / Face ID during automation
There are some test cases (success and failure) created for testing Touch / Face ID for emulators and simulators, please 
see below for the instructions.

### Run on Android
> **@TODO: write more docs**

```bash
# Run on local Android emulators
yarn test.e2e.android.local.emu --spec=__tests__/e2e/specs/extra/biometrics.emusim.spec.ts 

# Run on Sauce Labs Android Real Devices in the EU cloud
BIOMETRICS=true yarn test.e2e.android.sauce.rdc.eu --spec=__tests__/e2e/specs/extra/biometrics.rdc.spec.ts
# Run on Sauce Labs Android Real Devices in the US cloud
BIOMETRICS=true yarn test.e2e.android.sauce.rdc.us --spec=__tests__/e2e/specs/extra/biometrics.rdc.spec.ts
```

### Run on iOS
>**NOTE: <br>**
> Be aware of the usage of `autoAcceptAlerts: true,` when you run tests with Touch / Face ID.
> Even though it will automatically close the "Do you want to allow ..." alert, it will also automatically close the alert if you want to
> check a negative test with test where you need to verify that Touch / Face ID failed.

> **@TODO: write more docs**

```bash
# Run on local iOS simulators
yarn test.e2e.ios.local.sim --spec=__tests__/e2e/specs/extra/biometrics.emusim.spec.ts

# Run on Sauce Labs iOS Real Devices in the EU cloud
BIOMETRICS=true yarn test.e2e.ios.sauce.rdc.eu --spec=__tests__/e2e/specs/extra/biometrics.rdc.spec.ts
# Run on Sauce Labs iOS Real Devices in the US cloud
BIOMETRICS=true yarn test.e2e.ios.sauce.rdc.us --spec=__tests__/e2e/specs/extra/biometrics.rdc.spec.ts
```
