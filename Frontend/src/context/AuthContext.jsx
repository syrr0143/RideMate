import { createContext, useContext } from "react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import { generateNewTokenForUser } from "../utils/apiHandling";

const AuthContext = createContext(undefined);

function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAndRefreshToken = async () => {
    setLoading(true);
     try {
       if (token) {
         const decoded = jwtDecode(token);
         const currentTime = Date.now() / 1000; // Current time in seconds

         if (decoded.exp && decoded.exp < currentTime) {
           // Token is expired, get a new token
           console.log("Token has expired, refreshing...");
           const response = await generateNewTokenForUser(token);
           console.log("response is ", response);

           if (response?.token) {
             const newToken = response.token;
             setToken(newToken);
             localStorage.setItem("token", newToken);

             const newDecoded = jwtDecode(newToken);
             setUserRole(newDecoded.role);
           } else {
             throw new Error(response?.message);
           }
         } else {
           setUserRole(decoded.role);
         }
       } else {
         setUserRole(null); // No token, so no user role
       }
     } catch (error) {
       console.error("Error during token validation:", error);
       handleLogout(); // Logout if there is any error
     } finally {
       setLoading(false);
     }
   };
  useEffect(() => {
   

    checkAndRefreshToken();
  }, [token]); // Added `token` as a dependency

  function handleLogin(newToken) {
    setToken(newToken);
    localStorage.setItem("token", newToken);

    try {
      const decoded = jwtDecode(newToken);
      setUserRole(decoded.role);
    } catch (error) {
      console.error("Invalid token provided during login:", error);
    }
  }

  function handleLogout() {
    setToken(null); // Clear token in state
    setUserRole(null); // Clear user role
    localStorage.removeItem("token"); // Remove token from localStorage
  }

  return (
    <AuthContext.Provider
      value={{ handleLogin, handleLogout, token, userRole, loading,setLoading, checkAndRefreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
