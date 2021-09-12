import {ShippingAddressInterface} from '../reducers/ShippingAddressReducer';

enum ShippingAddressActionEnum {
  UPDATE_SHIPPING_ADDRESS = 'UPDATE_SHIPPING_ADDRESS',
  RESET_SHIPPING_ADDRESS = 'RESET_SHIPPING_ADDRESS',
}

export type ShippingAddressActionType =
  | {
      shippingAddress: ShippingAddressInterface;
      type: ShippingAddressActionEnum.UPDATE_SHIPPING_ADDRESS;
    }
  | {
      type: ShippingAddressActionEnum.RESET_SHIPPING_ADDRESS;
    };

function updateShippingAddress(shippingAddress: ShippingAddressInterface) {
  return {
    shippingAddress,
    type: ShippingAddressActionEnum.UPDATE_SHIPPING_ADDRESS,
  };
}

function resetShippingAddress() {
  return {
    type: ShippingAddressActionEnum.RESET_SHIPPING_ADDRESS,
  };
}

export {updateShippingAddress, ShippingAddressActionEnum, resetShippingAddress};
