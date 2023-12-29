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
import { useParams } from "react-router-dom";
import {
  resetUserUpdate,
  updatePassword,
  clearErrors,
  loadUser,
  resetPassword,
} from "../redux/action/userAction";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
const ResetPassword = () => {
  const parmasData = useParams();
  console.log(parmasData.token);
  const dispatch = useDispatch();
  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const forgetPassword = (e) => {
    e.preventDefault()
    dispatch(resetPassword(parmasData.token, password , confirmPassword));
  };
 console.log(error)
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
    }
  }, [dispatch, error, navigate, success]);

  useEffect(() => {
    if (success) {
      toast.success("password updated successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(()=>{
        navigate("/login"); 
      },3000)
     
    }
  }, [dispatch, success]);
  return (
    <Fragment>
      <ToastContainer />
      {loading ? (
        <Loader />
      ) : (
        <div className="flex justify-center bg-gray-200 ">
          <div className="flex flex-col gap-12 w-96 border bg-white p-8 m-20">
            <div className="flex justify-center">
              <h1 className="border-b pb-1">Reset Password</h1>
            </div>
            <form
              action=""
              className="flex flex-col  gap-10"
              onSubmit={forgetPassword}
            >
              <div className="relative ">
                <input
                  type="text"
                  className="w-full pl-8"
                  value={password}
                  placeholder="new password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <KeyIcon className="absolute left-1  top-2 text-2xl" />
              </div>
              <div className="relative">
                <input
                  type="text"
                  className="w-full pl-8"
                  placeholder="New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <LockOpenIcon className="absolute top-2 left-1 text-2xl opacity-60" />
              </div>

              <div className="flex justify-center">
                <button
                  className="bg-[tomato] text-white pl-12 pr-12 pt-2 pb-2 hover:bg-gray-600 rounded"
                  id="updateProfileBtn"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ResetPassword;
