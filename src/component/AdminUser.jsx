import React from "react";
import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../redux/action/productAction";
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "./MetaData";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";

import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SideBar from "./SideBar";
import { NEW_PRODUCT_RESET } from "../redux/constant/product";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDetails, updateUser } from "../redux/action/userAction";
import { UPDATE_USER_RESET } from "../redux/constant/login";
const AdminUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const categories = [
    { value: "Laptop", label: "Laptop", checked: false },
    { value: "SmartPhones", label: "SmartPhones", checked: false },
    { value: "Appliance", label: "Appliance", checked: true },
    { value: "Grocery", label: "Grocery", checked: false },
    { value: "Electronics", label: "Electronics", checked: false },
  ];

  const { loading, error, user } = useSelector((state) => state.userDetail);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.user);

  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      console.log(user.name);
      setName(user.name);
      setEmail(user && user.email);
      setRole(user.role);
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

    if (updateError) {
      toast.error(updateError, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(dispatch(clearErrors()))
    }
    if (isUpdated) {
      toast.success("user updated successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch({ type:  UPDATE_USER_RESET });
    }
  }, [dispatch, error, navigate, updateError, isUpdated, user]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(id, myForm));
  };

  return (
    <Fragment>
      <MetaData title="Update User" />
      <ToastContainer />

      <div className="grid grid-cols-1 lg:grid-cols-5">
        <SideBar />
        <div className="col-span-4 border bg-gray-200 flex justify-center items-center">
          <form
            action=""
            encType="multipart/form-data"
            onSubmit={updateUserSubmitHandler}
            className="flex flex-col gap-3 bg-white w-full lg:w-auto  p-12"
          >
            <h1 className="text-2xl font-bold">Update User</h1>
            <div className="relative">
              <PersonIcon className="absolute top-2 left-1 opacity-40" />
              <input
                type="text"
                placeholder="name"
                className="w-full pl-8"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="relative">
              <MailOutlineIcon className="absolute top-2 left-1 opacity-40" />
              <input
                type="email"
                placeholder="email"
                required
                className="w-full pl-8"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <VerifiedUserIcon className="absolute top-2 left-1 opacity-40" />
              <select
                name=""
                id=""
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full pl-8"
              >
                <option value="">Choose Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            <Button
              type="submit"
              disabled={
                updateLoading ? true : false || role === "" ? true : false
              }
              id="create-admin-btn"
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminUser;
