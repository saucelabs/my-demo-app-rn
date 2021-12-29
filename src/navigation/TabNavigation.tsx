import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StoreStackNavigation from './StoreStackNavigation';
import MenuStackNavigation from './MenuStackNavigation';
import CartStackNavigation from './CartStackNavigation';
import {TabParamList} from './types';
import {ROUTES} from './Routes';
import {StoreContext} from '../store/Store';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../styles/Colors';
import {MUSEO_SANS_300} from '../utils/Constants';
import I18n from '../config/I18n';

const TabNavigation = () => {
  const {
    state: {
      cartContent: {totalAmount = 0},
    },
  } = useContext(StoreContext);
  const TabNavigator = createBottomTabNavigator<TabParamList>();

  return (
    <TabNavigator.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.black,
        tabBarLabelStyle: styles.labelStyle,
      }}>
      <TabNavigator.Screen
        name={ROUTES.STORE_STACK_NAVIGATOR}
        component={StoreStackNavigation}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../assets/images/sl-active-icon.png')
                  : require('../assets/images/sl-inactive-icon.png')
              }
              style={styles.image}
            />
          ),
          tabBarLabel: I18n.t('tabBar.catalog.label'),
          tabBarTestID: I18n.t('tabBar.catalog.testId'),
        }}
      />
      <TabNavigator.Screen
        name={ROUTES.CART_STACK_NAVIGATOR}
        component={CartStackNavigation}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.cartContainer}>
              <Image
                source={
                  focused
                    ? require('../assets/images/cart-active-icon.png')
                    : require('../assets/images/cart-inactive-icon.png')
                }
                style={styles.image}
              />
              {totalAmount > 0 && (
                <View style={styles.tabBarBadgeStyle}>
                  <Text style={styles.tabBarBadgeText}>{totalAmount}</Text>
                </View>
              )}
            </View>
          ),
          tabBarLabel: I18n.t('tabBar.cart.label'),
          tabBarAccessibilityLabel: totalAmount.toString(),
          tabBarTestID: I18n.t('tabBar.cart.testId'),
        }}
      />
      <TabNavigator.Screen
        name={ROUTES.MENU_STACK_NAVIGATOR}
        component={MenuStackNavigation}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.openDrawer();
          },
        })}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../assets/images/menu-active-icon.png')
                  : require('../assets/images/menu-inactive-icon.png')
              }
              style={styles.image}
            />
          ),
          tabBarLabel: I18n.t('tabBar.menu.label'),
          tabBarTestID: I18n.t('tabBar.menu.testId'),
        }}
      />
    </TabNavigator.Navigator>
  );
};

const styles = StyleSheet.create({
  labelStyle: {
    color: Colors.black,
    fontFamily: MUSEO_SANS_300,
    fontSize: 12,
  },
  image: {
    height: 20,
    width: 20,
  },
  cartContainer: {
    // height: 40,
    width: 20,
    alignSelf: 'center',
  },
  tabBarBadgeStyle: {
    backgroundColor: Colors.slRed,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -4,
    right: -10,
  },
  tabBarBadgeText: {
    color: Colors.white,
    fontFamily: MUSEO_SANS_300,
    fontSize: 12,
  },
});

export default TabNavigation;
