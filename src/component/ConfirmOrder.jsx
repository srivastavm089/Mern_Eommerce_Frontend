import React, { Fragment } from "react";
import MetaData from "./MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
 console.log(cartItems)
  const subTotal = cartItems.reduce(
    (acc, initial) => acc + initial.price * initial.quantity,
    0
  );
  const shippingCharges = subTotal > 1000 ? 0 : 200;
  const tax = subTotal * 0.18;
  const totalPrice = subTotal + tax + shippingCharges;
  const navigate = useNavigate();
  const proceedToPayment = () => {
    const data = {
      subTotal,
      shippingCharges,
      tax,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/order/payment");
  };
  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="flex md:flex-row flex-col h-full  md:gap-12 md:h-screen">
        <div className="md:w-8/12 border-r-2 flex flex-col p-20">
          <div>
            <h1 className="text-2xl md:text-4xl">Shipping Info</h1>
            <div className="mt-5">
              {user && user.user && <p>Name:{user.user.name}</p>}
              <p>Phone:{shippingInfo.phoneNo}</p>
              <p>Address:{shippingInfo.address}</p>
            </div>
          </div>
          <h1 className=" text-2xl md:text-4xl mt-4">Your Cart Items:</h1>
          <div className="flex flex-col gap-4 mt-10">
            {cartItems.map((item) => {
              return (
                <div key={item} className="flex items-center justify-between ">
                  <div>
                    <img
                      src={item.image}
                      alt={item.url}
                      className="w-12 md:w-20"
                    />
                    <p className="text-[10px]">{item.name}</p>
                  </div>
                  <div>
                    <p>
                      {item.quantity} X {item.price} ={" "}
                      {item.quantity * item.price}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-5 z-50   md:w-96 p-5">
          <div className="flex justify-center items-center border-b-2 pb-2">
            {" "}
            <h1 className="  ">Order Summary </h1>
          </div>
          <div className="flex justify-between">
            {" "}
            <p>SubTotal :</p>{" "}
            <p>
              {" "}
              {cartItems.reduce(
                (acc, initial) => acc + initial.price * initial.quantity,
                0
              )}
            </p>
          </div>
          <div className="flex justify-between">
            {" "}
            <p>Shipping Charges</p> <p> ₹0</p>
          </div>
          <div className="flex justify-between border-b-2 pb-5">
            <p>GST</p>
            <p>
            ₹{Math.round((cartItems.reduce(
                (acc, initial) => acc + initial.price * initial.quantity,
                0
              ) *
                18) /
                100)}
            </p>
          </div>
          <div className="flex justify-between">
            <p>Total: </p>{" "}
            <p>
              ₹
              {Math.round((cartItems.reduce(
                (acc, initial) => acc + initial.price * initial.quantity,
                0
              ) *
                18) /
                100 +
                cartItems.reduce(
                  (acc, initial) => acc + initial.price * initial.quantity,
                  0
                ))}
            </p>
          </div>
          <div>
            {" "}
            <button
              className="bg-[tomato] text-white p-2 rounded w-full hover:bg-gray-600"
              onClick={() => proceedToPayment()}
            >
              Proceed To Payment
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
