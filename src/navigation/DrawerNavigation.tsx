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
import TestFairy from 'react-native-testfairy';
import {Colors} from '../styles/Colors';
import {ROUTES} from './Routes';
import {StoreContext} from '../store/Store';
import {enableBiometrics, logout} from '../store/actions/AuthenticationActions';
import {IS_IOS, MUSEO_SANS_300} from '../utils/Constants';
import {DrawerActions} from '@react-navigation/native';
import {resetCart} from '../store/actions/CartActions';
import {resetCardDetails} from '../store/actions/CardDetailsActions';
import {resetShippingAddress} from '../store/actions/ShippingAddressActions';
import I18n from '../config/I18n';
import {testProperties} from '../config/TestProperties';
import ReactNativeBiometrics from 'react-native-biometrics';

const DrawerContent: FC<DrawerContentComponentProps> = ({navigation}) => {
  const {
    state: {
      authentication: {
        biometricsType,
        isBiometricsAvailable,
        isBiometricsEnabled,
      },
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
          onPress: () => {
            dispatch(resetCart());
            dispatch(resetCardDetails());
            dispatch(resetShippingAddress());
            dispatch(enableBiometrics(false));
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
  const navigateToReportABug = () => {
    TestFairy.stop();
    TestFairy.begin(process.env.TESTFAIRY_TOKEN);
  };
  const navigateToBiometrics = () =>
    navigation.navigate(ROUTES.MENU_STACK_NAVIGATOR, {
      screen: ROUTES.BIOMETRICS,
    });
  const biometricsLabel = isBiometricsAvailable
    ? biometricsType === ReactNativeBiometrics.TouchID
      ? 'drawer.biometrics.iOSTouchIdLabel'
      : biometricsType === ReactNativeBiometrics.FaceID
      ? 'drawer.biometrics.iOSFaceIdLabel'
      : 'drawer.biometrics.androidLabel'
    : 'drawer.biometrics.defaultHeader';
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
      label: I18n.t('drawer.reportABug.label'),
      testId: I18n.t('drawer.reportABug.testId'),
      onPress: navigateToReportABug,
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
      label: I18n.t(biometricsLabel),
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
          {...testProperties(testId)}>
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
    backgroundColor: Colors.lightRed,
  },
  menuLabel: {
    color: Colors.black,
    fontFamily: MUSEO_SANS_300,
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
    color: Colors.slRed,
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
