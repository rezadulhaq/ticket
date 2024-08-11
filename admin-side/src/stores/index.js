import {
    legacy_createStore as createStore,
    applyMiddleware,
    combineReducers,
  } from "redux";
  import { thunk } from "redux-thunk";
import ticketReduces from "./reduces/ticketReduces";
import userReducer from "./reduces/userReduces";
import categoryTicketReducer from "./reduces/categoryTicket";
import orderReduces from "./reduces/orderReduces";
import promoReduces from "./reduces/promoReduces";
  const combinedReducers = combineReducers({
   Tickets : ticketReduces,
   Users : userReducer,
   categoryTickets : categoryTicketReducer,
   Orders : orderReduces,
   Promos : promoReduces
})

const store = createStore(combinedReducers, applyMiddleware(thunk));
export default store;