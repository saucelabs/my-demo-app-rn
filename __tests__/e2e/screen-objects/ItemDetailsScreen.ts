import AppScreen from './AppScreen';
import {getTextOfElement, locatorStrategy} from '../helpers/utils';
import {findElementBySwipe} from '../helpers/gestures';

export type ColorsType = 'black' | 'blue' | 'gray' | 'red';

const productScreenSelector = 'product screen';

class ItemDetailsScreen extends AppScreen {
  constructor() {
    super(locatorStrategy(productScreenSelector));
  }

  private get productScreen() {
    return $(locatorStrategy(productScreenSelector));
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
    await (
      await findElementBySwipe({
        element: await this.addToCartButton,
        scrollableElement: await this.productScreen,
      })
    )?.click();

    // We need to have a small pause so the internal state can be updated
    return driver.pause(750);
  }

  async selectColor(color: ColorsType) {
    await (
      await findElementBySwipe({
        element: await this.color(color),
        scrollableElement: await this.productScreen,
      })
    )?.click();

    // Add a hard pause so the state can be updated
    return driver.pause(750);
  }
}

export default new ItemDetailsScreen();
