import React, { Fragment, useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import Login from "./user/Login"
const ProtectedRoute = (props) => {

  
    const navigate = useNavigate()
 useEffect(()=>{
    const check = localStorage.getItem("token")
 if(!check){
    navigate("/login")
 }
 }, [props])
  return (
 <Fragment>

   
        <props.Comp/>
 
 </Fragment>
  )
}

export default ProtectedRoute