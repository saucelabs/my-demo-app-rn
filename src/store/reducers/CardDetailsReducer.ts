import {
  CardActionEnum as ACTIONS,
  CardDetailsActionType,
} from '../actions/CardDetailsActions';

export interface CardDetailsInterface {
  cardFullName: string;
  cardNumber: string;
  cardExpirationDate: string;
  cardSecurityCode: string;
  isShippingAddress: boolean;
  billingAddressDetails: {
    fullName: string;
    addressLineOne: string;
    addressLineTwo?: string;
    city: string;
    stateRegion?: string;
    zipCode: string;
    country: string;
  };
}

const initialCardDetailsState: CardDetailsInterface = {
  cardFullName: '',
  cardNumber: '',
  cardExpirationDate: '',
  cardSecurityCode: '',
  isShippingAddress: true,
  billingAddressDetails: {
    fullName: '',
    addressLineOne: '',
    addressLineTwo: '',
    city: '',
    stateRegion: '',
    zipCode: '',
    country: '',
  },
};

const cardDetailsReducer = (
  state = initialCardDetailsState,
  action: CardDetailsActionType,
) => {
  switch (action.type) {
    case ACTIONS.UPDATE_CARD_DETAILS: {
      return {
        ...state,
        ...action.cardDetails,
      };
    }
    case ACTIONS.RESET_CARD_DETAILS: {
      return initialCardDetailsState;
    }
    default:
      return state;
  }
};

export {initialCardDetailsState, cardDetailsReducer};
