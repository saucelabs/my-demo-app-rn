import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RNBootSplash from 'react-native-bootsplash';
// @ts-ignore
import TestFairy from 'react-native-testfairy';
import RootRouter from './navigation/RootRouter';
import SwagLabsStatusBar from './components/StatusBar';
import Linking from './navigation/Linking';
import {StoreProvider} from './store/Store';
import {Text} from 'react-native';

//Ignore all log notifications
LogBox.ignoreAllLogs();

enableScreens();

interface TextWithDefaultProps extends Text {
  defaultProps?: {allowFontScaling?: boolean};
}

const App = () => {
  /**
   * We want to disable font scaling for all devices because it breaks the layout
   */
  (Text as unknown as TextWithDefaultProps).defaultProps =
    (Text as unknown as TextWithDefaultProps).defaultProps || {};
  (Text as unknown as TextWithDefaultProps).defaultProps!.allowFontScaling =
    false;

  useEffect(() => {
    // We call stop to support hot-swap during development.
    // This call will be ignored silently for the initial app launch.
    TestFairy.stop();

    /////////////////////////////////////////////////////////////////////////////////////////
    //
    // Launch a TestFairy session. The session url will be in the logs for you to navigate.
    // Optionally, specify a private cloud endpoint if it applies to you.
    //
    // When TestFairy launches a session, these will be listened collected until the session
    // is stopped or app is closed:
    //
    //   - logs
    //   - crashes
    //   - video recording
    //   - http network events
    //   - feedbacks via forms launched when the users shakes their device
    //   - custom attributes set in the code w/ TestFairy.setAttribute()
    //   - events sent in the code w/ TestFairy.addEvent()
    //
    // and many others.
    //
    // All of this data will be available in your TestFairy web dashboard as well as
    // the REST API.
    //
    /////////////////////////////////////////////////////////////////////////////////////////
    // TestFairy.setServerEndpoint("https://your.privatecloud.example.com") // Private cloud only
    TestFairy.begin(process.env.TESTFAIRY_TOKEN);
    // Swap this line with the above if you don't want to record a session but still need
    // the shake gesture detection for the feedbacks.
    // TestFairy.installFeedbackHandler(process.env['TESTFAIRY_TOKEN']);
  }, []);

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
};

export default App;
