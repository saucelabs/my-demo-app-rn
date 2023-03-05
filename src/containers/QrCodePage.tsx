import React from 'react';
import {Alert, Linking, ScrollView, StyleSheet, Text, View} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {Colors} from '../styles/Colors';
import ContainerHeader from '../components/ContainerHeader';
import {FONTS} from '../utils/Constants';
import {BarCodeReadEvent} from 'react-native-camera';
import I18n from '../config/I18n';
import {testProperties} from '../config/TestProperties';

const QrCodePage = () => {
  const onSuccess = (e: BarCodeReadEvent) => {
    try {
      const url = e.data;
      const validHttp = url.match(/^(https?):\/\//);
      const validWww = url.match(/^(www.)/);

      if (validHttp || validWww) {
        const newUrl = `${validWww ? 'https://' : ''}${url}`;
        Linking.openURL(newUrl).catch(err =>
          Alert.alert(I18n.t('qrCode.errorOccurred'), err),
        );
      } else {
        Alert.alert(I18n.t('qrCode.notValidUrl', {url}));
      }
    } catch (err) {
      // @ts-ignore
      Alert.alert(I18n.t('qrCode.errorOccurred'), err.message);
    }
  };

  return (
    <View style={styles.container} {...testProperties(I18n.t('qrCode.testId'))}>
      <ScrollView style={styles.scrollContainer}>
        <ContainerHeader
          title={I18n.t('qrCode.header')}
          containerStyle={styles.containerHeader}
        />
        <Text style={styles.subText}>{I18n.t('qrCode.lineOne')}</Text>
        <Text style={styles.subText}>{I18n.t('qrCode.lineTwo')}</Text>
        <View style={styles.horizontalDivider} />
        <QRCodeScanner
          onRead={onSuccess}
          showMarker
          reactivate
          markerStyle={styles.slMarker}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    backgroundColor: Colors.white,
  },
  containerHeader: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 32,
  },
  subText: {
    color: Colors.dark,
    fontFamily: FONTS.DM_SANS_REGULAR,
    fontSize: 14,
    paddingLeft: 20,
    paddingRight: 20,
    width: '90%',
  },
  horizontalDivider: {
    height: 32,
  },
  slMarker: {
    borderColor: Colors.green,
  },
});

export default QrCodePage;
