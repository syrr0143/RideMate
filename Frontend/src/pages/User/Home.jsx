import React, { useEffect, useState } from "react";

import { Loader, BottomNavbar } from "../../components/index.jsx";

import { Outlet, useLocation } from "react-router-dom";
import { useHidden } from "../../hooks/useHidden.jsx";
import useAuth from "../../hooks/useAuth.jsx";

const Home = () => {
  const { hidden, setHidden } = useHidden();
  const location = useLocation();
  const { checkAndRefreshToken, loading } = useAuth();

  useEffect(() => {
    checkAndRefreshToken();
  }, [location.pathname]);
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className="min-h-screen">
        <div className={` ${hidden ? "hidden" : ""} h-[62vh]`}>
          {/* <BrandLogo style={"absolute top-0 left-0 m-0 ml-2"} /> */}
          <img
            src="/LandingPage/map.jpeg"
            alt=""
            className="object-cover h-full w-full"
          />
        </div>
        <div className="pb-20">
          <div className="overflow-scroll">
            <Outlet />
          </div>
        </div>
      </div>
      <BottomNavbar />
    </>
  );
};

export default Home;
