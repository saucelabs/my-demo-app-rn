import React, {useContext, useEffect} from 'react';
import {Alert, ScrollView, StyleSheet, Switch, Text, View} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import ContainerHeader from '../components/ContainerHeader';
import I18n from '../config/I18n';
import {Colors} from '../styles/Colors';
import {IS_IOS, MUSEO_SANS_500} from '../utils/Constants';
import {testProperties} from '../config/TestProperties';
import {StackNavigationProp} from '@react-navigation/stack';
import {MenuStackParamList} from '../navigation/types';
import {ROUTES} from '../navigation/Routes';
import {StoreContext} from '../store/Store';
import {
  enableBiometrics,
  updateBiometricSettings,
} from '../store/actions/AuthenticationActions';

type BiometricsProps = {
  navigation: StackNavigationProp<MenuStackParamList, ROUTES.BIOMETRICS>;
};

export type BiometryType =
  | 'BIOMETRICS'
  | 'FINGERPRINT'
  | 'FACIAL_RECOGNITION'
  | 'IRIS';

const getBiometricsLabel = (biometricsType: BiometryType) => {
  const i18nLabel =
    biometricsType === 'FINGERPRINT' && IS_IOS
      ? 'biometrics.iOSTouchIdHeader'
      : biometricsType === 'FINGERPRINT' && !IS_IOS
      ? 'biometrics.androidHeader'
      : biometricsType === 'FACIAL_RECOGNITION'
      ? 'biometrics.iOSFaceIdHeader'
      : 'biometrics.defaultHeader';

  return I18n.t(i18nLabel);
};
const BIOMETRICS_TYPE: {[key: string]: BiometryType} = {
  FINGERPRINT: 'FINGERPRINT',
  FACIAL_RECOGNITION: 'FACIAL_RECOGNITION',
  IRIS: 'IRIS',
  BIOMETRICS: 'BIOMETRICS',
};
const BiometricsScreen = ({navigation}: BiometricsProps) => {
  const {
    state: {
      authentication: {
        biometricsType,
        isBiometricsAvailable,
        isBiometricsEnabled,
      },
    },
    dispatch,
  } = useContext(StoreContext);
  const toggleSwitch = (value: boolean) => dispatch(enableBiometrics(value));

  // Check on every page load
  useEffect(
    () =>
      navigation.addListener('focus', async () => {
        const types: number[] =
          await LocalAuthentication.supportedAuthenticationTypesAsync();
        const isAvailable = await LocalAuthentication.isEnrolledAsync();

        let type: BiometryType;
        switch (types[0]) {
          case 1:
            type = BIOMETRICS_TYPE.FINGERPRINT;
            break;
          case 2:
            type = BIOMETRICS_TYPE.FACIAL_RECOGNITION;
            break;
          case 3:
            type = BIOMETRICS_TYPE.IRIS;
            break;
          default:
            type = BIOMETRICS_TYPE.BIOMETRICS;
        }
        dispatch(updateBiometricSettings(type, isAvailable));
      }),
    [navigation, dispatch],
  );
  let containerHeader;
  if (isBiometricsAvailable && biometricsType) {
    containerHeader = getBiometricsLabel(biometricsType);
  } else {
    containerHeader = 'biometrics.defaultHeader';
  }
  const sensorType =
    !isBiometricsAvailable || !biometricsType
      ? 'biometrics.defaultHeader'
      : getBiometricsLabel(biometricsType);
  useEffect(() => {
    if (!isBiometricsAvailable) {
      Alert.alert(
        I18n.t('biometrics.defaultHeader'),
        I18n.t('biometrics.notAvailable'),
      );
    }
  }, [isBiometricsAvailable]);

  return (
    <View
      style={styles.container}
      {...testProperties(I18n.t('biometrics.testId'))}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ContainerHeader
          title={containerHeader}
          containerStyle={styles.containerHeader}
        />
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.label}>
              {I18n.t('biometrics.logInWith', {sensorType})}
            </Text>
            <Switch
              trackColor={{false: Colors.lightGray, true: Colors.slRed}}
              thumbColor={isBiometricsEnabled ? Colors.white : Colors.white}
              ios_backgroundColor={Colors.lightGray}
              onValueChange={toggleSwitch}
              value={isBiometricsEnabled}
              disabled={!isBiometricsAvailable}
              {...testProperties(I18n.t('biometrics.switchTestId'))}
            />
          </View>
          <Text style={styles.text}>
            {I18n.t('biometrics.description', {sensorType})}
          </Text>
          <Text style={[styles.text, styles.note]}>
            {I18n.t('biometrics.note')}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContainer: {},
  containerHeader: {},
  content: {
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    color: Colors.black,
    fontFamily: MUSEO_SANS_500,
    fontSize: 18,
  },
  text: {
    color: Colors.black,
    fontFamily: MUSEO_SANS_500,
    fontSize: 16,
  },
  note: {
    fontStyle: 'italic',
    marginTop: 16,
  },
});

export default BiometricsScreen;
export {getBiometricsLabel};
