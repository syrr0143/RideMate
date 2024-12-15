import React, { createContext, useEffect, useState } from "react";
import { getUserProfile } from "../utils/apiHandling";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);
  }, [token]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;

      try {
        const response = await getUserProfile(token);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        //  logout(); // Clear token and user this was causing the token cleaning
      }
    };

    if (token) {
      fetchProfile(); // Ensure this is only called when token exists
    }
  }, [token]);

  const login = (tokens) => {
    if (tokens) {
      localStorage.setItem("token", tokens);
      console.log("Token saved:", localStorage.getItem("token"));
    } else {
      console.log("No token provided");
    }
    setToken(tokens);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
