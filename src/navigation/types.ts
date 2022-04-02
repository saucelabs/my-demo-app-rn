import {ROUTES} from './Routes';

export type RootDrawerParamList = {
  [ROUTES.TAB_NAVIGATOR]: undefined;
  [ROUTES.STORE_STACK_NAVIGATOR]: undefined;
  [ROUTES.CART_STACK_NAVIGATOR]: undefined;
  [ROUTES.MENU_STACK_NAVIGATOR]: undefined;
};

export type TabParamList = {
  [ROUTES.STORE_STACK_NAVIGATOR]: undefined;
  [ROUTES.CART_STACK_NAVIGATOR]: undefined;
  [ROUTES.MENU_STACK_NAVIGATOR]: undefined;
};

export type CartStackParamList = {
  [ROUTES.CART]: {params?: {products?: string}} | undefined;
  [ROUTES.LOGIN]: undefined;
  [ROUTES.CHECKOUT_ADDRESS]: undefined;
  [ROUTES.CHECKOUT_PAYMENT]: undefined;
  [ROUTES.CHECKOUT_REVIEW_ORDER]: {
    params: {products: string; payment?: string};
  };
  [ROUTES.CHECKOUT_COMPLETE]: undefined;
  [ROUTES.STORE_STACK_NAVIGATOR]: {
    screen: ROUTES.STORE;
  };
};

export type MenuStackParamList = {
  [ROUTES.WEBVIEW_SELECTION]: undefined;
  [ROUTES.WEBVIEW]: {uri: string};
  [ROUTES.QR_CODE_SCANNER]: undefined;
  [ROUTES.LOGIN]: {screen: ROUTES.STORE; stack: ROUTES.STORE_STACK_NAVIGATOR};
  [ROUTES.GEO_LOCATION]: undefined;
  [ROUTES.DRAWING]: undefined;
  [ROUTES.ABOUT]: undefined;
  [ROUTES.BIOMETRICS]: undefined;
  [ROUTES.SAUCE_BOT_VIDEO]: undefined;
  [ROUTES.STORE_STACK_NAVIGATOR]: {screen: ROUTES.STORE} | undefined;
};
export type StoreFlowStackParamList = {
  [ROUTES.STORE]: undefined;
  [ROUTES.PRODUCT]: {id: number};
};
