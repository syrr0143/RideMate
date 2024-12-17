import React from "react";
import useAuth from "../../hooks/useAuth";
import Loader from "../Loader";
import { Navigate, Outlet, Route, useNavigate } from "react-router-dom";
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
    navigate("/", { replace: true });
    return null;
  }
  if (!allowedRoles.includes(userRole)) {
    return (
      <div>
        <Forbidden />
      </div>
    );
  }

  return <Outlet />;
};
const LoggedInProtectedRoute = ({ element }) => {
  const { token } = useAuth(); // Get token from auth context or state

  // If user is logged in (i.e., token exists), redirect them away from these routes
  if (token) {
    return <Navigate to="/location-consent" />; // Redirect to a dashboard or another page for logged-in users
  }

  // If no token (user is not logged in), show the page
  return element;
};

export { ProtectedRoute, LoggedInProtectedRoute };
