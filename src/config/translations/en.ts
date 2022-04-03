import {USERNAMES_ENUM, VALID_PASSWORD} from '../../utils/Constants';

export default {
  about: {
    goTo: 'Go to the Sauce Labs website.',
    header: 'About',
    versionBuild: 'V.{{version}}-build {{build}} by ',
    url: 'https://www.saucelabs.com',
    testId: 'about screen',
  },
  apiCalls: {
    header: 'API calls',
    testId: 'api calls screen',
  },
  sauceBotVideo: {
    header: 'SauceBot - The Beginning',
    testId: 'SauceBot screen',
  },
  biometrics: {
    androidHeader: 'FingerPrint',
    defaultHeader: 'Biometrics',
    iOSTouchIdHeader: 'TouchID',
    iOSFaceIdHeader: 'FaceID',
    description:
      'If your devices supports {{sensorType}} you can enable it here. This will help you to easily log in.',
    note: 'Normally this screen would be behind a secure login, but for demo purposes this screen has been put in the menu by default.',
    logInWith: 'Allow login with {{sensorType}}',
    biometricNotAvailableTitle: 'Error',
    biometricNotAvailableMessage:
      'Biometric authentication not available, please check your settings.',
    notAvailable:
      'Biometrics is or not supported or not enabled on your device. Please check your device or your settings.',
    testId: 'biometrics screen',
    switchTestId: 'biometrics switch',
    cancelButton: 'Cancel',
    biometricsButtonTestId: 'biometrics-button',
    promptMessage: 'Sign in with {{sensorType}}',
  },
  cart: {
    emptyCartHeader: 'No Items',
    emptyCartText:
      'Oh no! Your cart is empty. Fill it up with swag to complete your purchase.',
    emptyCartButtonText: 'Go Shopping',
    filledCartHeader: 'My Cart',
    filledCartButtonText: 'Proceed To Checkout',
    testId: 'cart screen',
  },
  checkoutFooter: {
    total: 'Total',
    item: 'item',
    items: 'items',
    totalNumberTestId: 'total number',
    totalPriceTestId: 'total price',
    testId: 'checkout footer',
  },
  login: {
    header: 'Login',
    subText:
      'Select a username and password from the list below, or click on the usernames to automatically populate the username and password.',
    usernameLabel: 'Username',
    passwordLabel: 'Password',
    submitButtonText: 'Login',
    errors: {
      password: 'Password is required',
      lockedOut: 'Sorry, this user has been locked out.',
      noMatch: 'Provided credentials do not match any user in this service.',
      username: 'Username is required',
    },
    passwordHeader: 'Password',
    usernamesHeader: 'Usernames',
    loginData: {
      standard: USERNAMES_ENUM.STANDARD_USER,
      locked: USERNAMES_ENUM.LOCKED_OUT_USER,
      password: VALID_PASSWORD,
    },
    testId: 'login screen',
    genericErrorMessageTestId: 'generic-error-message',
    autoFillTestId: '',
    lockedOut: '(locked out)',
  },
  checkoutAddress: {
    header: 'Checkout',
    subText: 'Enter a shipping address',
    submitButtonText: 'To Payment',
    testId: 'checkout address screen',
  },
  checkoutPayment: {
    header: 'Checkout',
    cardLabel: 'Card',
    subTitle: 'Enter a payment method',
    subText:
      'You will not be charged until you review your purchase on the next screen.',
    submitButtonText: 'Review Order',
    cardData: {
      fullName: {
        label: 'Full Name',
        placeholder: 'Rebecca Winter',
        errorMessage: 'Value looks invalid.',
      },
      card: {
        label: 'Card Number',
        placeholder: '3258 1265 7568 789',
        errorMessage: 'Value looks invalid.',
      },
      expDate: {
        label: 'Expiration Date',
        placeholder: '03/25',
        errorMessage: 'Value looks invalid.',
      },
      secCode: {
        label: 'Security Code',
        placeholder: '123',
        errorMessage: 'Value looks invalid.',
      },
    },
    cvcTooltip: 'CVV is the last three digits on the back of your credit card.',
    billingAddress: 'My billing address is the same as my shipping address.',
    testId: 'checkout payment screen',
  },
  checkoutReviewOrder: {
    header: 'Checkout',
    subTitle: 'Review your order',
    noElements: 'No elements in the cart.',
    deliveryAddressLabel: 'Delivery Address',
    paymentMethodLabel: 'Payment Method',
    dhlLabel: 'DHL Standard Delivery',
    arrival: 'Estimated to arrive within 3 weeks.',
    billingIsShipping: 'Billing address is the same as shipping address',
    billingAddressLabel: 'Billing Address',
    submitButtonText: 'Place Order',
    testId: 'checkout review order screen',
    deliveryAddressTestId: 'checkout delivery address',
    paymentInfoTestId: 'checkout payment info',
    billingAddressTestId: 'checkout billing address',
    deliveryDetailsTestId: 'checkout delivery details',
  },
  checkoutComplete: {
    header: 'Checkout Complete',
    submitButtonText: 'Continue Shopping',
    order: {
      lineOne: 'Thank you for your order',
      lineTwo: 'Your new swag is on its way',
      lineThree:
        'Your order has been dispatched and will arrive as fast as the pony gallops!',
    },
    testId: 'checkout complete screen',
  },
  shippingAddress: {
    fullName: {
      label: 'Full Name',
      errorMessage: 'Please provide your full name.',
      placeholder: 'Rebecca Winter',
    },
    addressLineOne: {
      label: 'Address Line 1',
      errorMessage: 'Please provide your address.',
      placeholder: 'Mandorley 112',
    },
    addressLineTwo: {
      label: 'Address Line 2',
      placeholder: 'Entrance 1',
    },
    city: {
      label: 'City',
      errorMessage: 'Please provide your city.',
      placeholder: 'Truro',
    },
    stateRegion: {
      label: 'State/Region',
      placeholder: 'Cornwall',
    },
    zipCode: {
      label: 'Zip Code',
      errorMessage: 'Please provide your zip code.',
      placeholder: '89750',
    },
    country: {
      label: 'Country',
      errorMessage: 'Please provide your country.',
      placeholder: 'United Kingdom',
    },
  },
  catalog: {
    header: 'Products',
    testId: 'products screen',
  },
  reviewModal: {
    closeButton: 'Close Modal',
    text: 'Thank you for submitting your review!',
    testId: 'review modal',
  },
  sortModal: {
    sortLabel: 'Sort by',
    nameAsc: 'Name - Ascending',
    nameDesc: 'Name - Descending',
    priceAsc: 'Price - Ascending',
    priceDesc: 'Price - Descending',
    activeOptionTestId: 'active option',
    testId: 'sort modal',
  },
  storeItem: {
    containerTestId: 'store item',
    priceTestId: 'store item price',
    textTestId: 'store item text',
  },
  footer: {
    text: 'Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy.',
  },
  drawing: {
    header: 'Drawing',
    clear: 'Clear',
    save: 'Save',
    ok: 'OK',
    cancel: 'CANCEL',
    saveDrawing: 'Save drawing',
    savedGallery: 'Drawing saved successfully to gallery',
    failedSave: 'Failed to save drawing',
    grantPermissionsMessage: 'Grant me permission to save the drawing',
    downloadPermissionsTitle: 'Drawing download permission',
    downloadPermissionsRequiredMessage:
      'Your permission is required to save the drawing to your device',
    androidPermissions: 'Android permissions',
    androidPermissionsFailed: 'Android permissions failed',
    testId: 'drawing screen',
  },
  geoLocation: {
    header: 'Geo Location',
    appium: 'You can use Appium to change them with ',
    appiumLink:
      'http://appium.io/docs/en/commands/session/geolocation/set-geolocation/',
    appiumThisLink: 'this link.',
    description:
      'Below you will find the latitude and longitude. This screen will automatically start with observing the location. You can manually disable/enable it by clicking on the buttons. It will automatically stop observing the location when you leave the screen.',
    androidPosition: 'Determining the position on Android can take a while.',
    dontUseLocation: "Don't Use Location",
    goToSettings: 'Go to Settings',
    denied: 'Location permission denied',
    latitude: 'Latitude',
    longitude: 'Longitude',
    userDenied: 'Location permission denied by user.',
    userRevoked: 'Location permission revoked by user.',
    startObserving: 'Start Observing',
    stopObserving: 'Stop Observing',
    unableOpenSettings: 'Unable to open settings',
    turnOn:
      'Turn on Location Services to allow "{{appName}}" to determine your location.',
    latitudeTestId: 'latitude data',
    longitudeTestId: 'longitude data',
    testId: 'geo location screen',
  },
  counter: {
    counterAmountTestId: 'counter amount',
    minusTestId: 'counter minus button',
    plusTestId: 'counter plus button',
  },
  productPage: {
    addToCart: 'Add To Cart',
    highlights: 'Product Highlights',
    testId: 'product screen',
    priceTestId: 'product price',
    labelTestId: 'product label',
    descriptionTestId: 'product description',
    unknownProductDescription: "Oops! We can't find\nyour product.",
    buttonText: 'Go to Catalog',
  },
  qrCode: {
    header: 'QR Code Scanner',
    errorOccurred: 'An error occurred',
    lineOne: 'Scan a QR Code that contains a url.',
    lineTwo: 'It will be opened in the default browser.',
    notValidUrl: '"{{url}}" is not a valid url',
    testId: 'qr code screen',
  },
  webview: {
    error: "An error occurred loading the url '{{uri}}'.",
    testId: 'webview screen',
  },
  webviewSelection: {
    header: 'Webview',
    error: "An error occurred loading the url '{{uri}}'.",
    inputLabel: 'URL',
    inputErrorMessage: 'Please provide a correct https url.',
    inputPlaceholder: 'https://www.website.com',
    text: 'Enter an HTTPS url.',
    submitButtonText: 'Go To Site',
    testId: 'webview selection screen',
  },
  navigationBackButton: {
    testId: 'navigation back button',
  },
  reviewIcon: {
    testId: 'review star',
  },
  colorCircle: {
    testId: 'circle',
  },
  inputField: {
    testId: 'input field',
    errorMessageTestId: 'error-message',
  },
  button: {
    testId: 'button',
  },
  autofill: {
    testId: 'autofill',
  },
  sortButton: {
    testId: 'sort button',
  },
  cartBadge: {
    testId: 'cart badge',
  },
  productRow: {
    color: 'Color',
    removeItem: 'Remove Item',
    removeItemTestId: 'remove item',
    productLabelTestId: 'product label',
    productPriceTestId: 'product price',
    testId: 'product row',
  },
  checkbox: {
    testId: 'checkbox for',
  },
  containerHeader: {
    testId: 'container header',
  },
  tabBar: {
    catalog: {
      label: 'Catalog',
      testId: 'tab bar option catalog',
    },
    cart: {
      label: 'Cart',
      testId: 'tab bar option cart',
    },
    menu: {
      label: 'Menu',
      testId: 'tab bar option menu',
    },
  },
  drawer: {
    webview: {
      label: 'Webview',
      testId: 'menu item webview',
    },
    qrCode: {
      label: 'QR Code Scanner',
      testId: 'menu item qr code scanner',
    },
    geoLocation: {
      label: 'Geo Location',
      testId: 'menu item geo location',
    },
    drawing: {
      label: 'Drawing',
      testId: 'menu item drawing',
    },
    about: {
      label: 'About',
      testId: 'menu item about',
    },
    reportABug: {
      label: 'Report A Bug',
      testId: 'menu item report a bug',
    },
    catalog: {
      label: 'Catalog',
      testId: 'menu item catalog',
    },
    reset: {
      label: 'Reset App State',
      cancel: 'Cancel',
      ok: 'Reset App',
      resetSuccessful: 'App State has been reset.',
      areYouSure: 'Are you sure you sure you want to reset the app state?',
      testId: 'menu item reset app',
    },
    logIn: {
      label: 'Log In',
      testId: 'menu item log in',
    },
    biometrics: {
      androidLabel: 'FingerPrint',
      iOSTouchIdLabel: 'TouchID',
      defaultHeader: 'Biometrics',
      iOSFaceIdLabel: 'FaceID',
      testId: 'menu item biometrics',
    },
    logOut: {
      label: 'Log Out',
      cancel: 'Cancel',
      resetSuccessful: 'You are successfully logged out.',
      areYouSure: 'Are you sure you sure you want to logout?',
      testId: 'menu item log out',
    },
    closeMenu: {
      testId: 'close menu',
    },
    openMenu: {
      testId: 'open menu',
    },
    sauceBotVideo: {
      label: 'Sauce Bot Video',
      testId: 'menu item sauce bot video',
    },
    apiCalls: {
      label: 'Api Calls',
      testId: 'menu item api calls',
    },
  },
};
