import React, {useState} from 'react';
import {Keyboard, ScrollView, StyleSheet, Text, View} from 'react-native';
import ContainerHeader from '../components/ContainerHeader';
import {Colors} from '../styles/Colors';
import {FONTS} from '../utils/Constants';
import InputField from '../components/InputField';
import Button from '../components/Button';
import {StackNavigationProp} from '@react-navigation/stack';
import {MenuStackParamList} from '../navigation/types';
import {ROUTES} from '../navigation/Routes';
import I18n from '../config/I18n';
import {testProperties} from '../config/TestProperties';

type WebviewSelectionProps = {
  navigation: StackNavigationProp<MenuStackParamList, ROUTES.WEBVIEW_SELECTION>;
};

const WebviewSelection = ({navigation}: WebviewSelectionProps) => {
  const [url, setUrl] = useState('');
  const [isError, setIsError] = useState(false);
  const addHttps = (uri: string): string => {
    return !/^(f|ht)tps?:\/\//i.test(url) ? 'https://' + uri : uri;
  };
  const handleSubmit = () => {
    const httpsUrl = addHttps(url);
    const pattern =
      /^((https):\/\/www.)+[a-zA-Z0-9\-.]{2,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/i;
    if (pattern.test(httpsUrl)) {
      setUrl('');
      setIsError(false);
      Keyboard.dismiss();

      navigation.push(ROUTES.WEBVIEW, {uri: httpsUrl});
    } else {
      setIsError(true);
    }
  };

  return (
    <View
      style={styles.container}
      {...testProperties(I18n.t('webviewSelection.testId'))}>
      <ScrollView style={styles.scrollContainer}>
        <ContainerHeader
          title={I18n.t('webviewSelection.header')}
          containerStyle={styles.containerHeader}
        />
        <InputField
          errorMessage={I18n.t('webviewSelection.inputErrorMessage')}
          isError={isError}
          label={I18n.t('webviewSelection.inputLabel')}
          placeholder={I18n.t('webviewSelection.inputPlaceholder')}
          onChangeText={text => setUrl(text)}
          value={url}
        />
        <Text style={styles.subText}>{I18n.t('webviewSelection.text')}</Text>
        <View style={styles.horizontalDivider} />
        <Button
          onPress={handleSubmit}
          title={I18n.t('webviewSelection.submitButtonText')}
          testId={I18n.t('webviewSelection.submitButtonText')}
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
    paddingHorizontal: 20,
  },
  containerHeader: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 32,
  },
  subText: {
    color: Colors.dark,
    fontFamily: FONTS.DM_SANS_REGULAR,
    fontSize: 14,
    width: '90%',
  },
  horizontalDivider: {
    height: 32,
  },
});

export default WebviewSelection;
