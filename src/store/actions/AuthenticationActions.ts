import {BIOMETRICS_TYPE, BiometryType} from '../../containers/Biometrics';
import * as LocalAuthentication from 'expo-local-authentication';
import {DispatchType} from '../Store';

enum AuthenticationActionEnum {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  UPDATE_BIOMETRICS = 'UPDATE_BIOMETRICS',
  ENABLE_BIOMETRICS = 'ENABLE_BIOMETRICS',
}

export type AuthenticationActionType =
  | {
      isLoggedIn: boolean;
      type: AuthenticationActionEnum.LOGIN;
      username: AuthenticationActionEnum;
    }
  | {
      type: AuthenticationActionEnum.LOGOUT;
    }
  | {
      isBiometricsAvailable: boolean;
      biometricsType: BiometryType;
      type: AuthenticationActionEnum.UPDATE_BIOMETRICS;
    }
  | {
      isBiometricsEnabled: boolean;
      type: AuthenticationActionEnum.ENABLE_BIOMETRICS;
    };

function login(username: string) {
  return {
    isLoggedIn: true,
    type: AuthenticationActionEnum.LOGIN,
    username,
  };
}

function logout() {
  return {
    type: AuthenticationActionEnum.LOGOUT,
  };
}

function updateBiometricSettings(
  biometricsType: BiometryType | undefined,
  isBiometricsAvailable: boolean,
) {
  return {
    isBiometricsAvailable: isBiometricsAvailable,
    biometricsType: biometricsType,
    type: AuthenticationActionEnum.UPDATE_BIOMETRICS,
  };
}

function enableBiometrics(isBiometricsEnabled: boolean) {
  return {
    isBiometricsEnabled: isBiometricsEnabled,
    type: AuthenticationActionEnum.ENABLE_BIOMETRICS,
  };
}

async function getBiometricsData(dispatch: DispatchType): Promise<void> {
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
}

export {
  AuthenticationActionEnum,
  enableBiometrics,
  getBiometricsData,
  login,
  logout,
  updateBiometricSettings,
};
