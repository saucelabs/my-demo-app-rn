import {CartItemInterface} from '../reducers/CartReducer';

enum CartActionEnum {
  ADD_TO_CART = 'ADD_TO_CART',
  REMOVE_FROM_CART = 'REMOVE_FROM_CART',
  DELETE_FROM_CART = 'DELETE_FROM_CART',
  RESET_CART = 'RESET_CART',
}

export type CartActionType =
  | {
      selectedProduct: CartItemInterface;
      type: CartActionEnum.ADD_TO_CART;
    }
  | {
      selectedProduct: CartItemInterface;
      type: CartActionEnum.REMOVE_FROM_CART;
    }
  | {
      selectedProduct: CartItemInterface;
      type: CartActionEnum.DELETE_FROM_CART;
    }
  | {
      type: CartActionEnum.RESET_CART;
    };

/**
 * Add product to cart
 */
function addProductToCart(selectedProduct: CartItemInterface) {
  return {
    selectedProduct,
    type: CartActionEnum.ADD_TO_CART,
  };
}

/**
 * Remove product from cart
 */
function removeProductFromCart(selectedProduct: CartItemInterface) {
  return {
    selectedProduct,
    type: CartActionEnum.REMOVE_FROM_CART,
  };
}

/**
 * Delete product from cart
 */
function deleteProductFromCart(selectedProduct: CartItemInterface) {
  return {
    selectedProduct,
    type: CartActionEnum.DELETE_FROM_CART,
  };
}

/**
 * Reset cart
 */
function resetCart() {
  return {
    type: CartActionEnum.RESET_CART,
  };
}

export {
  addProductToCart,
  CartActionEnum,
  removeProductFromCart,
  deleteProductFromCart,
  resetCart,
};
