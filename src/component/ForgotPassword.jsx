import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmailIcon from "@mui/icons-material/Email";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";
import MetaData from "./MetaData";
import { forgotPassword } from "../redux/action/userAction";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { error, loading, message } =
    useSelector((state) => state.forgotPassword);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    dispatch(forgotPassword(email));
  };

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
    

  }, [dispatch, error]);

useEffect(()=>{
    if (message) {
        toast.success(message, {
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
}, [dispatch, message])
  return (
    <Fragment>
      <MetaData title="Forgot Password " />
      <ToastContainer/>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex justify-center bg-gray-200 ">
          <div className="flex flex-col gap-12 w-96 border bg-white p-8 m-20">
            <div className="flex justify-center  items-center ">
              <h1 className="w-56 text-center border-b-2 pb-1 text-xl opacity-50">
                Forgot Password
              </h1>
            </div>

            <form
              action=""
              onSubmit={forgotPasswordSubmit}
              className="flex flex-col gap-5"
            >
              <div className="relative ">
                <input
                  type="text"
                  className="w-full pl-8 h-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
                <EmailIcon className="absolute left-1  top-3 text-2xl opacity-50" />
              </div>

              <div className="flex justify-center">
                <button
                  className="bg-[tomato] text-white pl-12 pr-12 pt-2 pb-2 hover:bg-gray-600 rounded w-full"
                  id="updateProfileBtn"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ForgotPassword;
