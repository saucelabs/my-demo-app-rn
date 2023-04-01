import React, {FC, useContext} from 'react';
import {
  Alert,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
// @ts-ignore
import {Colors} from '../styles/Colors';
import {ROUTES} from './Routes';
import {resetStore, StoreContext} from '../store/Store';
import {logout} from '../store/actions/AuthenticationActions';
import {IS_IOS, FONTS} from '../utils/Constants';
import {DrawerActions} from '@react-navigation/native';
import I18n from '../config/I18n';
import {testProperties} from '../config/TestProperties';
import {getBiometricsLabel} from '../containers/Biometrics';

const DrawerContent: FC<DrawerContentComponentProps> = ({navigation}) => {
  const {
    state: {
      authentication: {biometricsType, isBiometricsEnabled},
    },
    dispatch,
  } = useContext(StoreContext);
  const navigateToCatalog = () =>
    navigation.navigate(ROUTES.STORE_STACK_NAVIGATOR, {screen: ROUTES.STORE});
  const navigateToLogin = () =>
    navigation.navigate(ROUTES.CART_STACK_NAVIGATOR, {
      screen: ROUTES.LOGIN,
      params: {
        stack: ROUTES.STORE_STACK_NAVIGATOR,
        screen: ROUTES.STORE,
      },
    });
  const logOut = () => {
    Alert.alert(
      I18n.t('drawer.logOut.label'),
      I18n.t('drawer.logOut.areYouSure'),
      [
        {
          text: I18n.t('drawer.logOut.cancel'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: I18n.t('drawer.logOut.label'),
          onPress: () => {
            dispatch(logout());
            navigation.navigate(ROUTES.CART_STACK_NAVIGATOR, {
              screen: ROUTES.LOGIN,
            });
            if (!isBiometricsEnabled) {
              Alert.alert(I18n.t('drawer.logOut.resetSuccessful'));
            }
          },
        },
      ],
    );
  };
  const resetState = () => {
    Alert.alert(
      I18n.t('drawer.reset.label'),
      I18n.t('drawer.reset.areYouSure'),
      [
        {
          text: I18n.t('drawer.reset.cancel'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: I18n.t('drawer.reset.ok'),
          onPress: async () => {
            await resetStore(dispatch);
            Alert.alert(I18n.t('drawer.reset.resetSuccessful'));
          },
        },
      ],
    );
  };
  const navigateToWebview = () =>
    navigation.navigate(ROUTES.MENU_STACK_NAVIGATOR, {
      screen: ROUTES.WEBVIEW_SELECTION,
    });
  const navigateToQrScanner = () =>
    navigation.navigate(ROUTES.MENU_STACK_NAVIGATOR, {
      screen: ROUTES.QR_CODE_SCANNER,
    });
  const navigateToGeoLocation = () =>
    navigation.navigate(ROUTES.MENU_STACK_NAVIGATOR, {
      screen: ROUTES.GEO_LOCATION,
    });
  const navigateToDrawing = () =>
    navigation.navigate(ROUTES.MENU_STACK_NAVIGATOR, {screen: ROUTES.DRAWING});
  const navigateToAbout = () =>
    navigation.navigate(ROUTES.MENU_STACK_NAVIGATOR, {screen: ROUTES.ABOUT});
  const navigateToVideo = () =>
    navigation.navigate(ROUTES.MENU_STACK_NAVIGATOR, {
      screen: ROUTES.VIDEO,
    });
  const navigateToApiCalls = () =>
    navigation.navigate(ROUTES.MENU_STACK_NAVIGATOR, {
      screen: ROUTES.API_CALLS,
    });
  const navigateToBiometrics = () =>
    navigation.navigate(ROUTES.MENU_STACK_NAVIGATOR, {
      screen: ROUTES.BIOMETRICS,
    });
  const biometricsLabel = getBiometricsLabel(biometricsType);
  const menuItems = [
    {
      borderBottom: IS_IOS,
      icon: true,
      label: I18n.t('drawer.webview.label'),
      testId: I18n.t('drawer.webview.testId'),
      onPress: navigateToWebview,
    },
    {
      borderBottom: IS_IOS,
      icon: true,
      label: I18n.t('drawer.qrCode.label'),
      testId: I18n.t('drawer.qrCode.testId'),
      onPress: navigateToQrScanner,
    },
    {
      borderBottom: IS_IOS,
      icon: true,
      label: I18n.t('drawer.geoLocation.label'),
      testId: I18n.t('drawer.geoLocation.testId'),
      onPress: navigateToGeoLocation,
    },
    {
      borderBottom: true,
      icon: true,
      label: I18n.t('drawer.drawing.label'),
      testId: I18n.t('drawer.drawing.testId'),
      onPress: navigateToDrawing,
    },
    {
      borderBottom: IS_IOS,
      icon: false,
      label: I18n.t('drawer.about.label'),
      testId: I18n.t('drawer.about.testId'),
      onPress: navigateToAbout,
    },
    {
      borderBottom: IS_IOS,
      icon: false,
      label: I18n.t('drawer.reset.label'),
      testId: I18n.t('drawer.reset.testId'),
      onPress: resetState,
    },
    {
      borderBottom: IS_IOS,
      icon: false,
      label: biometricsLabel,
      testId: I18n.t('drawer.biometrics.testId'),
      onPress: navigateToBiometrics,
    },
    {
      borderBottom: IS_IOS,
      icon: false,
      label: I18n.t('drawer.logIn.label'),
      testId: I18n.t('drawer.logIn.testId'),
      onPress: navigateToLogin,
    },
    {
      borderBottom: IS_IOS,
      icon: false,
      label: I18n.t('drawer.logOut.label'),
      testId: I18n.t('drawer.logOut.testId'),
      onPress: logOut,
    },
    {
      borderBottom: IS_IOS,
      icon: false,
      label: I18n.t('drawer.apiCalls.label'),
      testId: I18n.t('drawer.apiCalls.testId'),
      onPress: navigateToApiCalls,
    },
    {
      borderBottom: IS_IOS,
      icon: false,
      label: I18n.t('drawer.video.label'),
      testId: I18n.t('drawer.video.testId'),
      onPress: navigateToVideo,
    },
  ];
  if (!IS_IOS) {
    menuItems.unshift({
      borderBottom: true,
      icon: true,
      label: I18n.t('drawer.catalog.label'),
      testId: I18n.t('drawer.catalog.testId'),
      onPress: navigateToCatalog,
    });
  }

  return (
    <DrawerContentScrollView style={styles.container}>
      {IS_IOS && (
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
          style={styles.menuCloseContainer}
          {...testProperties(I18n.t('drawer.closeMenu.testId'))}>
          <Image
            source={require('../assets/images/menuClose.png')}
            style={styles.menuClose}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
      {menuItems.map(({borderBottom, label, onPress, icon, testId}, index) => (
        <TouchableOpacity
          onPress={onPress}
          style={[styles.menuButton, borderBottom ? styles.borderBottom : {}]}
          key={`${index}-${label}`}
          {...testProperties(testId as string)}>
          <Text style={styles.menuLabel}>{label}</Text>
          {icon && IS_IOS && (
            <Image
              style={styles.icon}
              source={require('../assets/images/forward-icon.png')}
            />
          )}
        </TouchableOpacity>
      ))}
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      android: {
        paddingHorizontal: 0,
      },
      ios: {
        paddingHorizontal: 16,
      },
    }),
  },
  menuButton: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 18,
  },
  borderBottom: {
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,
  },
  activeMenuButton: {
    backgroundColor: Colors.green,
  },
  menuLabel: {
    color: Colors.darkGreen,
    fontFamily: FONTS.DM_MONO_MEDIUM,
    fontSize: 18,
    ...Platform.select({
      android: {
        paddingHorizontal: 16,
      },
      ios: {
        paddingHorizontal: 0,
      },
    }),
  },
  activeMenuLabel: {
    color: Colors.green,
  },
  menuCloseContainer: {
    alignSelf: 'flex-end',
    zIndex: 999,
    height: 20,
    width: 20,
    justifyContent: 'flex-end',
  },
  menuClose: {
    height: 20,
    width: 20,
  },
  icon: {
    height: 18,
    width: 20,
  },
});

export default DrawerContent;
