import {
  AuthenticationActionEnum,
  AuthenticationActionEnum as ACTIONS,
  AuthenticationActionType,
} from '../actions/AuthenticationActions';
import {BiometryType} from '../../containers/Biometrics';
import {StateNameEnum, storeAsyncData} from '../Store';

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
      const newState = {
        ...state,
        isLoggedIn: action.isLoggedIn,
        username: action.username,
      };
      storeAsyncData(StateNameEnum.AUTHENTICATION, newState);

      return newState;
    }
    case ACTIONS.LOGOUT: {
      const newState = {
        ...state,
        isLoggedIn: false,
        username: '',
      };
      storeAsyncData(StateNameEnum.AUTHENTICATION, newState);

      return newState;
    }
    case ACTIONS.UPDATE_STATE: {
      return action.authenticationData;
    }
    case ACTIONS.UPDATE_BIOMETRICS: {
      return {
        ...state,
        isBiometricsAvailable: action.isBiometricsAvailable,
        biometricsType: action.biometricsType,
      };
    }
    case ACTIONS.ENABLE_BIOMETRICS: {
      const newState = {
        ...state,
        isBiometricsEnabled: action.isBiometricsEnabled,
      };
      storeAsyncData(StateNameEnum.AUTHENTICATION, newState);

      return newState;
    }
    default:
      return state;
  }
};

export {initialAuthenticationState, authenticationReducer};
