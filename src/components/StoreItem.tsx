import React from 'react';
import {ItemInterface} from '../data/inventoryData';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {MUSEO_SANS_300, MUSEO_SANS_500} from '../utils/Constants';
import ReviewContainer from './ReviewContainer';
import I18n from '../config/I18n';
import {testProperties} from '../config/TestProperties';

const StoreItem = ({
  addReview,
  item: {id, imageUrl, name, price, review},
  numColumns,
  openProductDetails,
}: {
  addReview: () => void;
  item: ItemInterface;
  numColumns: number;
  openProductDetails: (id: number) => void;
}) => {
  const {width} = useWindowDimensions();

  return (
    <View
      style={styles.storeItemContainer}
      {...testProperties(I18n.t('storeItem.containerTestId'))}>
      <TouchableOpacity onPress={() => openProductDetails(id)}>
        <Image
          source={imageUrl}
          style={[
            styles.image,
            {
              // it's the horizontal margin times 2 including
              // the gutter space for the amount of columns
              height: (width - (20 * 2 + 10 * numColumns)) / numColumns,
            },
          ]}
        />
        <Text
          style={styles.label}
          {...testProperties(I18n.t('storeItem.textTestId'))}>
          {name}
        </Text>
      </TouchableOpacity>
      <View style={styles.priceReviewContainer}>
        <Text
          style={styles.price}
          {...testProperties(I18n.t('storeItem.priceTestId'))}>
          ${price}
        </Text>
        <ReviewContainer
          amountOfStars={5}
          review={review}
          onPress={addReview}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  storeItemContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
    flex: 1,
  },
  image: {
    aspectRatio: 1,
    borderRadius: 8,
    width: '100%',
  },
  label: {
    fontFamily: MUSEO_SANS_300,
    fontSize: 16,
    marginTop: 5,
  },
  priceReviewContainer: {
    flexDirection: 'column',
  },
  price: {
    fontFamily: MUSEO_SANS_500,
    fontSize: 20,
    marginVertical: 10,
  },
});

export default StoreItem;
