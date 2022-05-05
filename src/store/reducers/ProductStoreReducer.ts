import {
  ProductStoreActionEnum as ACTIONS,
  ProductStoreActionType,
} from '../actions/ProductStoreActions';
import {ItemInterface, StoreData} from '../../data/inventoryData';
import {SORT_OPTIONS, SortOptionType, sortStoreData} from '../../utils/Sorting';
import {StateNameEnum, storeAsyncData} from '../Store';

export interface ProductStoreInterface {
  items: ItemInterface[];
  sortModalVisible: boolean;
  sortState: SortOptionType;
}

const initialProductStoreState: ProductStoreInterface = {
  items: sortStoreData(StoreData, SORT_OPTIONS.NAME_ASC),
  sortModalVisible: false,
  sortState: SORT_OPTIONS.NAME_ASC,
};
const productStoreReducer = (
  state = initialProductStoreState,
  action: ProductStoreActionType,
) => {
  switch (action.type) {
    case ACTIONS.UPDATE_STORE: {
      return action.products;
    }
    case ACTIONS.UPDATE_SORTING: {
      const newState = {
        ...state,
        items: sortStoreData(state.items, action.sortOption),
        sortModalVisible: !state.sortModalVisible,
        sortState: action.sortOption,
      };
      storeAsyncData(StateNameEnum.PRODUCTS, newState);

      return newState;
    }
    case ACTIONS.TOGGLE_SORT_MODAL: {
      return {
        ...state,
        sortModalVisible: !state.sortModalVisible,
      };
    }
    default:
      return state;
  }
};

export {productStoreReducer, initialProductStoreState};
