import React from 'react';
import {Alert, Animated, StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {Colors} from '../styles/Colors';
import {MUSEO_SANS_300} from '../utils/Constants';
import {RouteProp} from '@react-navigation/native';
import {MenuStackParamList} from '../navigation/types';
import {ROUTES} from '../navigation/Routes';
import I18n from '../config/I18n';
import {testProperties} from '../config/TestProperties';

type WebviewProps = {
  route: RouteProp<MenuStackParamList, ROUTES.WEBVIEW>;
};

function renderLoading() {
  const rotation = new Animated.Value(0);
  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  Animated.loop(
    Animated.timing(rotation, {
      toValue: 10,
      duration: 5000,
      useNativeDriver: true,
    }),
  ).start();

  return (
    <View style={styles.loaderContainer}>
      <Animated.Image
        source={require('../assets/images/saucelabs-spinner.png')}
        style={[styles.spinner, {transform: [{rotate: spin}]}]}
      />
      <Text style={styles.loadingText}>Loading ...</Text>
    </View>
  );
}

const Webview = ({route}: WebviewProps) => {
  const {params = {uri: ''}} = route;
  const {uri} = params;

  return (
    <View
      style={styles.container}
      {...testProperties(I18n.t('webview.testId'))}>
      <WebView
        onError={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
          Alert.alert(I18n.t('webview.error', {uri}));
          console.log(nativeEvent);
        }}
        renderLoading={renderLoading}
        source={{uri}}
        startInLoadingState
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
  },

  loaderContainer: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject,
  },
  spinner: {
    width: 125,
    height: 125,
  },
  loadingText: {
    color: Colors.slRed,
    fontFamily: MUSEO_SANS_300,
    fontStyle: 'italic',
    marginTop: 25,
    fontSize: 20,
  },
});

export default Webview;
