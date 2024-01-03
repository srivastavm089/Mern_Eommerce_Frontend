import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllReviews,
  deleteReviews,
  clearErrors,
} from "../redux/action/productAction";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MetaData from "./MetaData";
import SideBar from "./SideBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DELETE_REVIEW_RESET } from "../redux/constant/product";
const ProductReviews = () => {
  const dispatch = useDispatch();
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const [productId, setProductId] = useState("");
  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );
  console.log(reviews);
  const deleteHandler = (e, reviewId) => {
    e.preventDefault();

    dispatch(deleteReviews(reviewId, productId));
  };
  const getProductReview = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };
  console.log(isDeleted);
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
      toast.success("review deleted", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(getAllReviews(productId));
      dispatch({ type: DELETE_REVIEW_RESET });
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
  }, [dispatch, error, deleteError, isDeleted]);
  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },
    { field: "user", headerName: "User", minWidth: 150, flex: 0.3 },
    { field: "comment", headerName: "Comment", minWidth: 350, flex: 1 },

    {
      field: "rating",
      headerName: "Rating",
      minWidth: 270,
      flex: 0.5,
      cellClassName: (params) => {
        return params.value >= 3 ? "text-green-500" : "text-red-500";
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              className="hover:text-[tomato]"
              onClick={(e) => deleteHandler(e, params.id)}
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        comment: item.comment,
        rating: item.rating,
        user: item.name,
      });
    });

  return (
    <Fragment>
      <ToastContainer />
      <MetaData title="ALl REVIEW-ADMIN" />

      <div className="grid grid-cols-1 lg:grid-cols-5 ">
        <SideBar />

        <div className="col-span-4 border">
          <form
            action=""
            encType="multipart/form-data"
            onSubmit={getProductReview}
            className="flex flex-col gap-10 bg-white justify-center items-center p-12 "
          >
            <div className="flex flex-col gap-36 w-96 shadow-lg shadow-gray-500/50 p-12 h-full">
              <h1 className="text-center m-2 text-2xl font-bold">All REVIEW</h1>

              <div className="relative ">
                <StarIcon className="absolute top-2 left-1 opacity-40" />
                <input
                  type="text"
                  placeholder="Product Name"
                  className="w-full pl-8"
                  required
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                disabled={loading ? true : false}
                id="create-admin-btn"
                className=""
              >
                Get Reviews
              </Button>
            </div>
          </form>
          {reviews.length > 0 && (
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
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
