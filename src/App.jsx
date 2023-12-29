import React, { Fragment, useEffect, useState } from "react";
import Header from "./component/Header";
import Footer from "./component/Footer";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import "./App.css";
import Loader from "./component/Loader";
import ProductDetails from "./component/ProductDetails";
import Products from "./component/Products";
import Search from "./component/Search";
import SearchProduct from "./component/SearchProduct";
import Login from "./component/user/Login";
import Register from "./component/user/Register";
import Cart from "./component/Cart";
import store from "../src/redux/store";
import { loadUser } from "./redux/action/userAction";
import Account from "./component/Account";
import EditProfile from "./component/EditProfile";
import Orders from "./component/Orders";
import Contact from "./component/Contact";
import About from "./component/About";
import UpdatePassword from "./component/UpdatePassword";
import ForgotPassword from "./component/ForgotPassword";
import ResetPassword from "./component/ResetPassword";
import Shipping from "./component/Shipping";
import ConfirmOrder from "./component/ConfirmOrder";
import Payment from "./component/Payment";

import axios from "axios";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Success from "./component/Success";
import OrderOverView from "./component/OrderOverView";

const App = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    const { data } = await axios.get(
      "http://localhost:8080/api/v1/stripeapikey",
      { withCredentials: true }
    );
    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    getStripeApiKey();
    store.dispatch(loadUser());
  }, [store.dispatch]);
  return (
    <Fragment>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/searchProduct/:keyword" element={<SearchProduct />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/update/me" element={<EditProfile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/account/update_password" element={<UpdatePassword />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/login/shipping" element={<Shipping />} />
        <Route path="/order/confirm" element={<ConfirmOrder />} />
        <Route path="/success" element={<Success/>}/>
        <Route path="/orders/:id" element={<OrderOverView/>}/>
      </Routes>

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            {" "}
            <Route
              path="/order/payment"
              element={<Payment stripeApiKey={stripeApiKey} />}
            />
          </Routes>
        </Elements>
      )}

      <Footer />
    </Fragment>
  );
};

export default App;
