import React, {useCallback, useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import {ROUTES} from '../navigation/Routes';
import {StackNavigationProp} from '@react-navigation/stack';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CartStackParamList, MenuStackParamList} from '../navigation/types';
import {Colors} from '../styles/Colors';
import {
  MUSEO_SANS_300,
  MUSEO_SANS_700,
  USERNAMES_ENUM,
  VALID_PASSWORD,
} from '../utils/Constants';
import ContainerHeader from '../components/ContainerHeader';
import Button from '../components/Button';
import InputField from '../components/InputField';
import {isLockedOutUser, verifyCredentials} from '../utils/Credentials';
import {StoreContext} from '../store/Store';
import {login} from '../store/actions/AuthenticationActions';
import {RouteProp} from '@react-navigation/native';
import I18n from '../config/I18n';
import {testProperties} from '../config/TestProperties';
import BiometricsButton from '../components/BiometricsButton';
import {getBiometricsLabel} from './Biometrics';

type LoginProps = {
  navigation: StackNavigationProp<CartStackParamList, ROUTES.LOGIN>;
  route: RouteProp<MenuStackParamList, ROUTES.LOGIN>;
};

const LoginPage = ({route, navigation}: LoginProps) => {
  const {
    state: {
      authentication: {
        username: stateUsername,
        isBiometricsAvailable,
        isBiometricsEnabled,
        biometricsType,
      },
    },
    dispatch,
  } = useContext(StoreContext);
  const [username, setUsername] = useState(stateUsername);
  const [isUsernameError, setIsUsernameError] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [isGenericError, setIsGenericError] = useState(false);
  const [genericErrorMessage, setGenericErrorMessage] = useState('false');
  const AutoFillButton = ({
    label,
    onPress,
  }: {
    label: string;
    onPress: () => void;
  }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          resetErrorState();
          onPress();
        }}
        {...testProperties(`${label}-${I18n.t('autofill.testId')}`)}>
        <Text style={[styles.infoText, styles.infoTextLink]}>{label}</Text>
      </TouchableOpacity>
    );
  };
  const resetErrorState = () => {
    setIsUsernameError(false);
    setUsernameErrorMessage('');
    setIsPasswordError(false);
    setPasswordErrorMessage('');
    setIsGenericError(false);
    setGenericErrorMessage('');
  };
  const successfullyLogin = useCallback(async () => {
    await dispatch(login(username || USERNAMES_ENUM.STANDARD_USER));

    if (route?.params && route.params.screen && route.params.stack) {
      const {screen, stack} = route?.params;

      // Remove the login from the stack
      navigation.pop();
      return navigation.navigate(stack, {screen});
    }

    return navigation.navigate(ROUTES.CHECKOUT_ADDRESS);
  }, [dispatch, route, navigation, username]);
  const handleBiometrics = useCallback(async () => {
    resetErrorState();
    try {
      const sensorType =
        !isBiometricsAvailable || !biometricsType
          ? 'biometrics.defaultHeader'
          : getBiometricsLabel(biometricsType);
      const {success} = await LocalAuthentication.authenticateAsync({
        promptMessage: I18n.t('biometrics.promptMessage', {sensorType}),
        disableDeviceFallback: true,
        cancelLabel: I18n.t('biometrics.cancelButton'),
      });
      if (success) {
        await successfullyLogin();
      }
    } catch (error) {
      console.log('error = ', error);
    }
  }, [successfullyLogin, biometricsType, isBiometricsAvailable]);

  useEffect(() => {
    if (isBiometricsEnabled) {
      handleBiometrics();
    }
  }, [isBiometricsEnabled, handleBiometrics]);
  const handleSubmit = () => {
    resetErrorState();

    if (!username) {
      setIsUsernameError(true);
      return setUsernameErrorMessage(I18n.t('login.errors.username'));
    }

    if (!password) {
      setIsPasswordError(true);
      return setPasswordErrorMessage(I18n.t('login.errors.password'));
    }

    if (verifyCredentials({username, password})) {
      if (isLockedOutUser({username})) {
        setIsGenericError(true);
        return setGenericErrorMessage(I18n.t('login.errors.lockedOut'));
      }
      return successfullyLogin();
    }

    // Generic error message
    setIsGenericError(true);
    setGenericErrorMessage(I18n.t('login.errors.noMatch'));
  };

  return (
    <View style={styles.container} {...testProperties(I18n.t('login.testId'))}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <ContainerHeader
          title={I18n.t('login.header')}
          containerStyle={styles.containerHeader}
        />
        <Text style={styles.subText}>{I18n.t('login.subText')}</Text>
        <InputField
          errorMessage={usernameErrorMessage}
          isError={isUsernameError}
          label={I18n.t('login.usernameLabel')}
          onChangeText={text => setUsername(text)}
          placeholder=""
          value={username}
        />
        <InputField
          errorMessage={passwordErrorMessage}
          isError={isPasswordError}
          label={I18n.t('login.passwordLabel')}
          onChangeText={text => setPassword(text)}
          placeholder=""
          secureTextEntry
          value={password}
        />
        <View
          style={styles.genericErrorMessage}
          {...testProperties(I18n.t('login.genericErrorMessageTestId'))}>
          {isGenericError && (
            <Text style={styles.genericErrorMessageText}>
              {genericErrorMessage}
            </Text>
          )}
        </View>
        <View style={styles.row}>
          {isBiometricsEnabled && biometricsType && (
            <BiometricsButton
              onPress={handleBiometrics}
              sensorType={biometricsType}
            />
          )}
          <Button
            onPress={handleSubmit}
            title={I18n.t('login.submitButtonText')}
            testId={I18n.t('login.submitButtonText')}
          />
        </View>
        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.infoHeader}>
              {I18n.t('login.usernamesHeader')}
            </Text>
            <AutoFillButton
              label={I18n.t('login.loginData.standard')}
              onPress={() => {
                setUsername(USERNAMES_ENUM.STANDARD_USER);
                setPassword(VALID_PASSWORD);
              }}
            />
            <AutoFillButton
              label={`${I18n.t('login.loginData.locked')} ${I18n.t(
                'login.lockedOut',
              )}`}
              onPress={() => {
                setUsername(USERNAMES_ENUM.LOCKED_OUT_USER);
                setPassword(VALID_PASSWORD);
              }}
            />
          </View>
          <View>
            <Text style={styles.infoHeader}>
              {I18n.t('login.passwordHeader')}
            </Text>
            <Text style={styles.infoText}>
              {I18n.t('login.loginData.password')}
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerHeader: {
    paddingLeft: 0,
    paddingBottom: 32,
  },
  subText: {
    color: Colors.black,
    fontFamily: MUSEO_SANS_300,
    fontSize: 14,
    marginBottom: 32,
    width: '90%',
  },
  genericErrorMessage: {
    height: 60,
  },
  genericErrorMessageText: {
    color: Colors.slRed,
    fontFamily: MUSEO_SANS_300,
    fontSize: 16,
  },
  infoContainer: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoHeader: {
    color: Colors.black,
    fontFamily: MUSEO_SANS_700,
    fontSize: 18,
    paddingBottom: 16,
  },
  infoText: {
    color: Colors.gray,
    fontFamily: MUSEO_SANS_300,
    fontSize: 14,
    paddingBottom: 8,
  },
  infoTextLink: {
    textDecorationLine: 'underline',
  },
});

export default LoginPage;
