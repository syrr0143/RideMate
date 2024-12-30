import React, { useEffect, useState } from "react";

import { Loader, BottomNavbar } from "../../components/index.jsx";

import { Outlet, useLocation } from "react-router-dom";
import { useHidden } from "../../hooks/useHidden.jsx";
import useAuth from "../../hooks/useAuth.jsx";
import useSocket from "../../hooks/useSocket.jsx";
import Map from "../../components/Map.jsx";

const Home = () => {
  const { hidden, setHidden } = useHidden();
  const location = useLocation();
  const { token, loading, user, checkAndRefreshToken } = useAuth();
  const { socket } = useSocket();

  useEffect(() => {
    if (user?._id && user?.role) {
      socket.emit("join", { userType: user?.role, userId: user?._id });
    }

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            socket.emit("update-user-location", {
              userId: user?._id,
              location: {
                latitude,
                longitude,
              },
            });
          },
          (error) => {
            console.error("Error fetching location: ", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };
    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();
    return () => clearInterval(locationInterval);
  }, [user, socket]);

  useEffect(() => {
    checkAndRefreshToken();
  }, [location.pathname]);
  if (loading) {
    return <Loader />;
  }
  const handleLocationUpdate = ({ latitude, longitude }) => {
    // Handle location updates if needed
    console.log("Current position:", latitude, longitude);
  };
  return (
    <>
      <div className="min-h-screen">
        <div className={` ${hidden ? "hidden" : ""} h-[62vh]`}>
          <Map onLocationUpdate={handleLocationUpdate} />
          {/* <BrandLogo style={"absolute top-0 left-0 m-0 ml-2"} /> */}
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
