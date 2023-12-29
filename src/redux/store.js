import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import {
  productDetailsReducer,
  productReducer,
} from "./reducer/productReducer";
import { forgetPasswordReducer, userReducer } from "./reducer/userReducer";
import { cartReducer } from "./reducer/cartReducer";
import { myOrderReducer, newOrderReducer } from "./reducer/orderReducer";

const reducers = {
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  forgotPassword: forgetPasswordReducer,
  cart: cartReducer,
  order:newOrderReducer,
  myOrder:myOrderReducer
};

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
