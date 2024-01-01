import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductAdmin,
  clearErrors,
  deleteProd,
} from "../redux/action/productAction";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MetaData from "./MetaData";
import SideBar from "./SideBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ProductList = () => {
  const dispatch = useDispatch();

  const { error, products } = useSelector((state) => state.products);
   const {error:deleteError, isDeleted, } = useSelector((state)=> state.product)
  const deleteHandler = (e, id) => {
   e.preventDefault();
    dispatch(deleteProd(id));
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
      toast.success("product deleted", {
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
  }, [dispatch, error, deleteError,isDeleted ]);
  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 350, flex: 1 },
    { field: "stock", headerName: "Stock", minWidth: 150, flex: 0.3 },
    { field: "price", headerName: "Price", minWidth: 270, flex: 0.5 },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link
              className="hover:text-[tomato]"
              to={`/admin/product/${params.id}`}
            >
              <EditIcon />
            </Link>
            <Button
              className="hover:text-[tomato]"
              onClick={(e) => deleteHandler( e, params.id)}
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  console.log(products);
  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <ToastContainer />
      <MetaData title="ALl PRODUCT -ADMIN" />

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

export default ProductList;
