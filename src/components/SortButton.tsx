import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {SORT_IMAGES, SORT_OPTIONS, SortOptionType} from '../utils/Sorting';
import I18n from '../config/I18n';
import {testProperties} from '../config/TestProperties';

const SortButton = ({
  onPress,
  sortOption,
}: {
  onPress: () => void;
  sortOption: SortOptionType;
}) => {
  let imageSource;

  switch (sortOption) {
    case SORT_OPTIONS.NAME_ASC:
      imageSource = SORT_IMAGES[SORT_OPTIONS.NAME_ASC];
      break;
    case SORT_OPTIONS.NAME_DESC:
      imageSource = SORT_IMAGES[SORT_OPTIONS.NAME_DESC];
      break;
    case SORT_OPTIONS.PRICE_ASC:
      imageSource = SORT_IMAGES[SORT_OPTIONS.PRICE_ASC];
      break;
    case SORT_OPTIONS.PRICE_DESC:
      imageSource = SORT_IMAGES[SORT_OPTIONS.PRICE_DESC];
      break;
    default:
      imageSource = SORT_IMAGES[SORT_OPTIONS.NAME_ASC];
      break;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      {...testProperties(I18n.t('sortButton.testId'))}>
      <Image source={imageSource} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 20,
    width: 20,
  },
});

export default SortButton;
