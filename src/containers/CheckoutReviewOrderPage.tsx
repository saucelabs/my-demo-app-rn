import React, {useContext, useEffect} from 'react';
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
import {parseDeepLinkProductData} from '../utils/DeepLinking';
import {addProductToCart} from '../store/actions/CartActions';
import {RouteProp} from '@react-navigation/native';
import {updateShippingAddress} from '../store/actions/ShippingAddressActions';
import {updateCardDetails} from '../store/actions/CardDetailsActions';

type CheckoutReviewOrderProps = {
  navigation: StackNavigationProp<CartStackParamList, ROUTES.CHECKOUT_COMPLETE>;
  route: RouteProp<CartStackParamList, ROUTES.CHECKOUT_REVIEW_ORDER>;
};

const CheckoutReviewOrderPage = ({
  navigation,
  route,
}: CheckoutReviewOrderProps) => {
  const {
    state: {
      products: {items},
      cartContent,
      shippingAddress,
      cardDetails,
    },
    dispatch,
  } = useContext(StoreContext);
  const deliveryCosts = 5.99;
  const totalCosts = cartContent.totalPrice + deliveryCosts;

  useEffect(() => {
    // @ts-ignore
    if (route.params && route.params.products) {
      // The products will be a string like this `id=2\&amount=2\&color=black,id=\&amount=5\&color=`
      // it needs to have at least an id an the color needs to be valid
      // @ts-ignore
      const {products, payment = 'default'} = route.params;
      const deepLinkProducts = parseDeepLinkProductData(products, items);
      deepLinkProducts.forEach(item => dispatch(addProductToCart(item)));
      const addressDetails = {
        fullName: 'Rebecca Winter',
        addressLineOne: 'Mandorley 112',
        addressLineTwo: 'Entrance 1',
        city: 'Truro',
        stateRegion: 'Cornwall',
        zipCode: '89750',
        country: 'United Kingdom',
      };
      const defaultPaymentDetails = {
        cardFullName: 'Rebecca Winter',
        cardNumber: '5555555555554444',
        cardExpirationDate: '0325',
        cardSecurityCode: '123',
        isShippingAddress: !(payment === 'different'),
      };
      const paymentDetails = {
        ...defaultPaymentDetails,
        billingAddressDetails: {
          fullName: 'Sauce Bot',
          addressLineOne: 'Sauce Street 5',
          addressLineTwo: 'Building 2',
          city: 'Sauce Lake City',
          stateRegion: 'Sauce Dakota',
          zipCode: '499382',
          country: 'South Sauceland',
        },
      };
      dispatch(updateShippingAddress(addressDetails));
      dispatch(updateCardDetails(paymentDetails));
    }
  }, [dispatch, items, route]);

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
        <View
          style={styles.deliveryAddress}
          {...testProperties(
            I18n.t('checkoutReviewOrder.deliveryAddressTestId'),
          )}>
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
        <View
          style={styles.paymentInfo}
          {...testProperties(I18n.t('checkoutReviewOrder.paymentInfoTestId'))}>
          <Text style={styles.textHeader}>
            {I18n.t('checkoutReviewOrder.paymentMethodLabel')}
          </Text>
          <Text style={styles.text}>{cardDetails.cardFullName}</Text>
          <Text style={styles.text}>{cardDetails.cardNumber}</Text>
          <Text style={styles.text}>Exp: {cardDetails.cardExpirationDate}</Text>
        </View>
        <View
          style={styles.billingAddress}
          {...testProperties(
            I18n.t('checkoutReviewOrder.billingAddressTestId'),
          )}>
          {cardDetails.isShippingAddress ? (
            <Text style={styles.text}>
              {I18n.t('checkoutReviewOrder.billingIsShipping')}
            </Text>
          ) : (
            <>
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
            </>
          )}
        </View>
        <View
          style={styles.deliveryInfo}
          {...testProperties(
            I18n.t('checkoutReviewOrder.deliveryDetailsTestId'),
          )}>
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
