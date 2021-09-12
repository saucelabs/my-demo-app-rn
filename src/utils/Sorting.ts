import {ItemInterface} from '../data/inventoryData';

export enum SORT_OPTIONS {
  NAME_ASC = 'nameAsc',
  NAME_DESC = 'nameDesc',
  PRICE_ASC = 'priceAsc',
  PRICE_DESC = 'priceDesc',
}
export type SortOptionType =
  | SORT_OPTIONS.NAME_ASC
  | SORT_OPTIONS.NAME_DESC
  | SORT_OPTIONS.PRICE_ASC
  | SORT_OPTIONS.PRICE_DESC;
export const SORT_IMAGES: {[key in SortOptionType]: number} = {
  [SORT_OPTIONS.NAME_ASC]: require('../assets/images/nameAsc.png'),
  [SORT_OPTIONS.NAME_DESC]: require('../assets/images/nameDesc.png'),
  [SORT_OPTIONS.PRICE_ASC]: require('../assets/images/priceAsc.png'),
  [SORT_OPTIONS.PRICE_DESC]: require('../assets/images/priceDesc.png'),
};

/**
 * Sort the data in different ways
 */
export function sortStoreData(
  data: ItemInterface[],
  sortOption: SortOptionType,
): ItemInterface[] {
  switch (sortOption) {
    case SORT_OPTIONS.NAME_ASC:
      return [...data].sort((a, b) => a.name.localeCompare(b.name));
    case SORT_OPTIONS.NAME_DESC:
      return [...data].sort((a, b) => b.name.localeCompare(a.name));
    case SORT_OPTIONS.PRICE_ASC:
      return [...data].sort((a, b) => Number(a.price) - Number(b.price));
    case SORT_OPTIONS.PRICE_DESC:
      return [...data].sort((a, b) => Number(b.price) - Number(a.price));
    default:
      return [...data].sort((a, b) => a.name.localeCompare(b.name));
  }
}
