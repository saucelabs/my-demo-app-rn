import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TransitionScreenOptions} from '../config/Config';
import CartPage from '../containers/CartPage';
import CheckoutAddressPage from '../containers/CheckoutAddressPage';
import CheckoutPaymentPage from '../containers/CheckoutPaymentPage';
import CheckoutReviewOrderPage from '../containers/CheckoutReviewOrderPage';
import CheckoutCompletePage from '../containers/CheckoutCompletePage';
import AppHeader from '../components/AppHeader';
import {CartStackParamList} from './types';
import {ROUTES} from './Routes';
import LoginPage from '../containers/LoginPage';
import {StoreContext} from '../store/Store';

// @TODO: How to push screens into the history
const CartStackNavigation = () => {
  const {
    state: {
      authentication: {isLoggedIn},
    },
  } = useContext(StoreContext);
  const Cart = createStackNavigator<CartStackParamList>();

  return (
    <Cart.Navigator
      initialRouteName={ROUTES.CART}
      screenOptions={({navigation}) => ({
        ...TransitionScreenOptions,
        header: () => <AppHeader navigation={navigation} />,
      })}>
      <Cart.Screen name={ROUTES.CART} component={CartPage} />
      {!isLoggedIn && <Cart.Screen name={ROUTES.LOGIN} component={LoginPage} />}
      <Cart.Screen
        name={ROUTES.CHECKOUT_ADDRESS}
        component={CheckoutAddressPage}
      />
      <Cart.Screen
        name={ROUTES.CHECKOUT_PAYMENT}
        component={CheckoutPaymentPage}
      />
      <Cart.Screen
        name={ROUTES.CHECKOUT_REVIEW_ORDER}
        component={CheckoutReviewOrderPage}
      />
      <Cart.Screen
        name={ROUTES.CHECKOUT_COMPLETE}
        component={CheckoutCompletePage}
        options={({navigation}) => ({
          ...TransitionScreenOptions,
          header: () => (
            <AppHeader showBackButton={false} navigation={navigation} />
          ),
        })}
      />
    </Cart.Navigator>
  );
};

export default CartStackNavigation;
