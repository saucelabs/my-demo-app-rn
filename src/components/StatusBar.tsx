import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {IS_IOS, HAS_IOS_NOTCH} from '../utils/Constants';
import {Colors} from '../styles/Colors';

// This determines the height of the status bar if we are having an iPhone X(S|R) Max with a notch
export const STATUS_BAR_HEIGHT = IS_IOS
  ? HAS_IOS_NOTCH
    ? 44
    : 20
  : StatusBar.currentHeight || 0;

const SwagLabsStatusBar = () => {
  if (IS_IOS) {
    return (
      <View style={styles.statusBar}>
        <StatusBar barStyle="dark-content" translucent={false} />
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: Colors.white,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
    width: '100%',
    height: STATUS_BAR_HEIGHT,
  },
});

export default SwagLabsStatusBar;
