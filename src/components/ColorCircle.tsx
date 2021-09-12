import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Colors} from '../styles/Colors';
import {ITEM_COLOR_TYPE} from '../data/inventoryData';
import {testProperties} from '../config/TestProperties';
import I18n from '../config/I18n';

const ColorCircle = ({
  color,
  onPress,
  selectedColor,
}: {
  color: ITEM_COLOR_TYPE;
  onPress?: (arg: ITEM_COLOR_TYPE) => void;
  selectedColor?: string;
}) => {
  const activeColor =
    color === selectedColor && selectedColor
      ? // @ts-ignore
        styles[`${color.toLowerCase()}BorderColor`]
      : {};
  // @ts-ignore
  const innerCircleColor = styles[`${color.toLowerCase()}BackgroundColor`];

  return (
    <TouchableOpacity
      key={color}
      {...(onPress ? {onPress: () => onPress(color)} : {})}
      {...(!onPress ? {disabled: true} : {})}
      style={[styles.outerCircle, activeColor]}
      {...testProperties(`${color} ${I18n.t('colorCircle.testId')}`)}>
      <View style={[styles.innerCircle, innerCircleColor]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  blackBackgroundColor: {
    backgroundColor: Colors.black,
  },
  blackBorderColor: {
    borderColor: Colors.black,
  },
  blueBackgroundColor: {
    backgroundColor: Colors.primaryBlue,
  },
  blueBorderColor: {
    borderColor: Colors.primaryBlue,
  },
  grayBackgroundColor: {
    backgroundColor: Colors.gray,
  },
  grayBorderColor: {
    borderColor: Colors.gray,
  },
  redBackgroundColor: {
    backgroundColor: Colors.slRed,
  },
  redBorderColor: {
    borderColor: Colors.slRed,
  },
  outerCircle: {
    borderColor: Colors.white,
    borderWidth: 2,
    borderRadius: 17,
    height: 34,
    width: 34,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    borderRadius: 12,
    height: 24,
    width: 24,
  },
});

export default ColorCircle;
