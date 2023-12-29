import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "./CheckoutSteps";
import MetaData from "./MetaData";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import "react-toastify/dist/ReactToastify.css";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { Typography } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import { clearErrors, createOrder } from "../redux/action/orderAction";

const Payment = ({ stripeApiKey }) => {
  const navigate = useNavigate();

  const payBtn = useRef(null);

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();

  const stripe = useStripe();

  const elements = useElements();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  console.log(shippingInfo);
  const { user } = useSelector((state) => state.user.user);
  const { error } = useSelector((state) => state.order);
  console.log(shippingInfo);
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const copyCart = cartItems.map((item) => {
    return {
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: item.quantity,
      product: item.product,
    };
  });
  
  const order = {
    shippingInfo,
    orderItems: copyCart,

    itemsPrice: orderInfo.subTotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: Math.round(orderInfo.totalPrice),

    paymentInfo: {
      id: "sample id",
      status: "success",
    },
  };

  useEffect(() => {
    if (error) {
      toast.error("something went wrong");
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        "http://localhost:8080/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;
      console.log("till now working");

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        toast.error(result.error.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          navigate("/success");
        } else {
          toast.error("something went wrong while processing the payment", {
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
      }
    } catch (error) {
      payBtn.current.disabled = false;
      toast.error("this", {
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
  };

  return (
    <Fragment>
      {" "}
      <ToastContainer />
      <MetaData title="payment" />
      <CheckoutSteps activeStep={2} />
      <div className="flex justify-center p-12">
        <form
          action=""
          onSubmit={submitHandler}
          className="flex flex-col gap-5"
        >
          <Typography>Card Info</Typography>
          <div className="relative">
            <CreditCardIcon className="absolute left-1 top-2 opacity-40" />
            <CardNumberElement className="border w-80 h-9 pt-2 pl-10" />
          </div>
          <div className="relative">
            <EventIcon className="absolute left-1 top-2 opacity-40" />
            <CardExpiryElement className="border w-80 h-9 pt-2 pl-10" />
          </div>
          <div className="relative">
            <VpnKeyIcon className="absolute left-1 top-2 opacity-40" />
            <CardCvcElement className="border w-80 h-9 pt-2 pl-10" />
          </div>
          <input
            type="submit"
            // onClick={handleAyns}
            value={`Pay - ₹${orderInfo && Math.round(orderInfo.totalPrice)}`}
            ref={payBtn}
            className="bg-[tomato] text-white w-full h-10 rounded hover:bg-gray-600 cursor-pointer"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
