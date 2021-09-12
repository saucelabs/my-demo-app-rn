import React from 'react';
import {
  Image,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputFocusEventData,
  View,
} from 'react-native';
import {MUSEO_SANS_300, MUSEO_SANS_700} from '../utils/Constants';
import {Colors} from '../styles/Colors';
import {testProperties} from '../config/TestProperties';
import I18n from '../config/I18n';

const InputField = ({
  label,
  placeholder = '',
  onBlur,
  onChangeText,
  errorMessage = '',
  isError = false,
  isDisabled = false,
  keyboardType,
  maxLength,
  secureTextEntry = false,
  textContentType,
  value = '',
}: {
  label?: string;
  placeholder?: string;
  onBlur?: (arg: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onChangeText?: (arg: string) => void;
  errorMessage?: string;
  isError?: boolean;
  isDisabled?: boolean;
  maxLength?: number;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  textContentType?:
    | 'none'
    | 'URL'
    | 'addressCity'
    | 'addressCityAndState'
    | 'addressState'
    | 'countryName'
    | 'creditCardNumber'
    | 'emailAddress'
    | 'familyName'
    | 'fullStreetAddress'
    | 'givenName'
    | 'jobTitle'
    | 'location'
    | 'middleName'
    | 'name'
    | 'namePrefix'
    | 'nameSuffix'
    | 'nickname'
    | 'organizationName'
    | 'postalCode'
    | 'streetAddressLine1'
    | 'streetAddressLine2'
    | 'sublocality'
    | 'telephoneNumber'
    | 'username'
    | 'password'
    | 'newPassword'
    | 'oneTimeCode'
    | undefined;
  value?: string;
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputFieldContainer}>
        <TextInput
          autoCapitalize="none"
          {...(onBlur ? {onBlur: onBlur} : {})}
          {...(onChangeText ? {onChangeText: onChangeText} : {})}
          {...(isDisabled ? {editable: false} : {})}
          {...(keyboardType ? {keyboardType} : {})}
          {...(maxLength ? {maxLength} : {})}
          {...(placeholder ? {placeholder} : {})}
          {...(textContentType ? {textContentType} : {})}
          {...(value ? {value} : {})}
          {...(label
            ? testProperties(`${label} ${I18n.t('inputField.testId')}`)
            : {})}
          placeholderTextColor={isError ? Colors.slRed : Colors.gray}
          {...(secureTextEntry ? {secureTextEntry} : {})}
          style={[
            styles.inputField,
            isDisabled ? styles.inputFieldDisabled : {},
            isError ? styles.inputFieldError : {},
          ]}
        />
        {isError && (
          <View style={styles.errorImageContainer}>
            <Image
              source={require('../assets/images/error-icon.png')}
              style={styles.errorImage}
            />
          </View>
        )}
      </View>
      <View
        style={styles.errorMessageContainer}
        {...testProperties(
          `${label ? label + '-' : ''}${I18n.t(
            'inputField.errorMessageTestId',
          )}`,
        )}>
        {isError && errorMessage && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexBasis: 0,
  },
  label: {
    color: Colors.black,
    fontFamily: MUSEO_SANS_700,
    fontSize: 16,
    marginBottom: 8,
  },
  inputFieldContainer: {},
  inputField: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 4,
    color: Colors.black,
    fontFamily: MUSEO_SANS_300,
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  inputFieldError: {
    borderColor: Colors.slRed,
  },
  inputFieldDisabled: {},
  errorMessageContainer: {
    marginVertical: 4,
    height: 18,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  errorImageContainer: {
    position: 'absolute',
    top: 0,
    right: 12,
    height: '100%',
    justifyContent: 'center',
  },
  errorImage: {
    height: 16,
    width: 16,
  },
  errorMessage: {
    color: Colors.slRed,
    fontFamily: MUSEO_SANS_300,
    fontSize: 14,
  },
});

export default InputField;
