import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors} from '../styles/Colors';
import {MUSEO_SANS_300} from '../utils/Constants';
import {testProperties} from '../config/TestProperties';
import I18n from '../config/I18n';

const AndroidCartButton = ({
  amount,
  onPress,
}: {
  amount: number;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      {...testProperties(I18n.t('cartBadge.testId'), true)}>
      {amount > 0 && <Text style={styles.badgeText}>{amount}</Text>}
      <Image
        source={require('../assets/images/android-cart-icon.png')}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 40,
    width: 30,
  },
  image: {
    height: 24,
    width: 24,
  },
  badgeText: {
    borderWidth: 1,
    borderColor: Colors.white,
    backgroundColor: Colors.gray,
    color: Colors.white,
    fontFamily: MUSEO_SANS_300,
    fontSize: 10,
    position: 'absolute',
    top: 2,
    right: -7,
    borderRadius: 20,
    zIndex: 2,
    height: 18,
    width: 18,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

export default AndroidCartButton;
