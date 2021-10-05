import {
  AuthenticationActionEnum,
  AuthenticationActionEnum as ACTIONS,
  AuthenticationActionType,
} from '../actions/AuthenticationActions';
import {BiometryType} from '../../containers/Biometrics';

export interface AuthenticationInterface {
  biometricsType: BiometryType | undefined;
  isBiometricsEnabled: boolean;
  isBiometricsAvailable: boolean;
  isLoggedIn: boolean;
  username: string | AuthenticationActionEnum;
}

const initialAuthenticationState: AuthenticationInterface = {
  biometricsType: undefined,
  isBiometricsEnabled: false,
  isBiometricsAvailable: false,
  isLoggedIn: false,
  username: '',
};

const authenticationReducer = (
  state = initialAuthenticationState,
  action: AuthenticationActionType,
) => {
  switch (action.type) {
    case ACTIONS.LOGIN: {
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
        username: action.username,
      };
    }
    case ACTIONS.LOGOUT: {
      return {
        ...state,
        isLoggedIn: false,
        username: '',
      };
    }
    case ACTIONS.UPDATE_BIOMETRICS: {
      return {
        ...state,
        isBiometricsAvailable: action.isBiometricsAvailable,
        biometricsType: action.biometricsType,
      };
    }
    case ACTIONS.ENABLE_BIOMETRICS: {
      return {
        ...state,
        isBiometricsEnabled: action.isBiometricsEnabled,
      };
    }
    default:
      return state;
  }
};

export {initialAuthenticationState, authenticationReducer};
