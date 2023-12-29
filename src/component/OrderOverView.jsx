import React, { Fragment, useEffect } from "react";
import { clearErrors, getOrderDetails } from "../redux/action/orderAction";
import Loader from "./Loader";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import MetaData from "./MetaData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const OrderOverView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loader, error, order } = useSelector((state) => state.myOrderDetails);

  console.log(order);
  useEffect(() => {
    if (error) {
      toast.error("🦄 Wow so easy!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(clearErrors());
    }
    dispatch(getOrderDetails(id));
  }, []);
  return (
    <Fragment>
      <MetaData title="order details" />
      {loader ? (
        <Loader />
      ) : (
        <div className="bg-white">



          <div className="p-12 flex flex-col gap-5">
            <h1 className=" text-[tomato] text-[10px]  sm:text-4xl">Order #{order && order._id}</h1>
            <p className="text-3xl">Shipping Info</p>

            <div>
              <div>
                <p >Name:</p>
                <span>{order && order.user && order.user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>
                  {order && order.shippingInfo && order.shippingInfo.phoneNo}
                </span>
              </div>
              <div>
                <p>Address:</p>
                <span>
                  {order &&
                    order.shippingInfo &&
                    `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.phoneNo}`}
                </span>
              </div>
            </div>
            <p className="text-3xl">Payment</p>
            <div>
              <div>
                <p
                  className={
                    order &&
                    order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {order &&
                  order.paymentInfo &&
                  order.paymentInfo.status === "succeeded"
                    ? "Paid"
                    : "Not Paid"}
                </p>
              </div>

              <div>
                <p>Amount:</p>
                <span>₹ {" "}{order && order.totalPrice && order.totalPrice}</span>
              </div>
            </div>

            <p className="text-3xl">Order Status</p>
            <div>
              <div>
                <p className={order && order.orderStatus && order.orderStatus==="Delivered"?  "text-green-500":"text-red-500"}>{order && order.orderStatus && order.orderStatus}</p>
              </div>
            </div>
          </div>

     <hr />

          <div className="mt-5">
            <p className="text-3xl pl-12">Order Items :</p>
            <div className="">
              {order &&
                order.orderItems &&
                order.orderItems.map((item) => (
                  <div key={item.product} className="flex justify-between p-12 items-center">
                    <div className="flex items-center">
                    <img src={item.image} alt="Product" className="w-20"/>
                    <Link to={`/product/${item.product}`} className="text-[10px] sm:text-lg">{item.name}</Link>
                    </div>
                    <span className="text-[10px] sm:text-lg">
                      {item.quantity} X {item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>




        </div>
      )}
    </Fragment>
  );
};

export default OrderOverView;
