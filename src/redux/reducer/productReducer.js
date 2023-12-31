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
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_FAIL,
  ADMIN_PRODUCT_SUCCESS,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_RESET,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_RESET,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_RESET,
} from "../constant/product";

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
    case ADMIN_PRODUCT_REQUEST:
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
    case ADMIN_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case ALL_PRODUCT_FAIL:

    case ADMIN_PRODUCT_FAIL:
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
      return {
        ...state,
        success: false,
        loading: false,
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

export const newProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case NEW_PRODUCT_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case NEW_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        message: action.payload.message,
      };
    case NEW_PRODUCT_FAIL:
      return {
        loading: false,
        ...state,
        error: action.payload,
      };

    case NEW_PRODUCT_RESET:
      return {
        ...state,
        success: false,
        message: null,
        loading: false,
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
export const deleteProduct = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
    case PRODUCT_UPDATE_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case DELETE_PRODUCT_SUCCESS:
      return {
        loading: false,
        ...state,
        isDeleted: action.payload,
      };
    case PRODUCT_UPDATE_SUCCESS:
      return {
        loading: false,
        ...state,
        isUpdated: action.payload,
      };
    case DELETE_PRODUCT_FAIL:
    case PRODUCT_UPDATE_FAIL:
      return {
        loading: false,
        ...state,
        error: action.payload,
      };

    case DELETE_PRODUCT_RESET:
      return {
        ...state,

        loading: false,
        isDeleted: false,
      };
    case PRODUCT_UPDATE_RESET:
      return {
        ...state,

        loading: false,
        isUpdated: false,
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

export const productReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case ALL_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_REVIEW_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };
    case ALL_REVIEW_FAIL:
      return {
        ...state,
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

export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case DELETE_REVIEW_SUCCESS:
      console.log(action.payload)
      return {
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_PRODUCT_FAIL:
      return {
        loading: false,
        ...state,
        error: action.payload,
      };

    case DELETE_REVIEW_RESET:
      return {
        ...state,
        isDeleted: false,
        loading: false,
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
