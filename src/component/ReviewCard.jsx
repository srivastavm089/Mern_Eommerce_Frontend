import React from "react";
import ReactStars from "react-rating-stars-component";
const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: "rgba(20, 20, 20,0.1)",
    activeColor: "red",
    value: review.rating,
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
  };
  return (
    <div className="border w-12/12  border-4 flex justify-evenly items-center gap-2 p-2  gap-5" >
      
      <div className="flex flex-col items-center w-36" >
      <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" className="w-20" alt="User" />
      <p className="whitespace-nowrap">{review.name}</p>
      <ReactStars classNames="whitespace-nowrap" {...options} />
      </div>
      
      <span className="w-10/12">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
