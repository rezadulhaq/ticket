// categoryProducts.js

import { READ_CATEGORY_TICKET} from "../actionType";

const initialState = {
  categoryTickets: [],
};

const categoryTicketReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case READ_CATEGORY_TICKET:
      return {
        ...state,
        categoryTickets: payload,
      };
    default:
      return state;
  }
};

export default categoryTicketReducer;
