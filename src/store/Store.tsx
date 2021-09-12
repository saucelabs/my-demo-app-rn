import React, {createContext, useEffect, useReducer} from 'react';
import {CartActionType} from './actions/CartActions';
import {cartReducer, initialCartState, CartState} from './reducers/CartReducer';
import {
  initialProductStoreState,
  ProductStoreInterface,
  productStoreReducer,
} from './reducers/ProductStoreReducer';
import {ProductStoreActionType} from './actions/ProductStoreActions';
import {
  initialShippingAddressState,
  ShippingAddressInterface,
  shippingAddressReducer,
} from './reducers/ShippingAddressReducer';
import {ShippingAddressActionType} from './actions/ShippingAddressActions';
import {
  CardDetailsInterface,
  cardDetailsReducer,
  initialCardDetailsState,
} from './reducers/CardDetailsReducer';
import {CardDetailsActionType} from './actions/CardDetailsActions';
import {
  AuthenticationInterface,
  authenticationReducer,
  initialAuthenticationState,
} from './reducers/AuthenticationReducer';
import {
  AuthenticationActionType,
  updateBiometricSettings,
} from './actions/AuthenticationActions';
import ReactNativeBiometrics from 'react-native-biometrics';

interface InitialStoreStateInterface {
  authentication: AuthenticationInterface;
  cartContent: CartState;
  products: ProductStoreInterface;
  shippingAddress: ShippingAddressInterface;
  cardDetails: CardDetailsInterface;
}

type DispatchType = React.Dispatch<any>;

const initialState: InitialStoreStateInterface = {
  authentication: initialAuthenticationState,
  cartContent: initialCartState,
  products: initialProductStoreState,
  shippingAddress: initialShippingAddressState,
  cardDetails: initialCardDetailsState,
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
    cartContent,
    products,
    shippingAddress,
    cardDetails,
  }: InitialStoreStateInterface,
  action:
    | AuthenticationActionType
    | CartActionType
    | ProductStoreActionType
    | ShippingAddressActionType
    | CardDetailsActionType,
) => ({
  authentication: authenticationReducer(
    authentication,
    action as AuthenticationActionType,
  ),
  cartContent: cartReducer(cartContent, action as CartActionType),
  products: productStoreReducer(products, action as ProductStoreActionType),
  shippingAddress: shippingAddressReducer(
    shippingAddress,
    action as ShippingAddressActionType,
  ),
  cardDetails: cardDetailsReducer(cardDetails, action as CardDetailsActionType),
});
const StoreProvider: React.FC = ({children}) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  useEffect(() => {
    ReactNativeBiometrics.isSensorAvailable().then(
      ({available, biometryType}) =>
        // @ts-ignore
        dispatch(updateBiometricSettings(biometryType, available)),
    );
  }, []);

  return (
    <StoreContext.Provider value={{state, dispatch}}>
      {children}
    </StoreContext.Provider>
  );
};

export {StoreContext, StoreProvider};
