import React from 'react';
import {Image, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {STATUS_BAR_HEIGHT} from './StatusBar';
import I18n from '../config/I18n';
import {testProperties} from '../config/TestProperties';

const NavigationBackButton = ({onPress}: {onPress: () => void}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.backButton}
      {...testProperties(I18n.t('navigationBackButton.testId'))}>
      <Image
        source={require('../assets/images/back-icon.png')}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    left: 20,
    justifyContent: 'center',
    height: 30,
    width: 40,
    zIndex: 10,
    ...Platform.select({
      android: {
        top: 10,
      },
      ios: {
        top: STATUS_BAR_HEIGHT + 10,
      },
    }),
  },
  smallHeaderBackButton: {
    top: 10,
  },
  image: {
    height: 16,
    width: 16,
  },
});

export default NavigationBackButton;
