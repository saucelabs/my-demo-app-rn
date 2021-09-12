# Contributing to the app

> **NOTE<br>**
> This project uses Yarn 1. How to set up yarn can be found [here](https://yarnpkg.com/lang/en/docs/install/#mac-stable)

You can:
- add new functionality 
- fix bugs
- add / fix tests
by following the instructions below.

## Table of contents
1. [Set up your environment](#set-up-your-environment)
1. [Linting the code](#linting-the-code)
1. [i18n internationalization](#i18n-internationalization)
1. [AccessibilityID's](#accessibilityids)
1. [Running tests on a local machine when you are developing your app](#running-tests-on-a-local-machine-when-you-are-developing-your-app)
1. [Building the app for the Sauce Labs Real Device Cloud (RDC)](#building-the-app-for-the-sauce-labs-real-device-cloud-rdc)x
1. [Versioning the app](#versioning-the-app)

## Set up your environment
- Please follow the steps from the [React Native Docs](https://reactnative.dev/docs/environment-setup).

> **NOTE:** Make sure you select `React Native CLI Quickstart`, we are not using EXPO in this project.

- Clone the project to your local machine with

    `git clone https://github.com/saucelabs/my-demo-app-rn.git`

- Go to the `my-demo-app-rn`-folder and install all dependencies with the command `yarn`

    > **NOTE:**<br/>
    > When you build the app you might get warnings or errors like this
    > ```log
    > error React Native CLI uses autolinking for native dependencies, but the following modules are linked manually: 
    >    - ......
    >  This is likely happening when upgrading React Native from below 0.60 to 0.60 or above. Going forward, you can unlink this dependency via "react-native unlink <dependency>" and it will be included in your app automatically. If a library isn't compatible with autolinking, disregard this message and notify the library maintainers.
    >  Read more about autolinking: https://github.com/react-native-community/cli/blob/master/docs/autolinking.md
    > ```
    > Then you have nothing to worry about. This is normal ;-)

- Open a new terminal to run the metro builder with this command `yarn start`. This will keep track of all JS changes
which you make in the app
- Run the app with `yarn android.dev` or `yarn ios.dev` to build the app for or Android or iOS

Happy hacking!

## Linting the code
The linting rules were taken from the React Native project itself and can be used by running 

```bash
yarn lint
```

Issues / warning will be shown in the console and most of them can automatically be fixed by running

```bash
yarn lint -- --fix
```

The linting will also be run on each `git push` and fail if there are issues.

## i18n internationalization
This application uses the module 
[`react-native-languages`](https://github.com/react-native-community/react-native-languages) (click on the link to see 
how it works) to provide translations in the app for all text components in the users preferred language.

> Currently only English, ~~Dutch, German and Spanish~~ are enabled, but more languages can be added

When adding text to this app, please add them to the translation-JSON-file that can be found 
[here](../src/config/translations/en.ts) and add it to the component like this

```js
import React from 'react';
import {Text, View} from 'react-native';
import I18n from '../config/I18n';

const ExampleComponent = ()=> {
  return (
    <View>
      <Text>{i18n.t('key')}</Text>
    </View>
  );
};

export default ExampleComponent;
```

## AccessibilityID's
This application uses accessibilityID's which makes it easier to select elements in a cross platform way with Appium.

When adding a new component to the code that can be used to interact with or that displays text needs to be provided 
with a `testProperties` that will automatically add the accessibilityID to the component.
For example, with a button component the following code needs to be added

    <Button title={i18n.t('menu.reset')} {...testProperties(i18n.t('menu.reset'))}/>

Always try to use the text that is already available in the translation-TS-file that can be found 
[here](../src/config/translations/en.ts).

## Running tests on a local machine when you are developing your app
@TODO

## Building the app for the Sauce Labs Real Device Cloud (RDC)
@TODO

## Versioning the app
@TODO
