import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
const Search = () => {
const navigate = useNavigate()
  const [keyword, setKeyword] = useState("");
 const searchSubmitHandler =(e)=>{
    e.preventDefault();
  if(keyword.trim()){
    navigate(`/searchProduct/${keyword}`)
  }else{
    navigate(`/products`)
  }
 }
  return (
    <Fragment>
      {" "}
      <form  onSubmit={searchSubmitHandler} className="w-[100vw] h-[100vh] max-w-full flex justify-center items-center bg-gray-300  ">
        <input
          type="text"
          className="w-[60vw] h-[8vh] outline-none "
          placeholder="Search a Product....."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" className="h-[8vh] bg-[tomato] border-none text-white pl-10 pr-10 cursor-pointer hover:bg-blue-500" />
      </form>
    </Fragment>
  );
};

export default Search;
