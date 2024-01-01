import React, { Fragment, useEffect, useState } from "react";
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
import { lazy, Suspense } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

import store from "../src/redux/store";
import { loadUser } from "./redux/action/userAction";
import ProcessOrder from "./component/ProcessOrder";

const AdminOrders = lazy(() => import("./component/AdminOrders"));
const Footer = lazy(() => import("./component/Footer"));
const Home = lazy(() => import("./component/Home"));
const ProductDetails = lazy(() => import("./component/ProductDetails"));
const Loader = lazy(() => import("./component/Loader"));
const Products = lazy(() => import("./component/Products"));
const Search = lazy(() => import("./component/Search"));
const SearchProduct = lazy(() => import("./component/SearchProduct"));
const Login = lazy(() => import("./component/user/Register"));
const Register = lazy(() => import("./component/user/Register"));
const Cart = lazy(() => import("./component/Cart"));
const Account = lazy(() => import("./component/Account"));
const EditProfile = lazy(() => import("./component/EditProfile"));
const Orders = lazy(() => import("./component/Orders"));
const Contact = lazy(() => import("./component/Contact"));
const About = lazy(() => import("./component/About"));
const UpdatePassword = lazy(() => import("./component/UpdatePassword"));
const ForgotPassword = lazy(() => import("./component/ForgotPassword"));
const ResetPassword = lazy(() => import("./component/ResetPassword"));
const Shipping = lazy(() => import("./component/Shipping"));
const ConfirmOrder = lazy(() => import("./component/ConfirmOrder"));
const Payment = lazy(() => import("./component/Payment"));
const Success = lazy(() => import("./component/Success"));
const OrderOverView = lazy(() => import("./component/OrderOverView"));
const AdminDashboard = lazy(() => import("./component/AdminDashboard"));
const Header = lazy(() => import("./component/Header"));
const NewProduct = lazy(() => import("./component/NewProduct"));
const AdminProductEdit = lazy(() => import("./component/AdminProductEdit"));
const ProductList = lazy(() => import("./component/ProductList"));
const App = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/stripeapikey",
        { withCredentials: true }
      );

      // Assuming data.stripeApiKey is the key you want to set
      setStripeApiKey(data.stripeApiKey);

      // You can do something else with the API key here, depending on your requirements
    } catch (error) {
      // Handle the error
      console.error("Error fetching Stripe API key:", error);
    }
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
        <Route path="/success" element={<Success />} />
        <Route path="/orders/:id" element={<OrderOverView />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<ProductList />} />
        <Route path="/admin/newProduct" element={<NewProduct />} />
        <Route path="/admin/product/:id" element={<AdminProductEdit />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/order/:id" element={<ProcessOrder/>}/>
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
