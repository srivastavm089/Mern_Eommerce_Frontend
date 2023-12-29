import { Rating } from "@mui/material";
import React from "react";

const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,

    size: "large",
    readOnly: true,
    precision: 0.5,
  };
  return (
    <div className="border w-12/12  border-4 flex justify-evenly items-center gap-2 p-2  gap-5">
      <div className="flex flex-col items-center w-36">
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          className="w-20"
          alt="User"
        />
        <p className="whitespace-nowrap">{review.name}</p>
        <Rating classNames="whitespace-nowrap" {...options} />
      </div>

      <span className="w-10/12">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
