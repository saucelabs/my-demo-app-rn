import {CardDetailsInterface} from '../reducers/CardDetailsReducer';

enum CardActionEnum {
  UPDATE_CARD_DETAILS = 'UPDATE_CARD_DETAILS',
  RESET_CARD_DETAILS = 'RESET_CARD_DETAILS',
}

export type CardDetailsActionType =
  | {
      cardDetails: CardDetailsInterface;
      type: CardActionEnum.UPDATE_CARD_DETAILS;
    }
  | {
      type: CardActionEnum.RESET_CARD_DETAILS;
    };

function updateCardDetails(cardDetails: CardDetailsInterface) {
  return {
    cardDetails,
    type: CardActionEnum.UPDATE_CARD_DETAILS,
  };
}

function resetCardDetails() {
  return {
    type: CardActionEnum.RESET_CARD_DETAILS,
  };
}

export {updateCardDetails, CardActionEnum, resetCardDetails};
