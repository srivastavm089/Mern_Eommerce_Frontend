import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {useLocation} from "react-router-dom"
import "./account.css"
import Loader from "./Loader";
import { loadUser } from "../redux/action/userAction";
const Account = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { error, loading, isAuthenticated , user } = useSelector(
    (state) => state.user
  );
  const checkHistory = useLocation();
  console.log(checkHistory)

  useEffect(() => {
   
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  return (
    <Fragment>
    {
        loading?   <Loader/>:
        <div className="flex flex-col justify-center gap-20 md:gap-56 mt-12 h-full m-12 md:flex-row ">
      <div className="flex flex-col items-center gap-10">
           <h1 className="text-5xl">My Profile</h1>
          {
            user && user.user &&   <img className="w-56 rounded-full h-56 md:h-80 md:w-80   profileImage" src={user.user.avatar.url} alt="logo"  />
          }
           <Link to="/account/update/me" className="bg-[tomato] text-white w-56 rounded md:w-96 h-10 flex justify-center items-center hover:bg-gray-800" style={{transition:'all 0.5s '}}>Edit Profile</Link>
      </div>

      <div className="flex flex-col gap-20">
         <div>
            <h1>Full Name</h1>
            {
              user &&   user.user && <i>{user.user.name}</i>
            }
            
         </div>
         <div>
            <h1>Full Name</h1>
            {
               user &&  user.user && <i>{user.user.email}</i>
            }
            
         </div>
         <div>
            <h1>Joined on </h1>
            
            {
               user && user.user && <i>{user.user.JoinedOn.slice(0,10)}</i>
            }
            
         </div>
         <div className="flex flex-col gap-2 w- md:w-96">
            <Link to="/account/orders" className="rounded flex justify-center items-center bg-gray-600  text-white p-2 hover:bg-gray-700" style={{transition:'all 0.5s '}}>My Orders</Link>
            <Link to="/account/update_password" className=" rounded flex justify-center items-center bg-gray-600 text-white  p-2  hover:bg-gray-700" style={{transition:'all 0.5s '}}>Change Password</Link>
         </div>
      </div>
  </div>
    }


    </Fragment>
  );
};

export default Account;
