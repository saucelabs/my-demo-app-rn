import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../styles/Colors';
import {testProperties} from '../config/TestProperties';
import I18n from '../config/I18n';
import {BIOMETRICS_TYPE, BiometryType} from '../containers/Biometrics';

const BiometricsButton = ({
  containerStyle = {},
  isDisabled = false,
  onPress,
  paddingHorizontal,
  sensorType,
}: {
  containerStyle?: {[key: string]: any};
  isDisabled?: boolean;
  onPress: () => void;
  paddingHorizontal?: number;
  sensorType: BiometryType;
}) => {
  const icon =
    sensorType === BIOMETRICS_TYPE.FACIAL_RECOGNITION
      ? 'face-recognition'
      : 'fingerprint';

  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPress={onPress}
      style={[
        styles.container,
        paddingHorizontal ? {paddingHorizontal} : {},
        containerStyle ? containerStyle : {},
      ]}
      {...testProperties(`${I18n.t('biometrics.biometricsButtonTestId')}`)}>
      <Icon name={icon} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.slRed,
    borderRadius: 4,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    width: 50,
  },
  icon: {
    color: Colors.white,
    fontSize: 20,
  },
});

export default BiometricsButton;
