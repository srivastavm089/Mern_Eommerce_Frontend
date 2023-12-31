import axios from "axios";
import {
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERROR,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
} from "../constant/product";

//get products
export const getProduct =
  (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALL_PRODUCT_REQUEST,
      });

      let link = `https://testing-api-i7lh.onrender.com/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      if (category) {
        console.log("working");
        link = `https://testing-api-i7lh.onrender.com/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }
      const { data } = await axios.get(link);

      dispatch({
        type: ALL_PRODUCT_SUCCESS,

        payload: {
          product: data.product,
          productCount: data.productsCount,
          productPerPage: data.resultPerPage,
        },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: "something went wrong",
      });
    }
  };
//get product details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });
    const { data } = await axios.get(
      `https://testing-api-i7lh.onrender.com/api/v1/product/${id}`
    );

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,

      payload: data.product,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//get all products admin

export const getProductAdmin = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });
    const { data } = await axios.get(
      "https://testing-api-i7lh.onrender.com/api/v1/admin/products",
      {headers:{"Content-Type":"application/json", token:localStorage.getItem("token")}}
  
    );

    dispatch({ type: ADMIN_PRODUCT_SUCCESS, payload: data.products });
  } catch (error) {
    dispatch({ type: ADMIN_PRODUCT_FAIL, payload: "seomthign went " });
  }
};

export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_REVIEW_REQUEST,
    });
    const config = {
      headers: { "Content-Type": "application/json" },
      // withCredentials: true,
    };
    const { data } = await axios.put(
      `https://testing-api-i7lh.onrender.com/api/v1/review`,
      reviewData,
      {headers:{"Content-Type":"application/json" , token:localStorage.getItem("token")}}
    );

    dispatch({
      type: NEW_REVIEW_SUCCESS,

      payload: data.success,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Create Product
export const createProduct = (reviewData) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_PRODUCT_REQUEST,
    });
    const config = {
      headers: { "Content-Type": "application/json" },
      // withCredentials: true,
    };
    const { data } = await axios.post(
      `https://testing-api-i7lh.onrender.com/api/v1/admin/product/new`,
      reviewData,
      {headers:{"Content-Type":"application/json" , token:localStorage.getItem("token")}}
    );

    dispatch({
      type: NEW_PRODUCT_SUCCESS,

      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteProd = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_PRODUCT_REQUEST,
    });
    // const config = {
    //   headers: { "Content-Type": "application/json" },
      // withCredentials: true,
    // };
    const { data } = await axios.delete(
      `https://testing-api-i7lh.onrender.com/api/v1/admin/product/${id}`,
      {headers:{"Content-Type":"application/json" , token:localStorage.getItem("token")}}
    );
    console.log(data);
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,

      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//update product
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
    });
    const config = {
      headers: { "Content-Type": "application/json" },
      // withCredentials: true,
    };
    const { data } = await axios.put(
      `https://testing-api-i7lh.onrender.com/api/v1/admin/product/${id}`,
      productData,
      {headers:{"Content-Type":"application/json" , token:localStorage.getItem("token")}}
    );
    console.log(data.success);
    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,

      payload: data.success,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: error.response.data.message,
    });
  }
};
//clearing errors

//get all reviews of a product
export const getAllReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({
      type: ALL_REVIEW_REQUEST,
    });
    const config = {
      // headers: { "Content-Type": "application/json" },
      // withCredentials: true,
    };
    const { data } = await axios.get(
      `https://testing-api-i7lh.onrender.com/api/v1/reviews?id=${reviewId}`,

      {headers:{"Content-Type":"application/json" , token:localStorage.getItem("token")}}
    );
    console.log(data);
    dispatch({
      type: ALL_REVIEW_SUCCESS,

      payload: data.reviews,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_REVIEW_REQUEST,
    });
    const config = {
      // headers: { "Content-Type": "application/json" },
      // withCredentials: true,
    };
    const { data } = await axios.delete(
      `https://testing-api-i7lh.onrender.com/api/v1/reviews?id=${reviewId}&productId=${productId}`,

      {headers:{"Content-Type":"application/json" , token:localStorage.getItem("token")}}
    );
    console.log(data.success);
    dispatch({
      type: DELETE_REVIEW_SUCCESS,

      payload: data.success,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};
