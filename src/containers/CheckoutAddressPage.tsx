import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ROUTES} from '../navigation/Routes';
import {StackNavigationProp} from '@react-navigation/stack';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CartStackParamList} from '../navigation/types';
import {StoreContext} from '../store/Store';
import ContainerHeader from '../components/ContainerHeader';
import CheckoutFooter from '../components/CheckoutFooter';
import {Colors} from '../styles/Colors';
import {MUSEO_SANS_700} from '../utils/Constants';
import {updateShippingAddress} from '../store/actions/ShippingAddressActions';
import AddressForm from '../components/AddressForm';
import {testProperties} from '../config/TestProperties';
import I18n from '../config/I18n';

type CheckoutAddressProps = {
  navigation: StackNavigationProp<CartStackParamList, ROUTES.CHECKOUT_ADDRESS>;
};

const CheckoutAddressPage = ({navigation}: CheckoutAddressProps) => {
  const {
    state: {shippingAddress},
    dispatch,
  } = useContext(StoreContext);
  const {
    addressLineOne,
    addressLineTwo,
    city,
    country,
    fullName,
    stateRegion,
    zipCode,
  } = shippingAddress;
  const [inputFullName, setFullName] = useState(fullName);
  const [isFullNameError, setFullNameError] = useState(false);
  const [inputAddressLineOne, setAddressLineOne] = useState(addressLineOne);
  const [isAddressLineOneError, setAddressLineOneError] = useState(false);
  const [inputAddressLineTwo, setAddressLineTwo] = useState(addressLineTwo);
  const [inputCity, setCity] = useState(city);
  const [isCityError, setCityError] = useState(false);
  const [inputStateRegion, setStateRegion] = useState(stateRegion);
  const [inputZipCode, setZipCode] = useState(zipCode);
  const [isZipCodeError, setZipCodeError] = useState(false);
  const [inputCountry, setCountry] = useState(country);
  const [isCountryError, setCountryError] = useState(false);
  const mandatoryFieldsFilled =
    inputFullName &&
    inputAddressLineOne &&
    inputCity &&
    inputZipCode &&
    inputCountry &&
    !isFullNameError &&
    !isAddressLineOneError &&
    !isCityError &&
    !isZipCodeError &&
    !isCountryError;
  const setInputState = ({value, field}: {value: string; field: string}) => {
    switch (field) {
      case 'fullName':
        setFullName(value);
        setFullNameError(!value);
        break;
      case 'addressLineOne':
        setAddressLineOne(value);
        setAddressLineOneError(!value);
        break;
      case 'addressLineTwo':
        setAddressLineTwo(value);
        break;
      case 'city':
        setCity(value);
        setCityError(!value);
        break;
      case 'stateRegion':
        setStateRegion(value);
        break;
      case 'zipCode':
        setZipCode(value);
        setZipCodeError(!value);
        break;
      case 'country':
        setCountry(value);
        setCountryError(!value);
        break;
    }
  };
  const validateMandatoryFields = () => {
    setFullNameError(!inputFullName);
    setAddressLineOneError(!inputAddressLineOne);
    setCityError(!inputCity);
    setZipCodeError(!inputZipCode);
    setCountryError(!inputCountry);
  };
  const submitAndNavigate = () => {
    validateMandatoryFields();
    if (mandatoryFieldsFilled) {
      dispatch(
        updateShippingAddress({
          fullName: inputFullName,
          addressLineOne: inputAddressLineOne,
          addressLineTwo: inputAddressLineTwo,
          city: inputCity,
          stateRegion: inputStateRegion,
          zipCode: inputZipCode,
          country: inputCountry,
        }),
      );
      navigation.navigate(ROUTES.CHECKOUT_PAYMENT);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.scrollContainer}
        {...testProperties(I18n.t('checkoutAddress.testId'))}>
        <ContainerHeader
          title={I18n.t('checkoutAddress.header')}
          containerStyle={styles.containerHeader}
        />
        <Text style={styles.subTitle}>{I18n.t('checkoutAddress.subText')}</Text>
        <AddressForm
          fullName={{inputFullName, isFullNameError}}
          addressLineOne={{
            inputAddressLineOne,
            isAddressLineOneError,
          }}
          addressLineTwo={{inputAddressLineTwo}}
          city={{inputCity, isCityError}}
          stateRegion={{inputStateRegion}}
          zipCode={{inputZipCode, isZipCodeError}}
          country={{inputCountry, isCountryError}}
          setInputState={setInputState}
        />
      </KeyboardAwareScrollView>
      <CheckoutFooter
        onPress={submitAndNavigate}
        showTotals={false}
        title={I18n.t('checkoutAddress.submitButtonText')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  scrollContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
  },
  containerHeader: {
    paddingLeft: 0,
    paddingBottom: 16,
  },
  subTitle: {
    color: Colors.black,
    fontFamily: MUSEO_SANS_700,
    fontSize: 16,
    marginVertical: 16,
  },
  addressContainer: {},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  verticalDivider: {
    width: 0,
    marginRight: 16,
  },
});

export default CheckoutAddressPage;
