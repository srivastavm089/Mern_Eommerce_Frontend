import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Success = () => {
  localStorage.removeItem("cartItems");
  sessionStorage.removeItem("orderInfo");

  return (
    <div className="flex justify-center h-screen items-center">
      <div className="flex flex-col items-center gap-5">
        <CheckCircleIcon
          className="text-[tomato]"
          style={{ fontSize: "25vh" }}
        />
        <Typography variant="h5">
          Your Order has been placed successfully
        </Typography>
        <Link
          to="/orders"
          className="bg-gray-600 text-white pl-12 pr-12 pb-4 pt-4 hover:bg-gray-900"
        >
          View Orders
        </Link>
      </div>
    </div>
  );
};

export default Success;
