import {getTextOfElement, locatorStrategy} from '../helpers/utils';

class Counter {
  private get lower() {
    return $(locatorStrategy('counter minus button'));
  }

  private get amount() {
    return $(locatorStrategy('counter amount'));
  }

  private get add() {
    return $(locatorStrategy('counter plus button'));
  }

  async addOne() {
    await this.add.click();

    // We need to have a small pause so the internal state can be updated
    return driver.pause(750);
  }

  async lowerOne() {
    await this.lower.click();

    // We need to have a small pause so the internal state can be updated
    return driver.pause(750);
  }

  async getAmount(): Promise<number> {
    return parseInt(await getTextOfElement(await this.amount), 10);
  }
}

export default new Counter();
