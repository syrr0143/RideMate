import React, { useState } from "react";

import { IoMdTime, IoMdSpeedometer } from "react-icons/io";
import { GiPathDistance } from "react-icons/gi";
import { FiRefreshCcw } from "react-icons/fi";
import { BrandLogo } from "../index";
import AcceptRidePopup from "./AcceptRidePopup";
import useAuth from "../../hooks/useAuth";

 const VehicleImageSrc = {
   car: "/LandingPage/car.webp",
   auto: "/LandingPage/auto.jpeg",
   bike: "/LandingPage/bike.jpeg",
};
 
const DashBoard = () => {
  const { captain } = useAuth();
  const handleRefresh = () => {
    window.location.reload();
  };
  return (
    <div className="ml-2 me-2 mt-2">
      <BrandLogo style={"absolute top-0 ml-2 mt-4"} />
      <div className="flex flex-row items-center justify-between mb-4">
        <p className="font-bold text-xl text-center ">Today's Report</p>
        <div className="text-2xl p-2 bg-gray-300 rounded-full">
          <FiRefreshCcw onClick={handleRefresh} />
        </div>
      </div>
      <div className="flex flex-row justify-between bg-gray-200 rounded-lg p-2">
        <div className="avatar flex flex-col  items-center">
          <div className="w-16 rounded-full mb-2">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="Tailwind-CSS-Avatar-component"
            />
          </div>

          <p className="text-lg font-bold capitalize">{captain?.fullName}</p>
        </div>
        <div>
          <img className="w-24 h-24 rounded-full" src={VehicleImageSrc[captain?.vehicle.vehicleType]} alt="" />
        </div>
        <div className="text-center items-center flex flex-col justify-center">
          <p className="text-xl font-bold capitalize ">₹500</p>
          <small className="font-extralight text-gray-500">Earned</small>
        </div>
      </div>
      <div className="flex flex-row bg-gray-200 rounded-lg mt-2 justify-around  p-2">
        <div className="flex-row text-center">
          <IoMdTime className="text-4xl block m-auto" />
          <p className="font-bold text-lg ">10.2</p>
          <small>Hours Spent</small>
        </div>
        <div className="flex-row  text-center">
          <IoMdSpeedometer className="text-4xl block m-auto" />
          <p className="font-bold text-lg ">10.2</p>
          <small>Average Speed</small>
        </div>
        <div className="flex-row text-center">
          <GiPathDistance className="text-4xl block m-auto" />
          <p className="font-bold text-lg ">10.2</p>
          <small>Distance Covered</small>
        </div>
      </div>
      <AcceptRidePopup />
    </div>
  );
};

export default DashBoard;
