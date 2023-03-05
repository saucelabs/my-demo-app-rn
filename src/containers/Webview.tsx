import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {Colors} from '../styles/Colors';
import {FONTS} from '../utils/Constants';
import {RouteProp} from '@react-navigation/native';
import {MenuStackParamList} from '../navigation/types';
import {ROUTES} from '../navigation/Routes';
import I18n from '../config/I18n';
import {testProperties} from '../config/TestProperties';

type WebviewProps = {
  route: RouteProp<MenuStackParamList, ROUTES.WEBVIEW>;
};

function renderLoading() {
  return (
    <View style={styles.loaderContainer}>
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
  loadingText: {
    color: Colors.dark,
    fontFamily: FONTS.DM_SANS_REGULAR,
    marginTop: 25,
    fontSize: 20,
  },
});

export default Webview;
