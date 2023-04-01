import React from 'react';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RNBootSplash from 'react-native-bootsplash';
// @ts-ignore
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
};

export default App;
