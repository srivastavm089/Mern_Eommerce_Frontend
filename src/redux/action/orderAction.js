import axios from "axios";
import {
  CLEAR_ERRORS,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  MY_ORDER_FAIL,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
} from "../constant/order";

//order create
export const createOrder = (order) => async (dispatch) => {
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

export const myOrders = () => async (dispatch) => {
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
    console.log(data);
    dispatch({ type: MY_ORDER_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: MY_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get Order details
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const { data } = await axios.get(
      `http://localhost:8080/api/v1/order/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
