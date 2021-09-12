import React, {useContext} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {ROUTES} from '../navigation/Routes';
import {StackNavigationProp} from '@react-navigation/stack';
import {CartStackParamList} from '../navigation/types';
import {Colors} from '../styles/Colors';
import {MUSEO_SANS_300, MUSEO_SANS_700} from '../utils/Constants';
import Button from '../components/Button';
import {StoreContext} from '../store/Store';
import {resetCart} from '../store/actions/CartActions';
import {resetCardDetails} from '../store/actions/CardDetailsActions';
import {resetShippingAddress} from '../store/actions/ShippingAddressActions';
import I18n from '../config/I18n';
import {testProperties} from '../config/TestProperties';

type CheckoutCompleteProps = {
  navigation: StackNavigationProp<CartStackParamList, ROUTES.CHECKOUT_COMPLETE>;
};

const CheckoutCompletePage = ({navigation}: CheckoutCompleteProps) => {
  const {dispatch} = useContext(StoreContext);

  const continueShopping = () => {
    dispatch(resetCart());
    dispatch(resetCardDetails());
    dispatch(resetShippingAddress());
    navigation.dispatch(StackActions.popToTop());
    // @ts-ignore
    navigation.navigate(ROUTES.STORE_STACK_NAVIGATOR, {
      screen: ROUTES.STORE,
    });
  };

  return (
    <View
      style={styles.container}
      {...testProperties(I18n.t('checkoutComplete.testId'))}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>{I18n.t('checkoutComplete.header')}</Text>
        <Text style={styles.text}>
          {I18n.t('checkoutComplete.order.lineOne')}
        </Text>
        <Text style={styles.swagText}>
          {I18n.t('checkoutComplete.order.lineTwo')}
        </Text>
        <Text style={styles.text}>
          {' '}
          {I18n.t('checkoutComplete.order.lineThree')}
        </Text>
        <Image
          source={require('../assets/images/pony-express.png')}
          style={styles.image}
        />
        <Button
          onPress={continueShopping}
          paddingHorizontal={32}
          title={I18n.t('checkoutComplete.submitButtonText')}
          testId={I18n.t('checkoutComplete.submitButtonText')}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  scrollContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: MUSEO_SANS_700,
    marginTop: 70,
    marginBottom: 32,
  },
  text: {
    color: Colors.black,
    fontSize: 14,
    fontFamily: MUSEO_SANS_300,
    marginBottom: 16,
    textAlign: 'center',
  },
  swagText: {
    color: Colors.slRed,
    fontFamily: MUSEO_SANS_700,
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  image: {
    height: 140,
    width: 192,
    marginBottom: 32,
    marginTop: 16,
  },
});

export default CheckoutCompletePage;
