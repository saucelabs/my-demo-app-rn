import React, {useContext} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {ROUTES} from '../navigation/Routes';
import {StackNavigationProp} from '@react-navigation/stack';
import {CartStackParamList} from '../navigation/types';
import {StoreContext} from '../store/Store';
import {Colors} from '../styles/Colors';
import CheckoutFooter from '../components/CheckoutFooter';
import ContainerHeader from '../components/ContainerHeader';
import ProductRow from '../components/ProductRow';
import {MUSEO_SANS_300, MUSEO_SANS_700} from '../utils/Constants';
import Footer from '../components/Footer';
import I18n from '../config/I18n';
import {testProperties} from '../config/TestProperties';

type CheckoutReviewOrderProps = {
  navigation: StackNavigationProp<CartStackParamList, ROUTES.CART>;
};

const CheckoutReviewOrderPage = ({navigation}: CheckoutReviewOrderProps) => {
  const {
    state: {cartContent, shippingAddress, cardDetails},
  } = useContext(StoreContext);
  const deliveryCosts = 5.99;
  const totalCosts = cartContent.totalPrice + deliveryCosts;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        {...testProperties(I18n.t('checkoutReviewOrder.testId'))}>
        <ContainerHeader
          title={I18n.t('checkoutReviewOrder.header')}
          containerStyle={styles.containerHeader}
        />
        <Text style={styles.subTitle}>
          {I18n.t('checkoutReviewOrder.subTitle')}
        </Text>
        {cartContent.totalAmount > 0 ? (
          cartContent.items.map((cartItem, index) => {
            return <ProductRow key={index} product={cartItem} />;
          })
        ) : (
          <View>
            <Text>{I18n.t('checkoutReviewOrder.noElements')}</Text>
          </View>
        )}
        <View style={styles.deliveryAddress}>
          <Text style={styles.textHeader}>
            {I18n.t('checkoutReviewOrder.deliveryAddressLabel')}
          </Text>
          <Text style={styles.text}>{shippingAddress.fullName}</Text>
          <Text style={styles.text}>
            {shippingAddress.addressLineOne}
            {shippingAddress.addressLineTwo
              ? `, ${shippingAddress.addressLineTwo}`
              : ''}
          </Text>
          <Text style={styles.text}>
            {shippingAddress.city}
            {shippingAddress.stateRegion
              ? `, ${shippingAddress.stateRegion}`
              : ''}
          </Text>
          <Text style={styles.text}>
            {shippingAddress.country}, {shippingAddress.zipCode}
          </Text>
        </View>
        <View style={styles.paymentInfo}>
          <Text style={styles.textHeader}>
            {I18n.t('checkoutReviewOrder.paymentMethodLabel')}
          </Text>
          <Text style={styles.text}>{cardDetails.cardFullName}</Text>
          <Text style={styles.text}>{cardDetails.cardNumber}</Text>
          <Text style={styles.text}>Exp: {cardDetails.cardExpirationDate}</Text>
          {cardDetails.isShippingAddress && (
            <Text style={styles.text}>
              {I18n.t('checkoutReviewOrder.billingIsShipping')}
            </Text>
          )}
          {!cardDetails.isShippingAddress && (
            <View style={styles.billingAddress}>
              <Text style={styles.textHeader}>
                {I18n.t('checkoutReviewOrder.billingAddressLabel')}
              </Text>
              <Text style={styles.text}>
                {cardDetails.billingAddressDetails.fullName}
              </Text>
              <Text style={styles.text}>
                {cardDetails.billingAddressDetails.addressLineOne}
                {cardDetails.billingAddressDetails.addressLineTwo
                  ? `, ${cardDetails.billingAddressDetails.addressLineTwo}`
                  : ''}
              </Text>
              <Text style={styles.text}>
                {cardDetails.billingAddressDetails.city}
                {cardDetails.billingAddressDetails.stateRegion
                  ? `, ${cardDetails.billingAddressDetails.stateRegion}`
                  : ''}
              </Text>
              <Text style={styles.text}>
                {cardDetails.billingAddressDetails.country},{' '}
                {cardDetails.billingAddressDetails.zipCode}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.deliveryInfo}>
          <View style={styles.row}>
            <Text style={styles.textHeader}>
              {I18n.t('checkoutReviewOrder.dhlLabel')}
            </Text>
            <Text style={[styles.textHeader, styles.deliveryCosts]}>
              ${deliveryCosts}
            </Text>
          </View>
          <Text style={styles.text}>
            {I18n.t('checkoutReviewOrder.arrival')}
          </Text>
        </View>
        <Footer />
      </ScrollView>
      <CheckoutFooter
        onPress={() => navigation.navigate(ROUTES.CHECKOUT_COMPLETE)}
        title={I18n.t('checkoutReviewOrder.submitButtonText')}
        totalNumber={cartContent.totalAmount}
        totalPrice={totalCosts}
      />
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
  },
  containerHeader: {
    paddingLeft: 0,
    paddingBottom: 5,
  },
  subTitle: {
    color: Colors.black,
    fontFamily: MUSEO_SANS_700,
    fontSize: 16,
    marginVertical: 16,
  },
  deliveryAddress: {
    marginTop: 24,
  },
  paymentInfo: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    marginTop: 24,
    paddingBottom: 24,
  },
  billingAddress: {
    marginTop: 24,
  },
  deliveryInfo: {
    marginTop: 24,
  },
  textHeader: {
    color: Colors.black,
    fontFamily: MUSEO_SANS_700,
    fontSize: 16,
    marginVertical: 8,
  },
  text: {
    color: Colors.black,
    fontFamily: MUSEO_SANS_300,
    fontSize: 14,
    marginVertical: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deliveryCosts: {
    fontSize: 18,
  },
});
export default CheckoutReviewOrderPage;
