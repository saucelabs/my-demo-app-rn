import AppScreen from './AppScreen';
import {locatorStrategy} from '../helpers/utils';

class CheckoutReviewOrderScreen extends AppScreen {
  constructor() {
    super(locatorStrategy('checkout review order screen'));
  }
}

export default new CheckoutReviewOrderScreen();
