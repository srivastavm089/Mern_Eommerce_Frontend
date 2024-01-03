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
  getUsers,
  clearErrors,
  deleteUserAdmin,
} from "../redux/action/userAction";
import { DELETE_USER_RESET } from "../redux/constant/login";
const AdminAllUser = () => {
  const dispatch = useDispatch();

  const { error, users } = useSelector((state) => state.users);
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.user);
  const deleteUserHandler = (e, id) => {
    e.preventDefault();
    dispatch(deleteUserAdmin(id));
  };
  console.log(users);
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
      toast.success(message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch({ type: DELETE_USER_RESET });
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
    dispatch(getUsers());
  }, [dispatch, error, deleteError, isDeleted, message]);
  const columns = [
    { field: "id", headerName: "User ID", minWidth: 200, flex: 0.5 },
    { field: "email", headerName: "Email", minWidth: 350, flex: 1 },
    { field: "name", headerName: "Name", minWidth: 150, flex: 0.3 },
    { field: "role", headerName: "Role", minWidth: 270, flex: 0.3 , cellClassName: (params) => {
      return params.value === "admin" ? "text-green-500" : "text-red-500";
    }, },
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
              to={`/admin/user/${params.id}`}
            >
              <EditIcon />
            </Link>
            <Button
              className="hover:text-[tomato]"
              onClick={(e) => deleteUserHandler(e, params.id)}
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <ToastContainer />
      <MetaData title="ALL USER" />

      <div className="grid grid-cols-1 lg:grid-cols-5 ">
        <SideBar />

        <div className="col-span-4 border">
          <h1 className="text-center m-2 text-2xl font-bold">All Users</h1>
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

export default AdminAllUser;
