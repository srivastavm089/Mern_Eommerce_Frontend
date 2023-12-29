import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import {
  newReviewReducer,
  productDetailsReducer,
  productReducer,
} from "./reducer/productReducer";
import { forgetPasswordReducer, userReducer } from "./reducer/userReducer";
import { cartReducer } from "./reducer/cartReducer";
import { myOrderReducer, newOrderReducer, orderDetails } from "./reducer/orderReducer";

const reducers = {
  products: productReducer,
  newReview:newReviewReducer,
  productDetails: productDetailsReducer,

  user: userReducer,
  forgotPassword: forgetPasswordReducer,
  cart: cartReducer,
  order:newOrderReducer,
  myOrder:myOrderReducer,
  myOrderDetails:orderDetails
};

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
