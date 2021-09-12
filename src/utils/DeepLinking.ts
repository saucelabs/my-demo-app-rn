import {ITEM_COLORS, ItemInterface} from '../data/inventoryData';
import {CartItemInterface} from '../store/reducers/CartReducer';

type FoundDeepLinkItem = {
  id?: number;
  amount?: number;
  color?: string;
};

const parseDeepLinkData = (
  // The format will look like this `id=2\&amount=2\&color=black,id=\&amount=5\&color=`
  deeplinkData: string,
  items: ItemInterface[],
): CartItemInterface[] => {
  // 1. Split the string into multiple products
  const products = deeplinkData.split(',');
  const deepLinkItems: FoundDeepLinkItem[] = [];
  // 2. Walk over each found product and...
  products.forEach((product: string) => {
    // 2a. Get the caps, which can be `id`, `amount` and `color`
    const caps = product.split('&');
    const deepLinkItem: FoundDeepLinkItem = {};
    const validateString = (
      property: string,
      needle: string,
      isNumber: boolean,
    ) =>
      property.includes(needle) &&
      (isNumber
        ? parseInt(property.split(needle)[1], 10)
        : property.split(needle)[1]);
    // 2b. Validate each cap and add them as a cap object in the deepLinkItem array
    caps.forEach((property: string) => {
      if (validateString(property, 'id=', true)) {
        deepLinkItem.id = parseInt(property.split('id=')[1], 10);
      }
      if (validateString(property, 'amount=', true)) {
        deepLinkItem.amount = parseInt(property.split('amount=')[1], 10);
      }
      if (validateString(property, 'color=', false)) {
        deepLinkItem.color = property.split('color=')[1];
      }
    });
    deepLinkItems.push(deepLinkItem);
  });

  // 3. Return the filtered array
  return filterDeepLinkItems(deepLinkItems, items);
};
const filterDeepLinkItems = (
  deepLinkItems: FoundDeepLinkItem[],
  items: ItemInterface[],
) => {
  return (
    deepLinkItems
      // 1. first filter out the items that don't have a `valid` id in the object
      .filter(item => item.id)
      // 2. Construct a new cart item product
      .map(filteredItem => {
        // 2a. Find the matching product
        const selectedProduct = items.filter(
          product => product.id === filteredItem.id,
        )[0];
        // 2b. Find the valid color, otherwise default back
        const color =
          filteredItem.color &&
          Object.values(ITEM_COLORS).includes(filteredItem.color as ITEM_COLORS)
            ? (filteredItem.color as ITEM_COLORS)
            : selectedProduct.defaultColor;

        // 2c. Return the new cart item with correct color and amount
        return {
          ...selectedProduct,
          amount: filteredItem.amount || 1,
          selectedColor: color,
        };
      })
  );
};

export {parseDeepLinkData};
