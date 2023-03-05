import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FONTS} from '../utils/Constants';
import {testProperties} from '../config/TestProperties';
import I18n from '../config/I18n';
import {Colors} from '../styles/Colors';

const Counter = ({
  isDisabled = false,
  number,
  pressMinus,
  pressPlus,
}: {
  isDisabled?: boolean;
  number: number;
  pressMinus: () => void;
  pressPlus: () => void;
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={pressMinus}
        style={styles.itemContainer}
        disabled={isDisabled}
        {...testProperties(I18n.t('counter.minusTestId'))}>
        <Image
          source={require('../assets/images/minusButton.png')}
          style={[styles.itemContainer, styles.image]}
        />
      </TouchableOpacity>
      <View
        style={styles.itemContainer}
        {...testProperties(I18n.t('counter.counterAmountTestId'))}>
        <Text style={styles.numberText}>{isDisabled ? 0 : number}</Text>
      </View>
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={pressPlus}
        disabled={isDisabled}
        {...testProperties(I18n.t('counter.plusTestId'))}>
        <Image
          source={require('../assets/images/plusButton.png')}
          style={[styles.itemContainer, styles.image]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    width: 120,
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
  },
  numberText: {
    color: Colors.dark,
    fontFamily: FONTS.DM_SANS_REGULAR,
    fontSize: 18,
  },
  image: {
    aspectRatio: 1,
    height: 40,
    width: 40,
  },
});

export default Counter;
