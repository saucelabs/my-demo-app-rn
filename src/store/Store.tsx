import React, {createContext, useEffect, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CartActionType,
  resetCart,
  setInitialCartState,
} from './actions/CartActions';
import {cartReducer, initialCartState, CartState} from './reducers/CartReducer';
import {
  initialProductStoreState,
  ProductStoreInterface,
  productStoreReducer,
} from './reducers/ProductStoreReducer';
import {
  ProductStoreActionType,
  updateProductStore,
} from './actions/ProductStoreActions';
import {
  initialShippingAddressState,
  ShippingAddressInterface,
  shippingAddressReducer,
} from './reducers/ShippingAddressReducer';
import {
  resetShippingAddress,
  ShippingAddressActionType,
  updateShippingAddress,
} from './actions/ShippingAddressActions';
import {
  CardDetailsInterface,
  cardDetailsReducer,
  initialCardDetailsState,
} from './reducers/CardDetailsReducer';
import {
  CardDetailsActionType,
  resetCardDetails,
  updateCardDetails,
} from './actions/CardDetailsActions';
import {
  AuthenticationInterface,
  authenticationReducer,
  initialAuthenticationState,
} from './reducers/AuthenticationReducer';
import {
  AuthenticationActionType,
  enableBiometrics,
  getBiometricsData,
  updateAuthenticationState,
} from './actions/AuthenticationActions';

export type DispatchType = React.Dispatch<any>;
export enum StateNameEnum {
  AUTHENTICATION = 'authentication',
  CARD_DETAILS = 'cardDetails',
  CART_CONTENT = 'cartContent',
  PRODUCTS = 'products',
  SHIPPING_ADDRESS = 'shippingAddress',
}

interface InitialStoreStateInterface {
  [StateNameEnum.AUTHENTICATION]: AuthenticationInterface;
  [StateNameEnum.CARD_DETAILS]: CardDetailsInterface;
  [StateNameEnum.CART_CONTENT]: CartState;
  [StateNameEnum.PRODUCTS]: ProductStoreInterface;
  [StateNameEnum.SHIPPING_ADDRESS]: ShippingAddressInterface;
}

const initialState: InitialStoreStateInterface = {
  [StateNameEnum.AUTHENTICATION]: initialAuthenticationState,
  [StateNameEnum.CARD_DETAILS]: initialCardDetailsState,
  [StateNameEnum.CART_CONTENT]: initialCartState,
  [StateNameEnum.PRODUCTS]: initialProductStoreState,
  [StateNameEnum.SHIPPING_ADDRESS]: initialShippingAddressState,
};
const getAsyncState = async (dispatch: DispatchType) => {
  try {
    // Get all current async storage keys
    const authenticationData = await AsyncStorage.getItem(
      StateNameEnum.AUTHENTICATION,
    );
    const cardDetails = await AsyncStorage.getItem(StateNameEnum.CARD_DETAILS);
    const cartContent = await AsyncStorage.getItem(StateNameEnum.CART_CONTENT);
    const products = await AsyncStorage.getItem(StateNameEnum.PRODUCTS);
    const shippingAddress = await AsyncStorage.getItem(
      StateNameEnum.SHIPPING_ADDRESS,
    );

    // Update the state with the retrieved / initial data
    dispatch(
      updateAuthenticationState(
        authenticationData
          ? JSON.parse(authenticationData)
          : initialAuthenticationState,
      ),
    );
    dispatch(
      updateProductStore(
        products ? JSON.parse(products) : initialProductStoreState,
      ),
    );
    dispatch(
      updateCardDetails(
        cardDetails ? JSON.parse(cardDetails) : initialCardDetailsState,
      ),
    );
    dispatch(
      setInitialCartState(
        cartContent ? JSON.parse(cartContent) : initialCartState,
      ),
    );
    dispatch(
      updateShippingAddress(
        shippingAddress
          ? JSON.parse(shippingAddress)
          : initialShippingAddressState,
      ),
    );
  } catch (e) {
    console.log('Failed to fetch the data from storage');
  }
};
const resetStore = async (dispatch: DispatchType) => {
  dispatch(updateProductStore(initialProductStoreState));
  dispatch(resetCart());
  dispatch(resetCardDetails());
  dispatch(resetShippingAddress());
  dispatch(enableBiometrics(false));
  await AsyncStorage.clear();
};
const storeAsyncData = async function <T>(
  stateName: StateNameEnum,
  asyncStoreState: T,
) {
  try {
    await AsyncStorage.setItem(stateName, JSON.stringify(asyncStoreState));
  } catch (e) {
    console.log(`Error for storing '${stateName}' to Async Storage = `, e);
  }
};
const StoreContext = createContext<{
  state: InitialStoreStateInterface;
  dispatch: DispatchType;
}>({
  state: initialState,
  dispatch: () => null,
});
const mainReducer = (
  {
    authentication,
    cardDetails,
    cartContent,
    products,
    shippingAddress,
  }: InitialStoreStateInterface,
  action:
    | AuthenticationActionType
    | CardDetailsActionType
    | CartActionType
    | ProductStoreActionType
    | ShippingAddressActionType,
) => ({
  [StateNameEnum.AUTHENTICATION]: authenticationReducer(
    authentication,
    action as AuthenticationActionType,
  ),
  [StateNameEnum.CARD_DETAILS]: cardDetailsReducer(
    cardDetails,
    action as CardDetailsActionType,
  ),
  [StateNameEnum.CART_CONTENT]: cartReducer(
    cartContent,
    action as CartActionType,
  ),
  [StateNameEnum.PRODUCTS]: productStoreReducer(
    products,
    action as ProductStoreActionType,
  ),
  [StateNameEnum.SHIPPING_ADDRESS]: shippingAddressReducer(
    shippingAddress,
    action as ShippingAddressActionType,
  ),
});
const StoreProvider: React.FC = ({children}) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  // Loading initial state
  useEffect(() => {
    (async () => {
      await getAsyncState(dispatch);
      await getBiometricsData(dispatch);
    })();
  }, []);

  return (
    <StoreContext.Provider value={{state, dispatch}}>
      {children}
    </StoreContext.Provider>
  );
};

export {resetStore, storeAsyncData, StoreContext, StoreProvider};
