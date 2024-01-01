import React, { Fragment, useEffect, useState } from "react";
import MetaData from "./MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "./SideBar";
import { ToastContainer } from "react-toastify";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { clearErrors, getOrderDetails, updateOrder } from "../redux/action/orderAction";
import { Button } from "@mui/material";
import { UPDATE_ORDER_RESET } from "../redux/constant/order";
const ProcessOrder = () => {
    const { loading, error, order } = useSelector((state) => state.myOrderDetails);
    const {  error:orderError, isUpdated } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {id} = useParams()
  const navigate = useNavigate();
  useEffect(() => {
    if(orderError){
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

    if(isUpdated){
        toast.success("status updated", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          dispatch({type:UPDATE_ORDER_RESET});
          setTimeout(()=>{
   navigate('/admin/orders')
          },2000)
    }
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
  }, [dispatch, error, navigate, isUpdated,orderError]);
//   const subTotal = cartItems.reduce(
//     (acc, initial) => acc + initial.price * initial.quantity,
//     0
//   );
//   const shippingCharges = subTotal > 1000 ? 0 : 200;
//   const tax = subTotal * 0.18;
//   const totalPrice = subTotal + tax + shippingCharges;

  const proceedToPayment = () => {
  

  };
  const  [status, setStatus] = useState("")
  const updateProcess = (e)=> {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("status", status);
 
   
    dispatch(updateOrder(id, myForm));
  }
  return (
 


    <Fragment>
    <MetaData title="Process Order" />
    <ToastContainer />

    <div className="grid grid-cols-1 lg:grid-cols-5">
      <SideBar />
      <div className="col-span-3 border  flex justify-center items-center">
     
        <div className="md:w-8/12   flex flex-col gap-10 p-20">
          <div>
            <h1 className="text-2xl md:text-4xl">Shipping Info</h1>
            <div className="mt-5">
              {user && user.user && <p>Name:{user.user.name}</p>}
              <p>Phone:{order && order.shippingInfo && order.shippingInfo.phoneNo}</p>
              <p>Address:{order && order.shippingInfo && order.shippingInfo.address}</p>
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
                      ? "text-green-500 text-xl"
                      : "text-red-500 text-xl"
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
            <div className="flex  flex-col gap-4 ">
           <h1 className="text-3xl">Order Status</h1>
           <p className={`${order && order.orderStatus=="Proccessing"?   "text-red-400":"text-green-400"} text-xl`}>{order && order.orderStatus}</p>
           </div>
         
          <h1 className=" text-2xl md:text-4xl mt-4">Your Cart Items:</h1>
          <div className="flex flex-col gap-4 mt-10">
            {order && order.orderItems && order.orderItems.map((item) => {
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

       
 
      </div>

      <div className="col-span-1 ">
      <div className="flex flex-col gap-5 z-50 justify-center   md:full p-5">
          
         
         
          
      <form
            action=""
            encType="multipart/form-data"
           
            className="flex flex-col gap-10 bg-white w-full lg:w-auto "
          >
            <h1 className="text-2xl font-bold">Process Order</h1>
           
           
            <div className="relative">
              <AccountTreeIcon className="absolute top-2 left-1 opacity-40 " />
              <select
                onChange={(e) => setStatus(e.target.value)}
                value={status}
                className="w-full pl-8"
              >
                <option value="">Choose Status</option>
                 <option value="shipped">shipped</option>
                 <option value="delivered">delivered</option>
                
              </select>
            </div>
           
          
           

            
           
            <Button
              type="submit"
              disabled={loading ? true : false || status ===""? true:false}
              id="create-admin-btn"
             onClick={updateProcess}
            >
              Process Order
            </Button>
          </form>
          <div>
          
          </div>
        </div>
      </div>
    </div>
  </Fragment>
  
    
 


  );
};

export default ProcessOrder;
