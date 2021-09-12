import CatalogScreen from '../../screen-objects/CatalogScreen';
import {restartApp} from '../../helpers/utils';
import ItemDetailsScreen from '../../screen-objects/ItemDetailsScreen';
import Menu from '../../screen-objects/Menu';
import ReviewComponent from '../../screen-objects/ReviewComponent';
import Counter from '../../screen-objects/CounterObject';

describe('Item Details', () => {
  beforeEach(async () => {
    // Restart the app before each session, only not for the first session
    await restartApp();
    await CatalogScreen.waitForIsShown();
  });

  it('should be able to navigate back', async () => {
    await CatalogScreen.openSwagItem('Backpack');
    await ItemDetailsScreen.waitForIsShown();

    await expect(await CatalogScreen.isShown()).toBeFalsy();

    await ItemDetailsScreen.goBack();
    await CatalogScreen.waitForIsShown();

    await expect(await ItemDetailsScreen.isShown()).toBeFalsy();
  });

  it('should be able submit a review', async () => {
    await CatalogScreen.openSwagItem('Backpack');
    await ItemDetailsScreen.waitForIsShown();
    await ReviewComponent.submitReview(1);
    await ReviewComponent.waitForReviewModalIsShown();
    await ReviewComponent.closeReviewModal();
    await ReviewComponent.waitForReviewModalIsShown(false);

    await expect(await ReviewComponent.reviewModalIsShown()).toBeFalsy();
  });

  it('should be able add items to the cart', async () => {
    await CatalogScreen.openSwagItem('Backpack');
    await ItemDetailsScreen.waitForIsShown();

    // Verify it's empty
    await expect(await Menu.getCartAmount()).toEqual(0);

    // Add 1 item to the cart with the Add to cart button
    await ItemDetailsScreen.addItemToCart();
    await expect(await Menu.getCartAmount()).toEqual(1);
  });

  it('should be able validate the counter', async () => {
    await CatalogScreen.openSwagItem('Backpack');
    await ItemDetailsScreen.waitForIsShown();

    // Verify it's empty
    await expect(await Menu.getCartAmount()).toEqual(0);

    // Add 2 extra items to the cart with the plus button
    await Counter.addOne();
    await expect(await Counter.getAmount()).toEqual(2);
    await ItemDetailsScreen.addItemToCart();
    await expect(await Menu.getCartAmount()).toEqual(2);

    // Add 1 extra items to the cart with the minus button
    await Counter.lowerOne();
    await expect(await Counter.getAmount()).toEqual(1);
    await ItemDetailsScreen.addItemToCart();
    await expect(await Menu.getCartAmount()).toEqual(3);

    // Add 0 extra items to the cart with the minus button
    await Counter.lowerOne();
    await expect(await Counter.getAmount()).toEqual(0);
    await ItemDetailsScreen.addItemToCart();
    await expect(await Menu.getCartAmount()).toEqual(3);

    // You can't go passed 0
    await Counter.lowerOne();
    await expect(await Counter.getAmount()).toEqual(0);
    await ItemDetailsScreen.addItemToCart();
    await expect(await Menu.getCartAmount()).toEqual(3);
  });
});
