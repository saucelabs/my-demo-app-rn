import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from './DrawerNavigation';
import TabNavigation from './TabNavigation';
import {RootDrawerParamList} from './types';
import {ROUTES} from './Routes';
import {Platform, StyleSheet} from 'react-native';
import {IS_IOS} from '../utils/Constants';
import StoreStackNavigation from './StoreStackNavigation';
import MenuStackNavigation from './MenuStackNavigation';
import CartStackNavigation from './CartStackNavigation';

const RootRouter = () => {
  const RootDrawerNavigator = createDrawerNavigator<RootDrawerParamList>();

  return (
    <RootDrawerNavigator.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      drawerStyle={styles.drawerWidth}>
      <RootDrawerNavigator.Screen
        name={IS_IOS ? ROUTES.TAB_NAVIGATOR : ROUTES.STORE_STACK_NAVIGATOR}
        component={IS_IOS ? TabNavigation : StoreStackNavigation}
      />
      {!IS_IOS && (
        <>
          <RootDrawerNavigator.Screen
            name={ROUTES.CART_STACK_NAVIGATOR}
            component={CartStackNavigation}
          />
          <RootDrawerNavigator.Screen
            name={ROUTES.MENU_STACK_NAVIGATOR}
            component={MenuStackNavigation}
          />
        </>
      )}
    </RootDrawerNavigator.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerWidth: {
    ...Platform.select({
      android: {
        width: '70%',
      },
      ios: {
        width: '100%',
      },
    }),
  },
});

export default RootRouter;
