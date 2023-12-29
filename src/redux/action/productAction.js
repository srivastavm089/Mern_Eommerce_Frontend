import axios from "axios";
import {
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERROR,
} from "../constant/product";
export const getProduct = (keyword="" , currentPage=1, price=[0, 25000], category, ratings=0) => async (dispatch) => {
 
  try {
    dispatch({
      type: ALL_PRODUCT_REQUEST,
    });

    let link = `http://localhost:8080/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
    console.log(link)
    
     if(category){
     console.log("working")
      link =`http://localhost:8080/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
     }
     const {data} = await axios.get(link)
     console.log(data)


    dispatch({
      type: ALL_PRODUCT_SUCCESS,
    
      payload: { product: data.product, productCount: data.productsCount ,productPerPage:data.resultPerPage  },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: "something went wrong",
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });
    const { data } = await axios.get(
      `http://localhost:8080/api/v1/product/${id}`
    );
    console.log(data);
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

//clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};
