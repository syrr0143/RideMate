import { createContext, useContext } from "react";
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext(undefined);

function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userRole, setUserRole] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserRole(decoded.role);
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token");
      }
    } else {
      setUserRole(null); // No token, so no user role
      setToken(null);
    }
    setLoading(false);
  }, [token]);

  function handleLogin(token) {
    setToken(token);
    localStorage.setItem("token", token);
  }

  function handleLogout() {
    setToken(null); // Clear token in state
    setUserRole(null); // Clear user role
    localStorage.removeItem("token"); // Remove token from localStorage
  }
  return (
    <AuthContext.Provider
      value={{ handleLogin, handleLogout, token, userRole, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
