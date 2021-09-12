import {
  CartActionEnum as ACTIONS,
  CartActionType,
} from '../actions/CartActions';
import {ITEM_COLOR_TYPE, ItemInterface} from '../../data/inventoryData';

export interface ItemIdentifierInterface {
  color: ITEM_COLOR_TYPE;
  id: number;
}

export interface ItemStateInterface extends ItemIdentifierInterface {
  amount: number;
}

export interface CartItemInterface extends ItemInterface {
  amount: number;
  selectedColor: ITEM_COLOR_TYPE;
}

export interface CartState {
  items: CartItemInterface[];
  totalAmount: number;
  totalPrice: number;
}

const initialCartState: CartState = {
  items: [],
  totalAmount: 0,
  totalPrice: 0,
};
const cartReducer = (state = initialCartState, action: CartActionType) => {
  switch (action.type) {
    case ACTIONS.ADD_TO_CART: {
      let {totalAmount, totalPrice} = state;
      let added = false;
      const {selectedProduct} = action;
      const updatedItems = state.items.map(item => {
        if (
          item.selectedColor === selectedProduct.selectedColor &&
          item.id === selectedProduct.id
        ) {
          added = true;
          totalAmount = totalAmount + selectedProduct.amount;
          totalPrice = totalPrice + selectedProduct.price;
          return {
            ...item,
            amount: item.amount + selectedProduct.amount,
          };
        }

        return item;
      });

      return {
        ...state,
        items: added ? updatedItems : updatedItems.concat(selectedProduct),
        totalAmount: added ? totalAmount : totalAmount + selectedProduct.amount,
        totalPrice: added
          ? totalPrice
          : totalPrice + selectedProduct.amount * selectedProduct.price,
      };
    }
    case ACTIONS.REMOVE_FROM_CART: {
      const {
        selectedProduct: {amount, selectedColor, id, price},
      } = action;
      let {totalAmount, totalPrice} = state;
      let removed = false;
      const updatedItems = state.items.map(item => {
        if (
          item.selectedColor === selectedColor &&
          item.id === id &&
          item.amount > 1
        ) {
          removed = true;
          totalAmount = totalAmount - amount;
          totalPrice = totalPrice - item.price;
          return {
            ...item,
            amount: item.amount - 1,
          };
        }

        return item;
      });

      return {
        ...state,
        items: removed
          ? updatedItems
          : updatedItems.filter(
              item => !(item.id === id && item.selectedColor === selectedColor),
            ),
        totalAmount: removed ? totalAmount : totalAmount - amount,
        totalPrice: removed ? totalPrice : totalPrice - amount * price,
      };
    }
    case ACTIONS.DELETE_FROM_CART: {
      const {
        selectedProduct: {amount, id, price, selectedColor},
      } = action;
      const {totalAmount, totalPrice} = state;

      return {
        ...state,
        items: state.items.filter(
          item => !(item.id === id && item.selectedColor === selectedColor),
        ),
        totalAmount: totalAmount - amount,
        totalPrice: totalPrice - price * amount,
      };
    }
    case ACTIONS.RESET_CART:
      return initialCartState;
    default:
      return state;
  }
};

export {cartReducer, initialCartState};
