/**
 *  Credit card logic is based on this repo https://github.com/halilb/rn-credit-card
 *
 *  @TODO: This screen is way to complex and needs to be refactored!!
 */
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import cardValidator from 'card-validator';
import {ROUTES} from '../navigation/Routes';
import {StackNavigationProp} from '@react-navigation/stack';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CartStackParamList} from '../navigation/types';
import ContainerHeader from '../components/ContainerHeader';
import {Colors} from '../styles/Colors';
import {
  MUSEO_SANS_300,
  MUSEO_SANS_500,
  MUSEO_SANS_700,
} from '../utils/Constants';
import CheckoutFooter from '../components/CheckoutFooter';
import {StoreContext} from '../store/Store';
import InputField from '../components/InputField';
import CheckBoxField from '../components/CheckBoxField';
import AddressForm from '../components/AddressForm';
import {updateCardDetails} from '../store/actions/CardDetailsActions';
import I18n from '../config/I18n';
import {testProperties} from '../config/TestProperties';

type CheckoutPaymentProps = {
  navigation: StackNavigationProp<CartStackParamList, ROUTES.CHECKOUT_PAYMENT>;
};

const CheckoutPaymentPage = ({navigation}: CheckoutPaymentProps) => {
  const {
    state: {cardDetails},
    dispatch,
  } = useContext(StoreContext);
  const {
    cardFullName,
    cardNumber,
    cardExpirationDate,
    cardSecurityCode,
    isShippingAddress,
    billingAddressDetails,
  } = cardDetails;
  /**
   * Set states
   */
  const [inputCardFullName, setCardFullName] = useState(cardFullName);
  const [isCardFullNameError, setIsCardFullNameError] = useState(false);
  const [inputCardNumber, setCardNumber] = useState(cardNumber);
  const [isCardNumberError, setIsCardNumberError] = useState(false);
  const [inputCardExpirationDate, setCardExpirationDate] =
    useState(cardExpirationDate);
  const [isCardExpirationDateError, setIsCardExpirationDateError] =
    useState(false);
  const [inputCardSecurityCode, setCardSecurityCode] =
    useState(cardSecurityCode);
  const [isCardSecurityCodeError, setIsCardSecurityCodeError] = useState(false);
  const [isCvcTooltipShown, setIsCvcTooltipShown] = useState(false);
  /**
   * For the Card Full Name
   */
  const isValidCardFullName = useCallback(
    () =>
      setIsCardFullNameError(
        !cardValidator.cardholderName(inputCardFullName).isValid,
      ),
    [inputCardFullName],
  );
  useEffect(() => {
    if (inputCardFullName.length > 0) {
      isValidCardFullName();
    }
  }, [inputCardFullName, isValidCardFullName]);
  /**
   * For the Card Number
   */
  const cardNumberFormatter = (value: string) => {
    if (inputCardNumber.length > value.length) {
      return value;
    }

    return value
      .replace(/\W/gi, '')
      .replace(/(.{4})/g, '$1 ')
      .substring(0, 19);
  };
  const isValidCardNumber = useCallback(
    () => setIsCardNumberError(!cardValidator.number(inputCardNumber).isValid),
    [inputCardNumber],
  );
  const validateCardNumber = useCallback(() => {
    const {card} = cardValidator.number(inputCardNumber);
    const cardLength = card?.type === 'american-express' ? 18 : 19;
    if (inputCardNumber.length < cardLength) {
      return true;
    }
    isValidCardNumber();
  }, [inputCardNumber, isValidCardNumber]);
  useEffect(() => {
    const {card} = cardValidator.number(inputCardNumber);
    const cardLength = card?.type === 'american-express' ? 18 : 19;
    if (inputCardNumber.length >= cardLength) {
      validateCardNumber();
    }
  }, [inputCardNumber, validateCardNumber]);
  /**
   * For Card expiration date
   */
  const expirationDateFormatter = (value: string) => {
    if (inputCardExpirationDate.length > value.length) {
      return value;
    }
    return value
      .replace(/\W/gi, '')
      .replace(/(.{2})/g, '$1/')
      .substring(0, 5);
  };
  const isValidCardExpirationDate = useCallback(
    () =>
      setIsCardExpirationDateError(
        !cardValidator.expirationDate(inputCardExpirationDate).isValid,
      ),
    [inputCardExpirationDate],
  );
  useEffect(() => {
    if (inputCardExpirationDate.length > 4) {
      isValidCardExpirationDate();
    }
  }, [inputCardExpirationDate, isValidCardExpirationDate]);
  /**
   * For Card security code
   */
  const isValidCardSecurityCode = useCallback(
    () =>
      setIsCardSecurityCodeError(
        !cardValidator.cvv(inputCardSecurityCode).isValid,
      ),
    [inputCardSecurityCode],
  );
  useEffect(() => {
    const {card} = cardValidator.number(inputCardSecurityCode);
    const cvvLength = card?.type === 'american-express' ? 4 : 3;

    if (inputCardSecurityCode.length >= cvvLength) {
      isValidCardSecurityCode();
    }
  }, [inputCardSecurityCode, isValidCardSecurityCode]);
  /**
   * For billing address
   */
  const [inputIsShippingAddress, setIsShippingAddress] =
    useState(isShippingAddress);
  const {
    addressLineOne,
    addressLineTwo,
    city,
    country,
    fullName,
    stateRegion,
    zipCode,
  } = billingAddressDetails;
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
  /**
   * Submission validations
   */
  const mandatoryFieldsFilled =
    // Mandatory card fields need to be filled
    inputCardFullName &&
    inputCardNumber &&
    inputCardExpirationDate &&
    inputCardSecurityCode &&
    !isCardFullNameError &&
    !isCardNumberError &&
    !isCardExpirationDateError &&
    !isCardSecurityCodeError &&
    // If different shipping address
    (!inputIsShippingAddress
      ? inputFullName &&
        inputAddressLineOne &&
        inputCity &&
        inputZipCode &&
        inputCountry &&
        !isFullNameError &&
        !isAddressLineOneError &&
        !isCityError &&
        !isZipCodeError &&
        !isCountryError
      : true);
  const validateMandatoryFields = () => {
    setIsCardFullNameError(!inputCardFullName);
    setIsCardNumberError(!inputCardNumber);
    setIsCardExpirationDateError(!inputCardExpirationDate);
    setIsCardSecurityCodeError(!inputCardSecurityCode);
    if (!inputIsShippingAddress) {
      setFullNameError(!inputFullName);
      setAddressLineOneError(!inputAddressLineOne);
      setCityError(!inputCity);
      setZipCodeError(!inputZipCode);
      setCountryError(!inputCountry);
    }
  };
  const submitAndNavigate = () => {
    validateMandatoryFields();
    if (mandatoryFieldsFilled) {
      dispatch(
        updateCardDetails({
          cardFullName: inputCardFullName,
          cardNumber: inputCardNumber,
          cardExpirationDate: inputCardExpirationDate,
          cardSecurityCode: inputCardSecurityCode,
          isShippingAddress: inputIsShippingAddress,
          billingAddressDetails: {
            fullName: inputFullName,
            addressLineOne: inputAddressLineOne,
            addressLineTwo: inputAddressLineTwo,
            city: inputCity,
            stateRegion: inputStateRegion,
            zipCode: inputZipCode,
            country: inputCountry,
          },
        }),
      );
      navigation.navigate(ROUTES.CHECKOUT_REVIEW_ORDER);
    }
  };
  const showHideTooltip = () => setIsCvcTooltipShown(!isCvcTooltipShown);

  return (
    <View
      style={styles.container}
      {...testProperties(I18n.t('checkoutPayment.testId'))}>
      <KeyboardAwareScrollView style={styles.scrollContainer}>
        <ContainerHeader
          title={I18n.t('checkoutPayment.header')}
          containerStyle={styles.containerHeader}
        />
        <Text style={styles.subTitle}>
          {I18n.t('checkoutPayment.subTitle')}
        </Text>
        <Text style={styles.subText}>{I18n.t('checkoutPayment.subText')}</Text>
        <View style={styles.subHeader}>
          <Text style={styles.subHeaderText}>
            {I18n.t('checkoutPayment.cardLabel')}
          </Text>
          <Image
            source={require('../assets/images/cards-icon.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.cardDetailsContainer}>
          <InputField
            isError={isCardFullNameError}
            errorMessage={I18n.t(
              'checkoutPayment.cardData.fullName.errorMessage',
            )}
            label={`${I18n.t('checkoutPayment.cardData.fullName.label')}*`}
            onBlur={isValidCardFullName}
            onChangeText={text => setCardFullName(text)}
            placeholder={I18n.t(
              'checkoutPayment.cardData.fullName.placeholder',
            )}
            value={inputCardFullName}
          />
          <InputField
            isError={isCardNumberError}
            errorMessage={I18n.t('checkoutPayment.cardData.card.errorMessage')}
            keyboardType="numeric"
            label={`${I18n.t('checkoutPayment.cardData.card.label')}*`}
            onBlur={isValidCardNumber}
            onChangeText={text => setCardNumber(cardNumberFormatter(text))}
            placeholder={I18n.t('checkoutPayment.cardData.card.placeholder')}
            textContentType="creditCardNumber"
            value={inputCardNumber}
          />
          <View style={styles.row}>
            <InputField
              isError={isCardExpirationDateError}
              errorMessage={I18n.t(
                'checkoutPayment.cardData.expDate.errorMessage',
              )}
              label={`${I18n.t('checkoutPayment.cardData.expDate.label')}*`}
              onBlur={isValidCardExpirationDate}
              onChangeText={text =>
                setCardExpirationDate(expirationDateFormatter(text))
              }
              placeholder={I18n.t(
                'checkoutPayment.cardData.expDate.placeholder',
              )}
              value={inputCardExpirationDate}
            />
            <View style={styles.verticalDivider} />
            <InputField
              isError={isCardSecurityCodeError}
              errorMessage={I18n.t(
                'checkoutPayment.cardData.secCode.errorMessage',
              )}
              keyboardType="numeric"
              label={`${I18n.t('checkoutPayment.cardData.secCode.label')}*`}
              maxLength={4}
              onBlur={isValidCardSecurityCode}
              onChangeText={text => setCardSecurityCode(text)}
              placeholder={I18n.t(
                'checkoutPayment.cardData.secCode.placeholder',
              )}
              value={inputCardSecurityCode}
            />
            {isCvcTooltipShown && (
              <View style={styles.tooltipContainer}>
                <Text style={styles.tooltipText}>
                  {I18n.t('checkoutPayment.cvcTooltip')}
                </Text>
                <View style={styles.triangle} />
              </View>
            )}
            <TouchableOpacity
              style={styles.cvcInfoButton}
              onPress={showHideTooltip}>
              <Text style={styles.cvcInfoButtonText}>?</Text>
            </TouchableOpacity>
          </View>
          <CheckBoxField
            label={I18n.t('checkoutPayment.billingAddress')}
            onValueChange={setIsShippingAddress}
            value={inputIsShippingAddress}
          />
          {!inputIsShippingAddress && (
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
          )}
        </View>
      </KeyboardAwareScrollView>
      <CheckoutFooter
        onPress={submitAndNavigate}
        showTotals={false}
        title={I18n.t('checkoutPayment.submitButtonText')}
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
  subText: {
    color: Colors.black,
    fontFamily: MUSEO_SANS_300,
    fontSize: 14,
    marginBottom: 16,
    width: '90%',
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    paddingBottom: 8,
    marginBottom: 8,
    marginTop: 16,
  },
  subHeaderText: {
    color: Colors.black,
    fontFamily: MUSEO_SANS_300,
    fontSize: 16,
  },
  image: {
    height: 20,
    width: 72,
  },
  cardDetailsContainer: {},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  verticalDivider: {
    width: 0,
    marginRight: 16,
  },
  cvcInfoButton: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -12,
    right: -10,
    height: 45,
    width: 45,
  },
  cvcInfoButtonText: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 9,
    color: Colors.gray,
    fontSize: 12,
    height: 18,
    width: 18,
    textAlign: 'center',
  },
  tooltipContainer: {
    backgroundColor: Colors.black,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    position: 'absolute',
    top: -50,
    right: 0,
    width: 210,
  },
  tooltipText: {
    color: Colors.white,
    fontFamily: MUSEO_SANS_500,
    fontSize: 14,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: Colors.black,
    transform: [{rotate: '180deg'}],
    position: 'absolute',
    bottom: -5,
    right: 5,
  },
});

export default CheckoutPaymentPage;
