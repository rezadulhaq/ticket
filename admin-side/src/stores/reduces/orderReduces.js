// categoryProducts.js

import {READ_ORDER} from "../actionType";

const initialState = {
  Orders: [],
};

const orderReduces = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case READ_ORDER:
      return {
        ...state,
        Orders: payload,
      };
    default:
      return state;
  }
};

export default orderReduces;
