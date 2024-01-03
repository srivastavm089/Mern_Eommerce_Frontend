import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import {
  deleteProduct,
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productReducer,
  productReviewsReducer,
  reviewReducer,
} from "./reducer/productReducer";
import { forgetPasswordReducer, getAllUser, userDetailRequest, userReducer } from "./reducer/userReducer";
import { cartReducer } from "./reducer/cartReducer";
import { allOrderReducer, myOrderReducer, newOrderReducer, orderDetails, orderReducer } from "./reducer/orderReducer";

const reducers = {
  products: productReducer,
  newReview:newReviewReducer,
  productDetails: productDetailsReducer,

  user: userReducer,
  forgotPassword: forgetPasswordReducer,
  cart: cartReducer,
  order:newOrderReducer,
  myOrder:myOrderReducer,
  myOrderDetails:orderDetails,
  newProduct:newProductReducer,
  product:deleteProduct,
  allOrder:allOrderReducer,
  orders:orderReducer,
  users:getAllUser,
  userDetail:userDetailRequest,
  productReviews:productReviewsReducer,
  review:reviewReducer
};

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
