import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Loader } from "../index";
import { Navigate, Outlet, Route, useNavigate } from "react-router-dom";
import Forbidden from "../../pages/Common/ForbiddenPage";

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
    navigate("https://ride-mate-five.vercel.app/", { replace: true });
    return null; // Stop further rendering after navigating
  }
  if (token && !allowedRoles.includes(userRole)) {
    return (
      <div>
        <Forbidden />
      </div>
    );
  }

  return <Outlet />;
};
const LoggedInProtectedRoute = ({ element }) => {
  const { token, userRole } = useAuth(); // Get token from auth context or state
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if the user is logged in (token exists)
    if (token) {
      if (userRole === "user") {
        navigate("/user/home", { replace: true });
      } else if (userRole === "captain") {
        navigate("/captain/home", { replace: true });
      }
    }
  }, [token, userRole, navigate]);

  // If no token (user is not logged in), show the page
  return !token ? element : null; // Prevent rendering `Navigate` directly
};

export { ProtectedRoute, LoggedInProtectedRoute };
