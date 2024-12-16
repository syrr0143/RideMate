import React from "react";
import useAuth from "../../hooks/useAuth";
import Loader from "../Loader";
import { Outlet, useNavigate } from "react-router-dom";
import Forbidden from "../../pages/ForbiddenPage";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const navigate = useNavigate();
  const { userRole, token, loading } = useAuth();
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (userRole === null || !token) {
    navigate("/",{replace:true});
    return null;
  }
  if (!allowedRoles.includes(userRole)) {
    return (
      <div>
        <Forbidden />
      </div>
    );
  }

  return <Outlet/>;
};

export default ProtectedRoute;
