import axios from "axios";
import {
  ALL_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  CLEAR_ERRORS,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  MY_ORDER_FAIL,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
} from "../constant/order";

//order create
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_ORDER_REQUEST,
    });

 
    const { data } = await axios.post(
      "https://testing-api-i7lh.onrender.com/api/v1/order/new",
      order,
      {headers:{"Content-Type":"application/json" , token:localStorage.getItem("token")}}
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

//get all order admin

export const getAllOrder = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });
    const { data } = await axios.get(
      `https://testing-api-i7lh.onrender.com/api/v1/admin/orders`, {headers:{"Content-Type":"application/json" , token:localStorage.getItem("token")}});
        
    dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({ type: ALL_ORDERS_FAIL, payload: error.response.data.message });
  }
};

//update order
export const updateOrder = (id, order) => async (dispatch) => {
  console.log("runnning")
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });
 
    const { data } = await axios.put(
      `https://testing-api-i7lh.onrender.com/api/v1/admin/order/${id}`,
      order,
      {headers:{"Content-Type":"application/json" , token:localStorage.getItem("token")}}
    );
   console.log(data)
    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: UPDATE_ORDER_FAIL, payload: error.response.data.message });
  }
};

//delete order
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });
    const { data } = await axios.delete(
      `https://testing-api-i7lh.onrender.com/api/v1/admin/order/${id}`,{headers:{"Content-Type":"application/json" , token:localStorage.getItem("token")}}
    );
   console.log(data)
    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: DELETE_ORDER_FAIL, payload: error.response.data.message });
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
    const { data } = await axios.get("https://testing-api-i7lh.onrender.com/api/v1/orders/me", {
      headers:{"Content-Type":"application/json" , token:localStorage.getItem("token")}
    });
    
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
      `https://testing-api-i7lh.onrender.com/api/v1/order/${id}`,
      {headers:{"Content-Type":"application/json" , token:localStorage.getItem("token")}}
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
