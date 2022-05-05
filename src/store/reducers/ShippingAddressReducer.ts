import {
  ShippingAddressActionEnum as ACTIONS,
  ShippingAddressActionType,
} from '../actions/ShippingAddressActions';
import {StateNameEnum, storeAsyncData} from '../Store';

export interface ShippingAddressInterface {
  fullName: string;
  addressLineOne: string;
  addressLineTwo?: string;
  city: string;
  stateRegion?: string;
  zipCode: string;
  country: string;
}

const initialShippingAddressState: ShippingAddressInterface = {
  fullName: '',
  addressLineOne: '',
  addressLineTwo: '',
  city: '',
  stateRegion: '',
  zipCode: '',
  country: '',
};
const shippingAddressReducer = (
  state = initialShippingAddressState,
  action: ShippingAddressActionType,
) => {
  switch (action.type) {
    case ACTIONS.UPDATE_SHIPPING_ADDRESS: {
      const newState = {
        ...state,
        ...action.shippingAddress,
      };
      storeAsyncData(StateNameEnum.SHIPPING_ADDRESS, newState);

      return newState;
    }
    case ACTIONS.RESET_SHIPPING_ADDRESS: {
      storeAsyncData(
        StateNameEnum.SHIPPING_ADDRESS,
        initialShippingAddressState,
      );

      return initialShippingAddressState;
    }
    default:
      return state;
  }
};

export {initialShippingAddressState, shippingAddressReducer};
