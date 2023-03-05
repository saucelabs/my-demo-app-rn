import React, {useContext, useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {ROUTES} from '../navigation/Routes';
import {StoreFlowStackParamList} from '../navigation/types';
import {RouteProp} from '@react-navigation/native';
import {StoreContext} from '../store/Store';
import {Colors} from '../styles/Colors';
import {FONTS, WINDOW_WIDTH} from '../utils/Constants';
import ContainerHeader from '../components/ContainerHeader';
import ReviewModal from '../components/ReviewModal';
import ReviewContainer from '../components/ReviewContainer';
import Counter from '../components/Counter';
import Button from '../components/Button';
import {addProductToCart} from '../store/actions/CartActions';
import ColorCircle from '../components/ColorCircle';
import {ITEM_COLOR_TYPE, ITEM_COLORS} from '../data/inventoryData';
import I18n from '../config/I18n';
import {testProperties} from '../config/TestProperties';
import {StackNavigationProp} from '@react-navigation/stack';
import {addSwagItem, getSwagItem} from '../data/apiCalls';

type ProductProps = {
  navigation: StackNavigationProp<StoreFlowStackParamList, ROUTES.STORE>;
  route: RouteProp<StoreFlowStackParamList, ROUTES.PRODUCT>;
};

const ProductPage = ({navigation, route}: ProductProps) => {
  const {params = {id: 0}} = route;
  const {id} = params;
  const {
    state: {
      products: {items},
    },
    dispatch,
  } = useContext(StoreContext);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [counterAmount, setCounterAmount] = useState(1);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const closeReviewModal = () => setReviewModalVisible(!reviewModalVisible);
  let foundItem = items.filter(product => product.id === +id)[0];
  const {
    colors = [ITEM_COLORS.GRAY],
    defaultColor = ITEM_COLORS.GRAY,
    desc = '',
    id: productId = 0,
    imageUrl = 0,
    name = '',
    price = 0,
    review = 0,
  } = foundItem || {};
  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const pressMinus = () => {
    if (counterAmount === 1) {
      setButtonDisabled(true);
    }
    if (counterAmount > 0) {
      setCounterAmount(counterAmount - 1);
    }
  };
  const pressPlus = () => {
    if (counterAmount === 0) {
      setButtonDisabled(false);
    }
    setCounterAmount(counterAmount + 1);
  };
  const addToCart = () => {
    if (id) {
      const selectedProduct = items.filter(product => product.id === id)[0];
      dispatch(
        addProductToCart({
          ...selectedProduct,
          amount: counterAmount,
          selectedColor,
        }),
      );
      addSwagItem({
        ...selectedProduct,
        amount: counterAmount,
        selectedColor,
      });
    }
  };
  const changeColor = (color: ITEM_COLOR_TYPE) => setSelectedColor(color);

  useEffect(() => {
    async function fetchData() {
      return getSwagItem(id);
    }
    fetchData();
  });

  return (
    <ScrollView
      style={styles.container}
      {...testProperties(I18n.t('productPage.testId'))}>
      {foundItem ? (
        <>
          <ReviewModal
            onPress={closeReviewModal}
            visible={reviewModalVisible}
          />
          <ContainerHeader title={name} />
          <Image source={imageUrl} style={styles.image} />
          <View style={styles.content}>
            <View style={styles.priceReviewContainer}>
              <Text
                style={styles.price}
                {...testProperties(I18n.t('productPage.priceTestId'))}>
                ${price}
              </Text>
              <ReviewContainer
                review={review}
                onPress={() => setReviewModalVisible(true)}
                amountOfStars={5}
              />
            </View>
            <View style={styles.colorsContainer}>
              {colors.map(color => (
                <ColorCircle
                  color={color}
                  key={color}
                  {...(productId !== 0 ? {onPress: changeColor} : {})}
                  selectedColor={selectedColor}
                />
              ))}
            </View>
            <View style={styles.addToCartContainer}>
              <Counter
                isDisabled={productId === 0}
                number={counterAmount}
                pressMinus={pressMinus}
                pressPlus={pressPlus}
              />
              <View style={styles.verticalDivider} />
              <Button
                isDisabled={buttonDisabled || productId === 0}
                title={I18n.t('productPage.addToCart')}
                testId={I18n.t('productPage.addToCart')}
                onPress={addToCart}
              />
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionHeader}>
                {I18n.t('productPage.highlights')}
              </Text>
              <Text
                style={styles.descriptionText}
                {...testProperties(I18n.t('productPage.descriptionTestId'))}>
                {desc}
              </Text>
            </View>
          </View>
        </>
      ) : (
        <View style={[styles.content, styles.center]}>
          <Text style={styles.noProductHeader}>
            {I18n.t('productPage.unknownProductDescription')}
          </Text>
          <Image
            source={require('../assets/images/oops-no-product.png')}
            style={styles.noProductImage}
          />
          <Button
            containerStyle={styles.button}
            onPress={() => navigation.navigate(ROUTES.STORE)}
            title={I18n.t('productPage.buttonText')}
            testId={I18n.t('productPage.buttonText')}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  image: {
    aspectRatio: 1,
    borderRadius: 8,
    height: WINDOW_WIDTH,
    width: '100%',
  },
  content: {
    padding: 20,
  },
  center: {alignItems: 'center'},
  priceReviewContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  colorsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  verticalDivider: {
    width: 0,
    marginRight: 20,
  },
  price: {
    color: Colors.dark,
    fontFamily: FONTS.DM_MONO_MEDIUM,
    fontSize: 24,
  },
  addToCartContainer: {
    alignItems: 'stretch',
    flexDirection: 'row',
    marginBottom: 20,
  },
  descriptionContainer: {
    marginTop: 20,
  },
  descriptionHeader: {
    fontFamily: FONTS.DM_MONO_MEDIUM,
    fontSize: 16,
  },
  descriptionText: {
    fontFamily: FONTS.DM_SANS_REGULAR,
    fontSize: 14,
  },
  noProductHeader: {
    fontFamily: FONTS.DM_SANS_BOLD,
    fontSize: 24,
    marginBottom: 32,
    marginTop: 70,
    textAlign: 'center',
  },
  noProductImage: {
    alignSelf: 'center',
    height: 104,
    width: 104,
  },
  button: {
    marginTop: 32,
    paddingHorizontal: 50,
  },
});

export default ProductPage;
