import React, { Fragment, useEffect, useState } from 'react'
import Product from './Product'
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../redux/action/productAction';
import Pagination from "react-js-pagination";
import Loader from './Loader';
import Filter from './features/Filter';

const Products = () => {
  const { products, loading, error, productPerPage, productsCount } = useSelector((state) => {

    return state.products;
  });
  const [currentPage, setCurrentPage] = useState(1);
  const dipatch = useDispatch();

 useEffect(()=>{
    dipatch(getProduct())
 }, [])
  
 const setCurrentPageNo = (e) => {
  setCurrentPage(e);
};

  return (
    <Fragment>
      <Filter/>

    </Fragment>
  )
}

export default Products