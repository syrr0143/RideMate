import React from "react";
import BottomNavbar from "../components/BottomNavbar.jsx";
import TopNavbar from "../components/TopNavbar.jsx";
import useAuth from "../hooks/useAuth.jsx";
import Button from "../components/Button.jsx";
import { Link } from "react-router-dom";

const Home = () => {
  const { token, handleLogin, handleLogout } = useAuth();
  return (
    <div>
      <TopNavbar />
      <Button
        onClick={token ? handleLogout : handleLogin}
        name={token ? "logout" : "login"}
      />
      <Link to={"/location-consent"}>consent</Link>
      <BottomNavbar />
    </div>
  );
};

export default Home;
