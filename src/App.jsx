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
import AdminAllUser from "./component/AdminAllUser";
import AdminUser from "./component/AdminUser";
import ProductReviews from "./component/ProductReviews";
import NotFound from "./component/NotFound";
import ProtectedRoute from "./component/ProtectedRoute";

const AdminOrders = lazy(() => import("./component/AdminOrders"));
const Footer = lazy(() => import("./component/Footer"));
const Home = lazy(() => import("./component/Home"));
const ProductDetails = lazy(() => import("./component/ProductDetails"));
const Loader = lazy(() => import("./component/Loader"));
const Products = lazy(() => import("./component/Products"));
const Search = lazy(() => import("./component/Search"));
const SearchProduct = lazy(() => import("./component/SearchProduct"));
const Login = lazy(() => import("./component/user/Login"));
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
        "https://testing-api-i7lh.onrender.com/api/v1/stripeapikey",
        {headers:{"Content-Type":'application/json', "token":localStorage.getItem("token")}}
       
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
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<ProtectedRoute  Comp={Cart}/>} />
        <Route path="/account" element={<ProtectedRoute Comp={Account} />} />
        <Route path="/account/update/me" element={<ProtectedRoute Comp={EditProfile} />} />
        <Route path="/orders" element={<ProtectedRoute Comp={Orders}/>} />
        <Route path="/contact" element={<ProtectedRoute Comp={Contact}/>} />
        <Route path="/about" element={<ProtectedRoute Comp={About} />} />
        <Route path="/account/update_password" element={<ProtectedRoute Comp={UpdatePassword} />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/shipping" element={<ProtectedRoute Comp={Shipping} />} />
        <Route path="/order/confirm" element={<ProtectedRoute Comp={ConfirmOrder} />} />
        <Route path="/success" element={<ProtectedRoute Comp={Success}  />} />
        <Route path="/orders/:id" element={<ProtectedRoute Comp={OrderOverView}  />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute Comp={AdminDashboard}  />} />
        <Route path="/admin/products" element={<ProtectedRoute Comp={ProductList} />} />
        <Route path="/admin/newProduct" element={<ProtectedRoute Comp={NewProduct} />} />
        <Route path="/admin/product/:id" element={<ProtectedRoute Comp={AdminProductEdit} />} />
        <Route path="/admin/orders" element={<ProtectedRoute Comp={AdminOrders}  />} />
        <Route path="/admin/order/:id" element={<ProcessOrder Comp={AdminAllUser}/>}/>
        <Route path="/admin/users" element={<ProtectedRoute Comp={AdminAllUser}/>}/>
        <Route path="/admin/user/:id" element={<ProtectedRoute Comp={AdminUser}/>}/>
        <Route path="/admin/reviews" element={<ProtectedRoute Comp={ProductReviews}/>}/>
       
      </Routes>

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            {" "}
            <Route
              path="/order/payment"
              element={<Payment stripeApiKey={stripeApiKey} />}
            />
             {/* <Route path="/*" element={<NotFound/>}/> */}
          </Routes>
        </Elements>
      )}

      <Footer />
    </Fragment>
  );
};

export default App;
