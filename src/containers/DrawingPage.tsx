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
.m-signature-pad--body::before {
	content: '';
	background-image: url("data:image/png;base64,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");
	background-repeat:no-repeat;
	background-position: center center;
	background-size: contain;
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	margin-left: 15px;
	margin-right: 15px;
  opacity: 0.2;
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
