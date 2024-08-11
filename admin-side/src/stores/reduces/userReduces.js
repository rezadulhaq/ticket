// categoryProducts.js

import { READ_USERS} from "../actionType";

const initialState = {
  Users: [],
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case READ_USERS:
      return {
        ...state,
        Users: payload,
      };
    default:
      return state;
  }
};

export default userReducer;
