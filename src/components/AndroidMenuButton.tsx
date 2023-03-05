import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {testProperties} from '../config/TestProperties';
import I18n from '../config/I18n';

const AndroidMenuButton = ({onPress}: {onPress: () => void}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      {...testProperties(I18n.t('drawer.openMenu.testId'))}>
      <Image
        source={require('../assets/images/menu-inactive-icon.png')}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
    width: 40,
    zIndex: 999,
  },
  image: {
    height: 25,
    width: 25,
  },
});

export default AndroidMenuButton;
