import AppScreen from './AppScreen';
import {getTextOfElement, locatorStrategy} from '../helpers/utils';

export type ColorsType = 'black' | 'blue' | 'gray' | 'red';

class ItemDetailsScreen extends AppScreen {
  constructor() {
    super(locatorStrategy('product screen'));
  }

  private get containerHeader() {
    return $(locatorStrategy('container header'));
  }

  private get backButton() {
    return $(locatorStrategy('navigation back button'));
  }

  private color(color: ColorsType) {
    return $(locatorStrategy(`${color} circle`));
  }

  private get addToCartButton() {
    return $(locatorStrategy('Add To Cart button'));
  }

  async productName() {
    return getTextOfElement(await this.containerHeader);
  }

  async goBack() {
    return driver.isIOS ? this.backButton.click() : driver.back();
  }

  async addItemToCart() {
    await this.addToCartButton.click();

    // We need to have a small pause so the internal state can be updated
    return driver.pause(750);
  }

  async selectColor(color: ColorsType) {
    await this.color(color).click();

    // Add a hard pause so the state can be updated
    return driver.pause(750);
  }
}

export default new ItemDetailsScreen();
