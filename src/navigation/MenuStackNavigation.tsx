import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TransitionScreenOptions} from '../config/Config';
import WebviewSelection from '../containers/WebviewSelection';
import Webview from '../containers/Webview';
import QrCodePage from '../containers/QrCodePage';
import GeoLocationPage from '../containers/GeoLocationPage';
import DrawingPage from '../containers/DrawingPage';
import AboutPage from '../containers/AboutPage';
import AppHeader from '../components/AppHeader';
import {ROUTES} from './Routes';
import {MenuStackParamList} from './types';
import BiometricsScreen from '../containers/Biometrics';
import SauceBotVideoPage from '../containers/SauceBotVideoPage';

const MenuStackNavigation = () => {
  const MenuStack = createStackNavigator<MenuStackParamList>();

  return (
    <MenuStack.Navigator
      screenOptions={({navigation}) => ({
        headerBackTitleVisible: false,
        ...TransitionScreenOptions,
        header: () => <AppHeader navigation={navigation} />,
      })}>
      <MenuStack.Screen
        component={WebviewSelection}
        name={ROUTES.WEBVIEW_SELECTION}
      />
      <MenuStack.Screen component={Webview} name={ROUTES.WEBVIEW} />
      <MenuStack.Screen component={QrCodePage} name={ROUTES.QR_CODE_SCANNER} />
      <MenuStack.Screen
        component={GeoLocationPage}
        name={ROUTES.GEO_LOCATION}
      />
      <MenuStack.Screen component={DrawingPage} name={ROUTES.DRAWING} />
      <MenuStack.Screen component={AboutPage} name={ROUTES.ABOUT} />
      <MenuStack.Screen component={BiometricsScreen} name={ROUTES.BIOMETRICS} />
      <MenuStack.Screen
        component={SauceBotVideoPage}
        name={ROUTES.SAUCE_BOT_VIDEO}
      />
    </MenuStack.Navigator>
  );
};

export default MenuStackNavigation;
