import React, { Fragment, useEffect, useState } from "react";
import { CgBoy } from "react-icons/cg";
import { CiMail } from "react-icons/ci";
import "../component/user/register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  loadUser,
  resetUserUpdate,
  updateUser,
} from "../redux/action/userAction";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import MetaData from "./MetaData";
const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, isAuthenticated, user, loading, isUpdated } = useSelector(
    (state) => state.user
  );
  const d = useSelector((state) => state.userUpdate);
  useEffect(() => {
    if(!isAuthenticated){
      navigate("/login")
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
      dispatch(loadUser());

      navigate("/account");
    }
  }, [isUpdated, error, ]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(
    "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg"
  );

  useEffect(() => {
    user && user.user && setName(user.user.name);
    user && user.user && setEmail(user.user.email);
    user && user.user && setAvatar(user.user.avatar.url);
  }, [user]);
  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      if (reader.readyState == 2) {
        setAvatar(reader.result);
      }
    };
  };

  const updateHandler = () => {
    const userData = {
      name,
      email,
      avatar,
    };

    dispatch(updateUser(userData));
  };
  return (
    <Fragment>
      <MetaData title="Update Profile"/>
      <ToastContainer />
      {loading ? (
        <Loader />
      ) : (
        <div className="flex justify-center bg-gray-200 ">
          <div className="flex flex-col gap-12 w-96 border bg-white p-8 m-20">
            <h1>Update Profile</h1>
            <div className="relative ">
              <input
                type="text"
                className="w-full pl-8"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <CiMail className="absolute left-1  top-2 text-2xl" />
            </div>
            <div className="relative">
              <input
                type="text"
                className="w-full pl-8"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <CgBoy className="absolute top-2 left-1 text-2xl opacity-60" />
            </div>

            <div className="flex items-center gap-2">
              <img className="rounded-full w-12 h-12" src={avatar} alt="logo" />
              <input
                type="file"
                accept="image/*"
                id="file"
                onChange={(e) => imageHandler(e)}
              />
            </div>

            <div className="flex justify-center">
              <button
                className="bg-[tomato] text-white pl-12 pr-12 pt-2 pb-2 hover:bg-gray-600 rounded"
                id="updateProfileBtn"
                onClick={updateHandler}
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default EditProfile;
