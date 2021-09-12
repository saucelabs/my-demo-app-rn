import React, {useContext} from 'react';
import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import {IS_IOS, MUSEO_SANS_700} from '../utils/Constants';
import {Colors} from '../styles/Colors';
import {STATUS_BAR_HEIGHT} from './StatusBar';
import {StackNavigationProp} from '@react-navigation/stack';
import NavigationBackButton from './NavigationBackButton';
import {DrawerActions} from '@react-navigation/native';
import AndroidMenuButton from './AndroidMenuButton';
import {StoreContext} from '../store/Store';
import AndroidCartButton from './AndroidCartButton';
import {ROUTES} from '../navigation/Routes';

type AppHeaderProps = {
  navigation: StackNavigationProp<any>;
  showBackButton?: boolean;
  showHeaderImage?: boolean;
  hideAndroidCart?: boolean;
  title?: string;
  rightComponent?: React.ReactNode;
};

const AppHeader = ({
  navigation,
  showBackButton = true,
  showHeaderImage = true,
  hideAndroidCart = false,
  title,
  rightComponent,
}: AppHeaderProps) => {
  const {dangerouslyGetState, goBack} = navigation;
  const {
    state: {
      cartContent: {totalAmount},
    },
  } = useContext(StoreContext);

  return (
    <View style={styles.headerContainer}>
      {IS_IOS && dangerouslyGetState().routes.length > 1 && showBackButton && (
        <NavigationBackButton onPress={() => goBack()} />
      )}
      {!IS_IOS && (
        <AndroidMenuButton
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
      )}
      {title && <Text style={styles.headerText}>{title}</Text>}
      {showHeaderImage && (
        <Image
          style={styles.headerImage}
          resizeMode="contain"
          source={require('../assets/images/my-demo-app-logo.png')}
        />
      )}
      {((!IS_IOS && !hideAndroidCart) || rightComponent) && (
        <View style={styles.rightComponent}>
          {rightComponent}
          {!IS_IOS && !hideAndroidCart && (
            <AndroidCartButton
              amount={totalAmount}
              onPress={() =>
                navigation.navigate(ROUTES.CART_STACK_NAVIGATOR, {
                  screen: ROUTES.CART,
                })
              }
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.white,
    paddingBottom: 10,
    paddingHorizontal: 20,
    shadowColor: Colors.black,
    shadowOpacity: 0.14,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      android: {
        height: 50,
        paddingTop: 10,
      },
      ios: {
        height: STATUS_BAR_HEIGHT + 50,
        paddingTop: STATUS_BAR_HEIGHT + 10,
      },
    }),
  },
  headerText: {
    color: Colors.slRed,
    fontFamily: MUSEO_SANS_700,
    fontSize: 16,
  },
  headerImage: {
    height: 20,
    left: 'auto',
    right: 'auto',
    position: 'absolute',
    ...Platform.select({
      android: {
        top: 15,
      },
      ios: {
        top: STATUS_BAR_HEIGHT + 15,
      },
    }),
  },
  rightComponent: {
    marginLeft: 'auto',
    flexDirection: 'row',
  },
});

export default AppHeader;
