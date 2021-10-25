import AppScreen from './AppScreen';
import {locatorStrategy} from '../helpers/utils';

class CheckoutPaymentScreen extends AppScreen {
  constructor() {
    super(locatorStrategy('checkout payment screen'));
  }
}

export default new CheckoutPaymentScreen();
