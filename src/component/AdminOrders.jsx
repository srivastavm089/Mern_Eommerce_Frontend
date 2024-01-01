import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MetaData from "./MetaData";
import SideBar from "./SideBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  clearErrors,
  deleteOrder,
  getAllOrder,
} from "../redux/action/orderAction";
import { DELETE_ORDER_RESET } from "../redux/constant/order";
const AdminOrders = () => {
  const dispatch = useDispatch();

  const { error, orders } = useSelector((state) => state.allOrder);
  console.log(orders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.orders);
  const deleteOrderHandler = (e, id) => {
    e.preventDefault();
    dispatch(deleteOrder(id));
  };
  useEffect(() => {
    if (deleteError) {
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

    if (isDeleted) {
      toast.success("order deleted", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch({ type: DELETE_ORDER_RESET });
    }
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
    dispatch(getAllOrder());
  }, [dispatch, error, deleteError, isDeleted]);
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "text-green-500" : "text-red-500";
      },
    },
    {
      field: "itemQty",
      headerName: "Item Quantity",
      type: "number",
      minWidth: 150,
      flex: 0.4,
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
          <Fragment>
            <Link
              className="hover:text-[tomato]"
              to={`/admin/order/${params.id}`}
            >
              <EditIcon />
            </Link>
            <Button
              className="hover:text-[tomato]"
              onClick={(e) => deleteOrderHandler(e, params.id)}
            >
              <DeleteIcon />
            </Button>
          </Fragment>
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
      <MetaData title="ALL ORDERS -ADMIN" />

      <div className="grid grid-cols-1 lg:grid-cols-5 ">
        <SideBar />

        <div className="col-span-4 border">
          <h1 className="text-center m-2 text-2xl font-bold">All Products</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={10}
            disableSelectionOnClick
            autoHeight
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10, page: 0 },
              },
            }}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default AdminOrders;
