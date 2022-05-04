import {CartItemInterface, CartState} from '../store/reducers/CartReducer';

const myDemoApiUrl = 'https://my-demo-app.net/api';

async function executeApiCall(url: string, options?: RequestInit) {
  try {
    const response: any = await (await fetch(url, options)).json();

    return response;
  } catch (error: any) {
    // Ignore this for now
  }
}

async function initCall() {
  return executeApiCall(`${myDemoApiUrl}/init`);
}

async function removeSwagItem(item: CartItemInterface) {
  return executeApiCall(`${myDemoApiUrl}/remove-item`, {
    method: 'POST',
    body: JSON.stringify({
      item,
    }),
  });
}

async function checkoutProducts() {
  return executeApiCall(`${myDemoApiUrl}/checkout`, {
    method: 'POST',
    body: JSON.stringify({
      firstParam: 'dummy-value-one',
      secondParam: 'dummy-value-second',
    }),
  });
}

async function getSwagItem(id: number) {
  return executeApiCall(`${myDemoApiUrl}/item-load?id=${id}`, {
    method: 'GET',
  });
}

async function addSwagItem(item: CartItemInterface) {
  return executeApiCall(`${myDemoApiUrl}/add-item`, {
    method: 'POST',
    body: JSON.stringify({
      item,
    }),
  });
}

async function checkoutCart(cartContent: CartState) {
  return executeApiCall(`${myDemoApiUrl}/checkout`, {
    method: 'POST',
    body: JSON.stringify({
      cartContent,
    }),
  });
}

export {
  addSwagItem,
  checkoutCart,
  checkoutProducts,
  getSwagItem,
  initCall,
  removeSwagItem,
};
