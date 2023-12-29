import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./home.css";
import { clearErrors, getProduct } from "../redux/action/productAction";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "./MetaData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Product from "./Product";

import Loader from "./Loader";

const Home = () => {
  const { products, loading, error } = useSelector((state) => {
    return state.products;
  });
  console.log(products)
  const d = useSelector((state) => {
    return state;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      return toast.error("🦄 Wow so easy!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    dispatch(getProduct());
  }, [dispatch, error]);

  return (
    <Fragment>
      <ToastContainer />
      <MetaData title="Dudo" />
      {!loading ? (
        <div>
          <div
            className=" banner bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30%
       to-emerald-500 to-90%  min-h-[90vh] text-center flex flex-col justify-center items-center text-white  "
          >
            <p className="font-serif">Welcome To Dudo</p>
            <h1 className="m-5 text-4xl font-mono">
              FIND AMAZING PRODUCTS BELOW
            </h1>
            <a href="#container ">
              <button className="flex items-center gap-2 bg-white text-black pr-5 pl-5 pt-3 pb-3 w-18 transition-all hover:bg-transparent hover:text-white hover:outline">
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <h1 className="mt-5 text-center text-2xl border-b-2  mb-5 w-96 m-auto">
            Featured Products
          </h1>


          <div className="bg-white" id="container">

          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 ">
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">          
            {products  && 
              products.map((products) => {
                  
                return <Product products={products} key={products._id} />;
              })}
          </div>
          </div>

        </div>
        </div>
      ) : (
        <Loader />
      )}
    </Fragment>
  );
};

export default Home;
