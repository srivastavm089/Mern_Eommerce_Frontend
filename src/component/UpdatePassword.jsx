import React, { Fragment, useEffect, useState } from "react";
import { CgBoy } from "react-icons/cg";
import { CiMail } from "react-icons/ci";
import "../component/user/register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_PASSWORD_RESET } from "../redux/constant/login";
import KeyIcon from "@mui/icons-material/Key";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import {
  resetUserUpdate,
  updatePassword,
  clearErrors,
  loadUser,
} from "../redux/action/userAction";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
const UpdatePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, isAuthenticated, user, loading, isUpdated } = useSelector(
    (state) => state.user
  );
  const d = useSelector((state) => state.userUpdate);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    if (isUpdated) {
      toast.success("Profile Updated Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(resetUserUpdate());

      navigate("/account");
    }
  }, [isUpdated, error]);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
 const updateHandler = ()=>{
    const passwords = {
        oldPassword,
        newPassword,
        confirmPassword
    }
    dispatch(updatePassword(passwords))

 }
  return (
    <Fragment>
      <ToastContainer />
      {loading ? (
        <Loader />
      ) : (
        <div className="flex justify-center bg-gray-200 ">
          <div className="flex flex-col gap-12 w-96 border bg-white p-8 m-20">
            <div className="flex justify-center">
              <h1 className="border-b pb-1">Update Profile Password</h1>
            </div>
            <div className="relative ">
              <input
                type="text"
                className="w-full pl-8"
                value={oldPassword}
                placeholder="Old Password"
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <KeyIcon className="absolute left-1  top-2 text-2xl" />
            </div>
            <div className="relative">
              <input
                type="text"
                className="w-full pl-8"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <LockOpenIcon className="absolute top-2 left-1 text-2xl opacity-60" />
            </div>

            <div className="relative">
              <input
                type="text"
                className="w-full pl-8"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <LockIcon className="absolute top-2 left-1 text-2xl opacity-60" />
            </div>
            <div className="flex justify-center">
              <button
                className="bg-[tomato] text-white pl-12 pr-12 pt-2 pb-2 hover:bg-gray-600 rounded"
                id="updateProfileBtn"
               onClick={()=> updateHandler()}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UpdatePassword;
