import React, {useContext, useEffect} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {ROUTES} from '../navigation/Routes';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {CartStackParamList} from '../navigation/types';
import {StoreContext} from '../store/Store';
import {Colors} from '../styles/Colors';
import ContainerHeader from '../components/ContainerHeader';
import Footer from '../components/Footer';
import ProductRow from '../components/ProductRow';
import {
  addProductToCart,
  deleteProductFromCart,
  removeProductFromCart,
} from '../store/actions/CartActions';
import CheckoutFooter from '../components/CheckoutFooter';
import {CartItemInterface} from '../store/reducers/CartReducer';
import {MUSEO_SANS_300} from '../utils/Constants';
import Button from '../components/Button';
import {testProperties} from '../config/TestProperties';
import I18n from '../config/I18n';
import {parseDeepLinkProductData} from '../utils/DeepLinking';
import {addSwagItem, checkoutCart, removeSwagItem} from '../data/apiCalls';

type CartProps = {
  navigation: StackNavigationProp<CartStackParamList, ROUTES.CART>;
  route: RouteProp<CartStackParamList, ROUTES.CART>;
};

const CartPage = ({navigation, route}: CartProps) => {
  const {
    state: {
      products: {items},
      authentication: {isLoggedIn},
      cartContent,
    },
    dispatch,
  } = useContext(StoreContext);

  useEffect(() => {
    // @ts-ignore
    if (route.params && route.params?.products) {
      // The products will be a string like this `id=2\&amount=2\&color=black,id=\&amount=5\&color=`
      // it needs to have at least an id an the color needs to be valid
      const deepLinkItems = parseDeepLinkProductData(
        // @ts-ignore
        route.params?.products,
        items,
      );
      deepLinkItems.forEach(item => dispatch(addProductToCart(item)));
    }
  }, [dispatch, items, route]);

  const addItem = (cartItem: CartItemInterface) => {
    dispatch(addProductToCart(cartItem));
    addSwagItem(cartItem);
  };
  const deleteItem = (cartItem: CartItemInterface) => {
    dispatch(deleteProductFromCart(cartItem));
    removeSwagItem(cartItem);
  };
  const removeItem = (cartItem: CartItemInterface) => {
    dispatch(removeProductFromCart(cartItem));
    removeSwagItem(cartItem);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        {...testProperties(I18n.t('cart.testId'))}>
        {cartContent.totalAmount > 0 ? (
          <View>
            <ContainerHeader
              title={I18n.t('cart.filledCartHeader')}
              containerStyle={styles.containerHeader}
            />
            {cartContent.items.map((cartItem, index) => {
              return (
                <ProductRow
                  key={index}
                  product={cartItem}
                  addItem={addItem}
                  deleteItem={deleteItem}
                  removeItem={removeItem}
                />
              );
            })}
            <Footer />
          </View>
        ) : (
          <View style={styles.emptyCartContainer}>
            <ContainerHeader
              title={I18n.t('cart.emptyCartHeader')}
              containerStyle={styles.emptyCartHeader}
            />
            <Image
              source={require('../assets/images/empty-cart.png')}
              style={styles.emptyCartImage}
            />
            <Text style={styles.emptyCartText}>
              {I18n.t('cart.emptyCartText')}
            </Text>
            <Button
              containerStyle={styles.shoppingButton}
              onPress={() =>
                navigation.navigate(ROUTES.STORE_STACK_NAVIGATOR, {
                  screen: ROUTES.STORE,
                })
              }
              title={I18n.t('cart.emptyCartButtonText')}
              testId={I18n.t('cart.emptyCartButtonText')}
            />
          </View>
        )}
      </ScrollView>
      {cartContent.totalAmount > 0 && (
        <CheckoutFooter
          onPress={() => {
            checkoutCart(cartContent);
            isLoggedIn
              ? navigation.navigate(ROUTES.CHECKOUT_ADDRESS)
              : navigation.navigate(ROUTES.LOGIN);
          }}
          title={I18n.t('cart.filledCartButtonText')}
          totalNumber={cartContent.totalAmount}
          totalPrice={cartContent.totalPrice}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
  },
  containerHeader: {
    paddingLeft: 0,
    paddingBottom: 5,
  },
  emptyCartContainer: {
    alignItems: 'center',
    flex: 1,
  },
  emptyCartHeader: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 32,
    paddingTop: 70,
  },
  emptyCartImage: {
    height: 104,
    marginBottom: 32,
    width: 104,
  },
  emptyCartText: {
    fontFamily: MUSEO_SANS_300,
    fontSize: 14,
    textAlign: 'center',
  },
  shoppingButton: {
    marginTop: 32,
    paddingHorizontal: 50,
  },
});

export default CartPage;
