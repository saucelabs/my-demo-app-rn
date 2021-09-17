import {AuthenticationInterface} from '../reducers/AuthenticationReducer';
import {BiometryType} from '../../containers/Biometrics';

enum AuthenticationActionEnum {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  UPDATE_BIOMETRICS = 'UPDATE_BIOMETRICS',
  ENABLE_BIOMETRICS = 'ENABLE_BIOMETRICS',
}

export type AuthenticationActionType =
  | {
      isLoggedIn: AuthenticationInterface;
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

function login(username: AuthenticationActionEnum) {
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

export {
  AuthenticationActionEnum,
  enableBiometrics,
  login,
  logout,
  updateBiometricSettings,
};
