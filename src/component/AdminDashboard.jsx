import React, { useEffect } from "react";
import SideBar from "./SideBar";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import { CChart } from "@coreui/react-chartjs";
import { useDispatch, useSelector } from "react-redux";
import { getProductAdmin, clearErrors } from "../redux/action/productAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// const labels = Utils.months({count: 7});
// const data = {
//   labels: labels,
//   datasets: [{
//     label: 'My First Dataset',
//     data: [65, 59, 80, 81, 56, 55, 40],
//     fill: false,
//     borderColor: 'rgb(75, 192, 192)',
//     tension: 0.1
//   }]
// };
const AdminDashboard = () => {

  const { error, products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error, {
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
    dispatch(getProductAdmin());
  }, [dispatch, error]);
  let outOfStock = 0; 
  products && products.forEach((item)=>{
     if(item.Stock===0){
      outOfStock+=1
     }
  })
  return (
    <div className="grid  lg:grid-cols-5  bg-white z-30 w-full ">
      <SideBar />
      <div className="lg:col-span-4 w-[90%]">
        <Typography
          component="h1"
          className="text-black p-[1.5rem] w-[50%] text-2xl text-center w-full"
        >
          Dashboard
        </Typography>
        <div className="flex justify-center w-full items-center  flex flex-col">
          <div className="w-full">
            <p className="bg-blue-500 text-white lg:w-full ml-[2rem] mr-[2rem] p-5 text-center">
              Total Amount <br /> ₹2000
            </p>
          </div>
          <div className="w-full flex justify-center gap-5 mt-12">
            <Link
              to="/admin/products"
              className="flex flex-col items-center justify-center h-20 w-20   lg:w-36 lg:h-36 lg:p-20  bg-[tomato] text-white rounded-full"
            >
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link
              to="/admin/orders"
              className="flex flex-col items-center justify-center h-20 w-20  lg:w-36 lg:h-36 lg:p-20 text-white  bg-gray-500 rounded-full"
            >
              <p>Orders</p>
              <p>4</p>
            </Link>
            <Link
              to="/admin/users"
              className="flex flex-col items-center justify-center w-20 h-20 lg:w-36 lg:h-36  lg:p-20 text-white  bg-orange-500 rounded-full"
            >
              <p>Users</p>
              <p>2</p>
            </Link>
          </div>
        </div>
        <div className="w-[80%] m-auto h-full">
          <CChart
            type="line"
            data={{
              labels: ["Initial Amount", "Earned Amount"],
              datasets: [
                {
                  label: "My First dataset",
                  backgroundColor: "rgba(220, 220, 220, 0.2)",
                  borderColor: "rgba(220, 220, 220, 1)",
                  pointBackgroundColor: "rgba(220, 220, 220, 1)",
                  pointBorderColor: "#fff",
                  data: [0, 4000],
                },
              ],
            }}
            options={{
              plugins: {
                legend: {},
              },
            }}
          />

          <div className="">
            <CChart
            className="w-[25vmax] m-auto"
              type="doughnut"
              data={{
                labels: ["Out of Stock", "InStock"],
                datasets: [
                  {
                    backgroundColor: [
                   
                      "#E46651",
                      "#41B883"
                    //   "#00D8FF",
                    //   "#DD1B16",
                    ],
                    data: [outOfStock, products.length - outOfStock],
                    hoverBackgroundColor:["#4B5000", "#35014F"]
                  },    
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    labels: {},
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
