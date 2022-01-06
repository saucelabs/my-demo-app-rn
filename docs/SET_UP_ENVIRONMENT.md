# Set Up Your Environment

## Getting Started

In order to be able to build the app and run the tests you must complete the following prerequisite steps:

- Install [Git](#install-git)
- Install [Node/NPM](#install-and-nodejs-and-npm)
- Install all [React Native Dependencies](#install-all-react-native-dependencies)
- (Optional) Install an IDE
- Install [Appium](#install-appium)

### Install Git

<details>
<summary>Click to see the steps</summary>

[Git](https://git-scm.com/doc) is a version control system that lets you check out code from a repository,
work with that code on your own branch, and then merge that code with any changes that have been made by other developers.
Git is an essential tool for distributed development teams, and is a critical component of the continuous
integration/continuous development toolchain.

##### MacOSX:

1. Go to [https://git-scm.com/downloads](https://git-scm.com/downloads).
2. Under **Downloads**, click **Mac OS X**.
3. When the download completes, double-click the `.dmg` file open the installer package.
4. Double-click the installer package to begin the installation.
   > _Security Warning_
   >
   > You may see a warning message that the package can't be opened because it's not from a recognized developer.
   > If this happens, go to System Preferences > Security and Privacy Settings, and click Open Anyway.
5. Click **Continue** for the installation, and enter your local password to authorize the installation.

##### Windows:

1. Go to [https://git-scm.com/downloads](https://git-scm.com/downloads)
2. Under **Downloads**, click on **Windows**.
3. When the dialog opens asking if you want to allow the app to make changes to your device, click Yes.
4. Follow the steps in the setup wizard to complete the installation. You should accept all the default settings.
</details>

### Install and NodeJS and NPM

<details>
<summary>Click to see the steps</summary>

You’ll need [Node.js](http://nodejs.org) installed.

- Install at least v14 or higher as this is the oldest active LTS version

> **NOTE:**\
> If you don't have Node installed, we recommend installing [NVM](https://github.com/creationix/nvm) to assist managing
> multiple active Node.js versions.

If you don't want to install NVM, but the plain version of NodeJS please follow the following steps:

#### MacOSX:

1. Go to [https://nodejs.org/en/download/](https://nodejs.org/en/download/).
2. Under **LTS**, click **Mac OS Installer X**.
3. When the download completes, double-click the `.pkg` file to open the installer
4. Follow the prompts to complete the installation.

#### Windows:

1. Go to [https://nodejs.org/en/download/](https://nodejs.org/en/download/).
2. Under **LTS**, click **Windows Installer**.
3. When the download completes, double-click the `.msi` file to open the installer
4. Follow the prompts to complete the installation.
</details>

### Install all React Native Dependencies

- Please follow the steps from the [React Native Docs](https://reactnative.dev/docs/environment-setup).

> **NOTE:** Make sure you select `React Native CLI Quickstart`, we are **NOT\*** using EXPO in this project.

### Install Appium

#### Appium Doctor

`appium-doctor` is used to diagnose and fix common Node, iOS and Android configuration issues before starting Appium. You only run it once to check your local machine. See an example output below.

```bash
npx appium-doctor

info AppiumDoctor Appium Doctor v.1.4.3
info AppiumDoctor ### Diagnostic starting ###
info AppiumDoctor  ✔ The Node.js binary was found at: /Users/exampleUser/.nvm/versions/node/v8.9.1/bin/node
info AppiumDoctor  ✔ Node version is 8.9.1
info AppiumDoctor  ✔ Xcode is installed at: /Applications/Xcode.app/Contents/Developer
info AppiumDoctor  ✔ Xcode Command Line Tools are installed.
info AppiumDoctor  ✔ DevToolsSecurity is enabled.
info AppiumDoctor  ✔ The Authorization DB is set up properly.
info AppiumDoctor  ✔ Carthage was found at: /usr/local/bin/carthage
info AppiumDoctor  ✔ HOME is set to: /Users/exampleUser
info AppiumDoctor  ✔ ANDROID_HOME is set to: /Users/exampleUser/Library/Android/sdk
info AppiumDoctor  ✔ JAVA_HOME is set to: /Library/Java/JavaVirtualMachines/jdk1.8.0_152.jdk/Contents/Home
info AppiumDoctor  ✔ adb exists at: /Users/exampleUser/Library/Android/sdk/platform-tools/adb
info AppiumDoctor  ✔ android exists at: /Users/exampleUser/Library/Android/sdk/tools/android
info AppiumDoctor  ✔ emulator exists at: /Users/exampleUser/Library/Android/sdk/tools/emulator
info AppiumDoctor  ✔ Bin directory of $JAVA_HOME is set
info AppiumDoctor ### Diagnostic completed, no fix needed. ###
info AppiumDoctor
info AppiumDoctor Everything looks good, bye!
info AppiumDoctor
```

When appium-doctor can, it will fix the problems for you, otherwise fix them manually. If you have some ENV issues make sure you have set them like this

```bash
export ANDROID_HOME=/Users/exampleUser/Library/Android/sdk
export JAVA_HOME=$(/usr/libexec/java_home)
export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools/adb:$ANDROID_HOME/build-tools:$JAVA_HOME/bin
# This one is used for the `start.android.emulator` script
export emulator=/Users/exampleUser/Library/Android/sdk/emulator
```

## Appium

> **NOTE:** The following steps assume Appium 2.0 is still in beta meaning it will install Appium 1.x

Install appium with `npm install -g appium@latest`.
If the `npm install` was successful you should be able to run this command `appium -v` and see a version like below.

```bash
➜  ~ appium -v
1.22.2
➜  ~
```

> Always make sure to check the Appium site if there is a new version. New Appium version are released mostly when Android/iOS release new versions. Bugfixes can also be released. Just check the [changelog](https://github.com/appium/appium/blob/master/CHANGELOG.md) for a clear overview
