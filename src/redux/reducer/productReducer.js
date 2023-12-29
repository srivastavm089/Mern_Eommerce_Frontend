import {
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_FAIL,
  CLEAR_ERROR,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
} from "../constant/product";

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return {
        loading: true,
        products: [],
      };

    case ALL_PRODUCT_SUCCESS:
      return {
        loading: false,

        products: action.payload.product,
        productsCount: action.payload.productCount,
        productPerPage: action.payload.productPerPage,
      };
    case ALL_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
        products: [],
      };
    case CLEAR_ERROR:
      return {
        state,
        error: null,
      };
    default: {
      return state;
    }
  }
};
export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        state,

        error: null,
      };
    default: {
      return state;
    }
  }
};
export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case NEW_REVIEW_FAIL:
      return {
        loading: false,
        ...state,
        error: action.payload,
      };

    case NEW_REVIEW_RESET:
      return{
        ...state,
        success:false,
        loading:false
      }
    case CLEAR_ERROR:
      return {
        state,

        error: null,
      };
    default: {
      return state;
    }
  }
};
