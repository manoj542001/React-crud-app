import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  //get login data for create private route
  const privateFile = JSON.parse(localStorage.getItem("logged_user"));
  return privateFile ? <Outlet /> : <Navigate to={"/"} />;
};

export default PrivateRoute;
