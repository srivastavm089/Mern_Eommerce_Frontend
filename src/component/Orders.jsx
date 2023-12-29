import React, { Fragment, useEffect } from "react";

import { DataGrid } from "@mui/x-data-grid";

import { useSelector, useDispatch } from "react-redux";
import LaunchIcon from "@mui/icons-material/Launch";
import { clearErrors, myOrders } from "../redux/action/orderAction";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import MetaData from "./MetaData";
import { Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
const Orders = () => {
  const { user } = useSelector((state) => state.user);
  const { loading, error, orders } = useSelector((state) => state.myOrder);
console.log(orders)
  const dispatch = useDispatch();
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

    dispatch(myOrders());
  }, [dispatch, error]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
       
       return params.value ==="Delivered" ?   "text-green-500":"text-red-500"
      },
    },
    {
      field: "itemQty",
      headerName: "Item Quantity",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/orders/${params.id}`} className="hover:text-red-400">
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        itemQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });
  return (
    <Fragment>
      <ToastContainer />
      <MetaData title={`${user && user.user && user.name} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="max-w-screen-2xl box-border sm:pl-[7vmax] sm:pr-[7vmax] flex flex-col h-screen">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
          <Typography className=" bg-slate-500 text-white h-12 flex justify-center items-center">{user && user.user && user.user.name}'s Orders</Typography>
        </div>
      )}
    </Fragment>
  );
};

export default Orders;
