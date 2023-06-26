import React from 'react'

import { Navigate, Outlet } from "react-router-dom";

const Protected = () => {
  console.log("entering here after login")
    const token = localStorage.getItem("token")
    console.log("protected " + token);
  return (
    token ? <Outlet /> : <Navigate to='/'/>
  )
}

export default Protected