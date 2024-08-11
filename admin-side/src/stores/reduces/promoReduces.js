// categoryProducts.js

import {READ_PROMO} from "../actionType";

const initialState = {
  Promos: [],
};

const promoReduces = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case READ_PROMO:
      return {
        ...state,
        Promos: payload,
      };
    default:
      return state;
  }
};

export default promoReduces;
