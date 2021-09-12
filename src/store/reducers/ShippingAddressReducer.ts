import {
  ShippingAddressActionEnum as ACTIONS,
  ShippingAddressActionType,
} from '../actions/ShippingAddressActions';

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
      return {
        ...state,
        ...action.shippingAddress,
      };
    }
    case ACTIONS.RESET_SHIPPING_ADDRESS: {
      return initialShippingAddressState;
    }
    default:
      return state;
  }
};

export {initialShippingAddressState, shippingAddressReducer};
