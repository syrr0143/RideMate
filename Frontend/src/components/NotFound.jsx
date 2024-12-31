import React from "react";
import { Navigate } from "react-router-dom";

const NotFoundPage = () => {
  console.log("on this page");
  return <Navigate to="/" replace />;
};

export default NotFoundPage;
