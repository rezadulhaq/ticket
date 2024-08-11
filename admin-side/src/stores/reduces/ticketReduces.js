// categoryProducts.js

import { READ_TICKETS} from "../actionType";

const initialState = {
  Tickets: [],
};

const ticketReduces = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case READ_TICKETS:
      return {
        ...state,
        Tickets: payload,
      };
    default:
      return state;
  }
};

export default ticketReduces;
