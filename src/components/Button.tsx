import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors} from '../styles/Colors';
import {FONTS} from '../utils/Constants';
import {testProperties} from '../config/TestProperties';
import I18n from '../config/I18n';

const Button = ({
  containerStyle = {},
  isDisabled = false,
  onPress,
  paddingHorizontal,
  title,
  testId,
}: {
  containerStyle?: {[key: string]: any};
  isDisabled?: boolean;
  onPress: () => void;
  paddingHorizontal?: number;
  title: string;
  testId?: string;
}) => {
  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPress={onPress}
      style={[
        styles.container,
        isDisabled ? styles.disabledContainer : {},
        paddingHorizontal ? {paddingHorizontal} : {},
        containerStyle ? containerStyle : {},
      ]}
      {...(testId
        ? testProperties(`${testId} ${I18n.t('button.testId')}`)
        : {})}>
      <Text style={[styles.label, isDisabled ? styles.disabledLabel : {}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.green,
    borderRadius: 4,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  disabledContainer: {
    backgroundColor: Colors.lightGray,
    color: Colors.gray,
  },
  label: {
    color: Colors.dark,
    fontFamily: FONTS.DM_MONO_MEDIUM,
    fontSize: 18,
  },
  disabledLabel: {
    color: Colors.gray,
  },
});

export default Button;
