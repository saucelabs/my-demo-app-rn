import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors} from '../styles/Colors';
import {FONTS} from '../utils/Constants';
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
        source={require('../assets/images/cart.png')}
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
    backgroundColor: Colors.green,
    color: Colors.white,
    fontFamily: FONTS.DM_MONO_REGULAR,
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
