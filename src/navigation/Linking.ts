import {ROUTES} from './Routes';
import {IS_IOS} from '../utils/Constants';

const screens = {
  [ROUTES.STORE_STACK_NAVIGATOR]: {
    screens: {
      [ROUTES.STORE]: 'store-overview',
      [ROUTES.PRODUCT]: {
        path: 'product-details/:id',
        parse: {
          id: (id: string) => `${id}`,
        },
      },
    },
  },
  [ROUTES.CART_STACK_NAVIGATOR]: {
    screens: {
      [ROUTES.CART]: {
        path: 'cart/:products?',
        parse: {
          products: (products: string) => `${products}`,
        },
      },
      [ROUTES.LOGIN]: 'login',
      [ROUTES.CHECKOUT_ADDRESS]: 'checkout-address',
      [ROUTES.CHECKOUT_PAYMENT]: 'checkout-payment',
      [ROUTES.CHECKOUT_REVIEW_ORDER]: {
        path: 'checkout-review-order/:products/:payment?',
        parse: {
          products: (products: string) => `${products}`,
        },
      },
      [ROUTES.CHECKOUT_COMPLETE]: 'checkout-complete',
    },
  },
  [ROUTES.MENU_STACK_NAVIGATOR]: {
    screens: {
      [ROUTES.WEBVIEW_SELECTION]: 'webview',
      [ROUTES.QR_CODE_SCANNER]: 'qr-code-scanner',
      [ROUTES.GEO_LOCATION]: 'geo-locations',
      [ROUTES.DRAWING]: 'drawing',
      [ROUTES.ABOUT]: 'about',
    },
  },
};
const config = {
  screens: IS_IOS ? {[ROUTES.TAB_NAVIGATOR]: {screens}} : screens,
};

const Linking = {
  prefixes: ['mydemoapprn://'],
  config,
};

export default Linking;
