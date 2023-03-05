import React, {useRef} from 'react';
import {Alert, PermissionsAndroid, StyleSheet, View} from 'react-native';
import SignatureScreen, {SignatureViewRef} from 'react-native-signature-canvas';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import CameraRoll from '@react-native-community/cameraroll';
import ContainerHeader from '../components/ContainerHeader';
import {Colors} from '../styles/Colors';
import Button from '../components/Button';
import {IS_IOS} from '../utils/Constants';
import I18n from '../config/I18n';
import {testProperties} from '../config/TestProperties';

const DrawingPage = () => {
  const signatureRef = useRef<SignatureViewRef>(null);
  const webStyle = `
html,body {
	background: ${Colors.white};
	height: 100%;
}
.m-signature-pad {
	box-shadow: none;
	border: none;
}
.m-signature-pad--body {
	background: ${Colors.neutral};
	border-radius: 5px;
}
.m-signature-pad--footer .button,
.m-signature-pad--footer .description{
	display: none;
}
`;
  const clear = () => signatureRef.current?.clearSignature();
  const save = () => signatureRef.current?.readSignature();
  const notification = (title: string, message: string) => {
    Alert.alert(title, message, [{text: 'OK'}]);
  };
  const getPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: I18n.t('drawing.downloadPermissionsTitle'),
          message: I18n.t('drawing.downloadPermissionsRequiredMessage'),
          buttonNegative: I18n.t('drawing.cancel'),
          buttonPositive: I18n.t('drawing.ok'),
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }

      notification(
        I18n.t('drawing.saveDrawing'),
        I18n.t('drawing.downloadPermissionsRequiredMessage'),
      );
    } catch (err) {
      notification(
        I18n.t('drawing.saveDrawing'),
        `${I18n.t('drawing.failedSave')}: ${err.message}`,
      );
    }
  };
  const handleDrawing = async (base64String: string) => {
    if (!IS_IOS) {
      try {
        const granted = await getPermissionAndroid();
        if (!granted) {
          return;
        }
      } catch (error) {
        notification(
          I18n.t('drawing.androidPermissions'),
          `${I18n.t('drawing.androidPermissionsFailed')}: ${error.message}`,
        );

        return;
      }
    }
    const image = base64String.replace('data:image/png;base64,', '');
    const dirs = IS_IOS
      ? RNFS.LibraryDirectoryPath
      : RNFS.ExternalDirectoryPath;
    const downloadDest = `${dirs}/${Math.random() * 10000000 || 0}.png`;

    try {
      await RNFetchBlob.fs.writeFile(downloadDest, image, 'base64');
      const imageSaved = await CameraRoll.save(downloadDest, {type: 'photo'});
      if (imageSaved) {
        notification(
          I18n.t('drawing.saveDrawing'),
          I18n.t('drawing.savedGallery'),
        );
      }
    } catch (error) {
      notification(
        I18n.t('drawing.saveDrawing'),
        `${I18n.t('drawing.failedSave')}: ${error.message}`,
      );
    }
  };

  return (
    <View
      style={styles.container}
      {...testProperties(I18n.t('drawing.testId'))}>
      <View style={styles.content}>
        <ContainerHeader
          title={I18n.t('drawing.header')}
          containerStyle={styles.containerHeader}
        />
        <SignatureScreen
          ref={signatureRef}
          onOK={img => handleDrawing(img)}
          penColor={Colors.green}
          // String, webview style for overwrite default style, all style:
          // https://github.com/YanYuanFE/react-native-signature-canvas/blob/master/h5/css/signature-pad.css
          webStyle={webStyle}
        />
        <View style={styles.buttonContainer}>
          <Button
            onPress={clear}
            title={I18n.t('drawing.clear')}
            testId={I18n.t('drawing.clear')}
          />
          <View style={styles.horizontalDivider} />
          <Button
            onPress={save}
            title={I18n.t('drawing.save')}
            testId={I18n.t('drawing.save')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  containerHeader: {
    paddingLeft: 0,
    paddingRight: 20,
    paddingBottom: 32,
    paddingTop: 0,
    flex: 0,
  },
  content: {
    padding: 20,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 24,
  },
  horizontalDivider: {
    width: 32,
  },
});

export default DrawingPage;
