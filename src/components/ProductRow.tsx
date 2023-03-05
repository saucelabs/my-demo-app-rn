import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {Colors} from '../styles/Colors';
import Counter from './Counter';
import {FONTS} from '../utils/Constants';
import ReviewContainer from './ReviewContainer';
import ColorCircle from './ColorCircle';
import {CartItemInterface} from '../store/reducers/CartReducer';
import I18n from '../config/I18n';
import {testProperties} from '../config/TestProperties';

const ProductRow = ({
  product,
  addItem,
  deleteItem,
  removeItem,
}: {
  product: CartItemInterface;
  addItem?: (product: CartItemInterface) => void;
  deleteItem?: (product: CartItemInterface) => void;
  removeItem?: (product: CartItemInterface) => void;
}) => {
  const {width} = useWindowDimensions();
  const numColumns = 2;
  const heightWidth = (width - (20 * 2 + 10 * numColumns)) / numColumns;
  const containerSize = {height: heightWidth, width: heightWidth};

  return (
    <View
      style={styles.container}
      {...testProperties(I18n.t('productRow.testId'))}>
      <View style={[styles.row, styles.productDetails]}>
        <Image
          source={product.imageUrl}
          style={[styles.image, containerSize]}
        />
        <View style={[styles.descriptionContainer, containerSize]}>
          <Text
            style={styles.productHeader}
            {...testProperties(I18n.t('productRow.productLabelTestId'))}>
            {product.name}
          </Text>
          <Text
            style={styles.priceText}
            {...testProperties(I18n.t('productRow.productPriceTestId'))}>
            ${product.price}
          </Text>
          <View style={styles.reviewContainer}>
            <ReviewContainer
              amountOfStars={5}
              isDisabled
              review={product.review}
            />
          </View>
          <View style={styles.colorContainer}>
            <Text style={styles.colorLabel}>{I18n.t('productRow.color')}:</Text>
            <ColorCircle color={product.selectedColor} />
          </View>
        </View>
      </View>
      <View style={[styles.row, styles.countRemove]}>
        {addItem && removeItem && (
          <Counter
            number={product.amount}
            pressMinus={() => removeItem({...product, amount: 1})}
            pressPlus={() => addItem({...product, amount: 1})}
          />
        )}
        {deleteItem && (
          <TouchableOpacity
            onPress={() => deleteItem(product)}
            {...testProperties(I18n.t('productRow.removeItemTestId'))}>
            <Text style={styles.removeText}>
              {I18n.t('productRow.removeItem')}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderColor: Colors.lightGray,
    paddingVertical: 20,
  },
  row: {
    flexDirection: 'row',
  },
  productDetails: {
    justifyContent: 'space-between',
  },
  image: {
    aspectRatio: 1,
    borderRadius: 8,
  },
  descriptionContainer: {
    flexDirection: 'column',
  },
  productHeader: {
    color: Colors.darkGreen,
    fontFamily: FONTS.DM_SANS_MEDIUM,
    fontSize: 16,
    marginBottom: 10,
  },
  priceText: {
    color: Colors.dark,
    fontFamily: FONTS.DM_MONO_MEDIUM,
    fontSize: 18,
    marginBottom: 10,
  },
  reviewContainer: {
    marginBottom: 10,
  },
  colorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorLabel: {
    color: Colors.dark,
    fontFamily: FONTS.DM_SANS_REGULAR,
    fontSize: 14,
  },
  countRemove: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  removeText: {
    borderWidth: 1,
    borderColor: Colors.slRed,
    borderRadius: 8,
    padding: 10,
    color: Colors.slRed,
    fontFamily: FONTS.DM_MONO_MEDIUM,
    fontSize: 16,
  },
});

export default ProductRow;
