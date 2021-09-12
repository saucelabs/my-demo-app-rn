import AppScreen from './AppScreen';
import {locatorStrategy} from '../helpers/utils';

class CheckoutAddressScreen extends AppScreen {
  constructor() {
    super(locatorStrategy('checkout address screen'));
  }
}

export default new CheckoutAddressScreen();
