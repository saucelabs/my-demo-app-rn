import {USERNAMES_ENUM, VALID_PASSWORD} from '../../utils/Constants';

export default {
  about: {
    goTo: 'Sauce Labs की वेबसाइट पर जाएं।',
    header: 'जानकारी',
    versionBuild: 'V.{{version}}-build {{build}} by ',
    url: 'https://www.saucelabs.com',
    testId: 'about screen',
  },
  biometrics: {
    androidHeader: 'फिंगरप्रिंट',
    defaultHeader: 'बॉयोमीट्रिक्स',
    iOSTouchIdHeader: 'FaceId',
    iOSFaceIdHeader: 'TouchId',
    description:
      'अगर आपके उपकरण {{sensor Type}} को सपोर्ट करते हैं तो आप इसे यहां सक्षम कर सकते हैं। इससे आप आसानी से लॉग इन कर पाएंगे।',
    note: 'आम तौर पर यह स्क्रीन एक सुरक्षित लॉगिन के पीछे होगी, लेकिन डेमो उद्देश्यों के लिए इस स्क्रीन को डिफ़ॉल्ट रूप से यहां रखा गया है।',
    logInWith: 'Allow login with {{sensorType}}',
    biometricNotAvailableTitle: 'एरर',
    biometricNotAvailableMessage:
      'बायोमेट्रिक पुष्टीकरण उपलब्ध नहीं है, कृपया अपनी सेटिंग जांचें।',
    notAvailable:
      'आपके डिवाइस पर बायोमेट्रिक्स समर्थित है या नहीं या सक्षम नहीं है। कृपया अपने डिवाइस या अपनी सेटिंग्स की जांच करें।',
    testId: 'biometrics screen',
    switchTestId: 'biometrics switch',
    cancelButton: 'रद्द करें',
    biometricsButtonTestId: 'biometrics-button',
    promptMessage: '{{sensorType}} से साइन इन करें',
  },
  cart: {
    emptyCartHeader: 'यहाँ कोई वस्तु नहीं है',
    emptyCartText:
      'आपका कार्ट खाली है। अपनी खरीदारी को पूरा करने के लिए इसे वस्तु से भरें।',
    emptyCartButtonText: 'खरीदारी करें',
    filledCartHeader: 'मेरा कार्ट',
    filledCartButtonText: 'चेकआउट के लिए आगे बढ़ें',
    testId: 'cart screen',
  },
  checkoutFooter: {
    total: 'टोटल',
    item: 'वस्तु',
    items: 'वस्तुओं',
    totalNumberTestId: 'total number',
    totalPriceTestId: 'total price',
    testId: 'checkout footer',
  },
  login: {
    header: 'Login',
    subText:
      'नीचे दी गई सूची से एक उपयोगकर्ता नाम और पासवर्ड का चयन करें, या उपयोगकर्ता नाम और पासवर्ड को स्वचालित रूप से भरने के लिए उपयोगकर्ता नाम पर क्लिक करें।',
    usernameLabel: 'यूजर का नाम',
    passwordLabel: 'पासवर्ड',
    submitButtonText: 'लॉग-इन',
    errors: {
      password: 'अपना पासवर्ड डालें',
      lockedOut: 'क्षमा करें, इस प्रयोक्ता को लॉक कर दिया गया है।',
      noMatch: 'दिए गए क्रेडेंशियल इस सेवा के किसी भी उपयोगकर्ता से मेल नहीं खाते।',
      username: 'आपके यूजर का नाम डालें',
    },
    passwordHeader: 'पासवर्ड',
    usernamesHeader: 'यूजर के नाम',
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
    header: 'चेक आउट',
    subText: 'डिलिवरी का पता दर्ज करें',
    submitButtonText: 'भुगतान करने के लिए',
    testId: 'checkout address screen',
  },
  checkoutPayment: {
    header: 'चेक आउट',
    cardLabel: 'कार्ड',
    subTitle: 'भुगतान का तरीका दर्ज करें',
    subText:
      'जब तक आप अगली स्क्रीन पर अपनी खरीदारी की समीक्षा नहीं करते, तब तक आपसे शुल्क नहीं लिया जाएगा।',
    submitButtonText: 'समीक्षा आदेश',
    cardData: {
      fullName: {
        label: 'पूरा नाम',
        placeholder: 'Rebecca Winter',
        errorMessage: 'डेटा गलत लग रहा है',
      },
      card: {
        label: 'कार्ड नंबर',
        placeholder: '3258 1265 7568 789',
        errorMessage: 'डेटा गलत लग रहा है',
      },
      expDate: {
        label: 'समाप्ति तिथि',
        placeholder: '03/25',
        errorMessage: 'डेटा गलत लग रहा है',
      },
      secCode: {
        label: 'सुरक्षा कोड',
        placeholder: '123',
        errorMessage: 'डेटा गलत लग रहा है',
      },
    },
    cvcTooltip: 'CVV आपके क्रेडिट कार्ड के पीछे अंतिम तीन अंक होते हैं।',
    billingAddress: 'मेरा बिलिंग पता मेरे वितरण पते के समान है।',
    testId: 'checkout payment screen',
  },
  checkoutReviewOrder: {
    header: 'चेक आउट',
    subTitle: 'समीक्षा आदेश',
    noElements: 'आपका कार्ट खाली है।',
    deliveryAddressLabel: 'डिलिवरी का पता',
    paymentMethodLabel: 'भुगतान का तरीका',
    dhlLabel: 'DHL साधारण डिलीवरी',
    arrival: '3 सप्ताह के भीतर आने का अनुमान है।',
    billingIsShipping: 'बिलिंग पता शिपिंग पते के समान है',
    billingAddressLabel: 'बिल भेजने का पता',
    submitButtonText: 'प्लेस ऑर्डर',
    testId: 'checkout review order screen',
    deliveryAddressTestId: 'checkout delivery address',
    paymentInfoTestId: 'checkout payment info',
    billingAddressTestId: 'checkout billing address',
    deliveryDetailsTestId: 'checkout delivery details',
  },
  checkoutComplete: {
    header: 'चेकआउट पूरा',
    submitButtonText: 'खरीदारी जारी रखें',
    order: {
      lineOne: 'आपके ऑर्डर के लिए धन्यवाद',
      lineTwo: 'आपका नया स्वैग आ रहा है',
      lineThree:
        'आपका आदेश भेज दिया गया है और जल्द ही आ जाएगा!',
    },
    testId: 'checkout complete screen',
  },
  shippingAddress: {
    fullName: {
      label: 'पूरा नाम',
      errorMessage: 'कृपया अपना पूरा नाम बताएं।',
      placeholder: 'Rebecca Winter',
    },
    addressLineOne: {
      label: 'पता पंक्ति 1',
      errorMessage: 'कृपया अपना पता बताएं।।',
      placeholder: 'Mandorley 112',
    },
    addressLineTwo: {
      label: 'पता पंक्ति 2',
      placeholder: 'Entrance 1',
    },
    city: {
      label: 'शहर',
      errorMessage: 'कृपया अपना शहर बताएं।',
      placeholder: 'Truro',
    },
    stateRegion: {
      label: 'राज्य/क्षेत्र',
      placeholder: 'Cornwall',
    },
    zipCode: {
      label: 'पिन कोड',
      errorMessage: 'कृपया अपना ज़िप कोड प्रदान करें।',
      placeholder: '89750',
    },
    country: {
      label: 'देश',
      errorMessage: 'कृपया अपना देश बताएं।',
      placeholder: 'United Kingdom',
    },
  },
  catalog: {
    header: 'उत्पाद',
    testId: 'products screen',
  },
  reviewModal: {
    closeButton: 'मोडल बंद करें',
    text: 'अपनी समीक्षा सबमिट करने के लिए धन्यवाद!',
    testId: 'review modal',
  },
  sortModal: {
    sortLabel: 'इसके अनुसार क्रमबद्ध करें',
    nameAsc: 'नाम - चढ़ते क्रम में',
    nameDesc: 'नाम - उतरते क्रम में',
    priceAsc: 'मूल्य - चढ़ते क्रम में',
    priceDesc: 'मूल्य - उतरते क्रम में',
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
    header: 'चित्रकारी',
    clear: 'साफ़ करें',
    save: 'सेव',
    ok: 'ओके',
    cancel: 'रद्द करें',
    saveDrawing: 'ड्राइंग सेव करे',
    savedGallery: 'ड्राइंग गैलरी में सफलतापूर्वक सहेजा गया',
    failedSave: 'ड्राइंग सहेजने में विफल',
    grantPermissionsMessage: 'मुझे ड्राइंग सहेजने की अनुमति दें',
    downloadPermissionsTitle: 'ड्रॉइंग डाउनलोड की अनुमति',
    downloadPermissionsRequiredMessage:
      'ड्राइंग को अपने डिवाइस में सहेजने के लिए आपकी अनुमति आवश्यक है',
    androidPermissions: 'Android permissions',
    androidPermissionsFailed: 'Android permissions failed',
    testId: 'drawing screen',
  },
  geoLocation: {
    header: 'भौगोलिक स्थिति',
    appium: 'आप इसे बदलने के लिए Appium का उपयोग कर सकते हैं',
    appiumLink:
      'http://appium.io/docs/en/commands/session/geolocation/set-geolocation/',
    appiumThisLink: 'यह लिंक।',
    description:
      'नीचे आपको अक्षांश और देशांतर मिलेगा। यह स्क्रीन अपने आप लोकेशन देखने के साथ शुरू हो जाएगी। आप बटनों पर क्लिक करके इसे मैन्युअल रूप से अक्षम/सक्षम कर सकते हैं। जब आप स्क्रीन से बाहर निकलेंगे तो यह अपने आप लोकेशन देखना बंद कर देगा।',
    androidPosition: 'Android पर लोकेशन निर्धारित करने में कुछ समय लग सकता है।',
    dontUseLocation: "लोकेशन का इस्तेमाल न करें",
    goToSettings: 'सेटिंग्स में जाओ',
    denied: 'स्थान अनुमति अस्वीकृत',
    latitude: 'अक्षांश',
    longitude: 'देशांतर',
    userDenied: 'उपयोगकर्ता द्वारा लोकेशन अनुमति अस्वीकृत।',
    userRevoked: 'उपयोगकर्ता द्वारा लोकेशन अनुमति निरस्त कर दी गई है।',
    startObserving: 'निरीक्षण शुरू करें',
    stopObserving: 'निरीक्षण करना बंद करो',
    unableOpenSettings: 'सेटिंग्स को खोलने में असमर्थ',
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
    addToCart: 'कार्ट में डालें',
    highlights: 'उत्पाद हाइलाइट्स',
    testId: 'product screen',
    priceTestId: 'product price',
    labelTestId: 'product label',
    descriptionTestId: 'product description',
    unknownProductDescription: "उफ़! हमें आपका उत्पाद\nनहीं मिल रहा है।",
    buttonText: 'कैटलॉग पर जाएँ',
  },
  qrCode: {
    header: 'QR कोड स्कैनर',
    errorOccurred: 'एक एरर आया।',
    lineOne: 'एक ऐसा QR कोड स्कैन करें जिसमें एक URL हो।',
    lineTwo: 'इसे डिफ़ॉल्ट ब्राउज़र में खोला जाएगा।',
    notValidUrl: '"{{url}}" मान्य url नहीं है',
    testId: 'qr code screen',
  },
  webview: {
    error: "इस url '{{uri}}' को लोड करने में एरर आया।",
    testId: 'webview screen',
  },
  webviewSelection: {
    header: 'Webview',
    error: "इस url '{{uri}}' को लोड करने में एरर आया।",
    inputLabel: 'URL',
    inputErrorMessage: 'कृपया एक सही https url प्रदान करें।',
    inputPlaceholder: 'https://www.website.com',
    text: 'कृपया https url प्रदान करें।',
    submitButtonText: 'साइट पर जाएं',
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
      label: 'कैटलॉग',
      testId: 'tab bar option catalog',
    },
    cart: {
      label: 'कार्ट',
      testId: 'tab bar option cart',
    },
    menu: {
      label: 'मेन्यू',
      testId: 'tab bar option menu',
    },
  },
  drawer: {
    webview: {
      label: 'Webview',
      testId: 'menu item webview',
    },
    qrCode: {
      label: 'QR कोड स्कैनर',
      testId: 'menu item qr code scanner',
    },
    geoLocation: {
      label: 'भौगोलिक स्थिति',
      testId: 'menu item geo location',
    },
    drawing: {
      label: 'चित्रकारी',
      testId: 'menu item drawing',
    },
    about: {
      label: 'जानकारी',
      testId: 'menu item about',
    },
    reportABug: {
      label: 'खराबी की जानकारी दें',
      testId: 'menu item report a bug',
    },
    catalog: {
      label: 'कैटलॉग',
      testId: 'menu item catalog',
    },
    reset: {
      label: 'ऐप स्टेट रीसेट करें',
      cancel: 'रद्द करें',
      ok: 'ऐप रीसेट करें',
      resetSuccessful: 'ऐप स्टेट को रीसेट कर दिया गया है।',
      areYouSure: 'क्या आप ऐप को रीसेट करना चाहते हैं?',
      testId: 'menu item reset app',
    },
    logIn: {
      label: 'लॉग इन करें',
      testId: 'menu item log in',
    },
    biometrics: {
      androidLabel: 'फिंगरप्रिंट',
      iOSTouchIdLabel: 'TouchID',
      defaultHeader: 'बॉयोमेट्रिक्स',
      iOSFaceIdLabel: 'FaceID',
      testId: 'menu item biometrics',
    },
    logOut: {
      label: 'लॉग आउट',
      cancel: 'रद्द करें',
      resetSuccessful: 'आप सफलतापूर्वक लॉग आउट हो गए हैं।',
      areYouSure: 'क्या आप सुनिश्चित हैं कि आप लॉगआउट करना चाहते हैं?',
      testId: 'menu item log out',
    },
    closeMenu: {
      testId: 'close menu',
    },
    openMenu: {
      testId: 'open menu',
    },
  },
};
