import {ProductStoreInterface} from '../reducers/ProductStoreReducer';
import {SortOptionType} from '../../utils/Sorting';

enum ProductStoreActionEnum {
  UPDATE_STORE = 'UPDATE_STORE',
  TOGGLE_SORT_MODAL = 'TOGGLE_SORT_MODAL',
  UPDATE_SORTING = 'UPDATE_SORTING',
}

export type ProductStoreActionType =
  | {
      products: ProductStoreInterface;
      type: ProductStoreActionEnum.UPDATE_STORE;
    }
  | {
      sortOption: SortOptionType;
      type: ProductStoreActionEnum.UPDATE_SORTING;
    }
  | {
      type: ProductStoreActionEnum.TOGGLE_SORT_MODAL;
    };

/**
 * Update the complete product store
 */
function updateProductStore(products: ProductStoreInterface) {
  return {
    products,
    type: ProductStoreActionEnum.UPDATE_STORE,
  };
}

/**
 * Hide/show sort modal
 */
function updateSorting(sortOption: SortOptionType) {
  return {
    sortOption,
    type: ProductStoreActionEnum.UPDATE_SORTING,
  };
}

/**
 * Hide/show sort modal
 */
function toggleSortModal() {
  return {
    type: ProductStoreActionEnum.TOGGLE_SORT_MODAL,
  };
}

export {
  ProductStoreActionEnum,
  toggleSortModal,
  updateProductStore,
  updateSorting,
};
