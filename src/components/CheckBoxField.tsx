import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../styles/Colors';
import {FONTS} from '../utils/Constants';
import I18n from '../config/I18n';
import {testProperties} from '../config/TestProperties';

const CheckBoxField = ({
  label,
  value,
  onValueChange,
}: {
  label: string;
  value: boolean;
  onValueChange: (arg: boolean) => void;
}) => {
  return (
    <View style={styles.checkboxContainer}>
      <TouchableOpacity
        onPress={() => onValueChange(!value)}
        style={styles.checkbox}
        {...testProperties(`${I18n.t('checkbox.testId')} ${label}`)}>
        <View style={styles.imageContainer}>
          {value && (
            <Image
              source={require('../assets/images/checkbox-icon.png')}
              style={styles.image}
            />
          )}
        </View>
      </TouchableOpacity>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  checkbox: {
    height: 35,
    width: 35,
  },
  imageContainer: {
    borderColor: Colors.darkGreen,
    borderRadius: 4,
    borderWidth: 1,
    height: 22,
    width: 22,
  },
  image: {
    height: 20,
    width: 20,
  },
  label: {
    color: Colors.dark,
    fontFamily: FONTS.DM_SANS_REGULAR,
    fontSize: 16,
    width: '80%',
  },
});

export default CheckBoxField;
