import React from 'react';
import {StyleSheet, View} from 'react-native';
import InputField from './InputField';
import I18n from '../config/I18n';

const AddressForm = ({
  fullName: {inputFullName, isFullNameError},
  addressLineOne: {inputAddressLineOne, isAddressLineOneError},
  addressLineTwo: {inputAddressLineTwo},
  city: {inputCity, isCityError},
  stateRegion: {inputStateRegion},
  zipCode: {inputZipCode, isZipCodeError},
  country: {inputCountry, isCountryError},
  setInputState,
}: {
  fullName: {
    inputFullName: string;
    isFullNameError: boolean;
  };
  addressLineOne: {
    inputAddressLineOne: string;
    isAddressLineOneError: boolean;
  };
  addressLineTwo: {
    inputAddressLineTwo: string | undefined;
  };
  city: {
    inputCity: string;
    isCityError: boolean;
  };
  stateRegion: {
    inputStateRegion: string | undefined;
  };
  zipCode: {
    inputZipCode: string;
    isZipCodeError: boolean;
  };
  country: {
    inputCountry: string;
    isCountryError: boolean;
  };
  setInputState: ({value, field}: {value: string; field: string}) => void;
}) => {
  return (
    <View>
      <InputField
        label={`${I18n.t('shippingAddress.fullName.label')}*`}
        isError={isFullNameError}
        errorMessage={I18n.t('shippingAddress.fullName.errorMessage')}
        onChangeText={value => setInputState({value, field: 'fullName'})}
        placeholder={I18n.t('shippingAddress.fullName.placeholder')}
        value={inputFullName}
      />
      <InputField
        label={`${I18n.t('shippingAddress.addressLineOne.label')}*`}
        isError={isAddressLineOneError}
        errorMessage={I18n.t('shippingAddress.addressLineOne.errorMessage')}
        onChangeText={value => setInputState({value, field: 'addressLineOne'})}
        placeholder={I18n.t('shippingAddress.addressLineOne.placeholder')}
        value={inputAddressLineOne}
      />
      <InputField
        label={I18n.t('shippingAddress.addressLineTwo.label')}
        onChangeText={value => setInputState({value, field: 'addressLineTwo'})}
        placeholder={I18n.t('shippingAddress.addressLineTwo.placeholder')}
        value={inputAddressLineTwo}
      />
      <View style={styles.row}>
        <InputField
          label={`${I18n.t('shippingAddress.city.label')}*`}
          isError={isCityError}
          errorMessage={I18n.t('shippingAddress.city.errorMessage')}
          onChangeText={value => setInputState({value, field: 'city'})}
          placeholder={I18n.t('shippingAddress.city.placeholder')}
          value={inputCity}
        />
        <View style={styles.verticalDivider} />
        <InputField
          label={I18n.t('shippingAddress.stateRegion.label')}
          onChangeText={value => setInputState({value, field: 'stateRegion'})}
          placeholder={I18n.t('shippingAddress.stateRegion.placeholder')}
          value={inputStateRegion}
        />
      </View>
      <View style={styles.row}>
        <InputField
          label={`${I18n.t('shippingAddress.zipCode.label')}*`}
          isError={isZipCodeError}
          errorMessage={I18n.t('shippingAddress.zipCode.errorMessage')}
          onChangeText={value => setInputState({value, field: 'zipCode'})}
          placeholder={I18n.t('shippingAddress.zipCode.placeholder')}
          value={inputZipCode}
        />
        <View style={styles.verticalDivider} />
        <InputField
          label={`${I18n.t('shippingAddress.country.label')}*`}
          isError={isCountryError}
          errorMessage={I18n.t('shippingAddress.country.errorMessage')}
          onChangeText={value => setInputState({value, field: 'country'})}
          placeholder={I18n.t('shippingAddress.country.placeholder')}
          value={inputCountry}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  verticalDivider: {
    width: 0,
    marginRight: 16,
  },
});

export default AddressForm;
