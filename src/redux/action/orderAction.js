import axios from "axios";
import {
  CLEAR_ERRORS,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  MY_ORDER_FAIL,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
} from "../constant/order";

//order create
export const createOrder = (order) => async (dispatch, getState) => {
  console.log(order);
  try {
    dispatch({
      type: CREATE_ORDER_REQUEST,
    });

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const { data } = await axios.post(
      "http://localhost:8080/api/v1/order/new",
      order,
      config
    );
    console.log(data);
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//myOrder view

export const myOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MY_ORDER_REQUEST,
    });

    // const config = {
    //   headers: { "Content-Type": "application/json" },
    //   withCredentials: true,
    // };
    const { data } = await axios.get("http://localhost:8080/api/v1/orders/me", {
      withCredentials: true,
    });
   console.log(data)
    dispatch({ type: MY_ORDER_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: MY_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
