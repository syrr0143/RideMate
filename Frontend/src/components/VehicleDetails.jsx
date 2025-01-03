import React from "react";
import { FaUser } from "react-icons/fa";
import { getCurrentTime24Hour } from "../utils/time.js";

const VehicleDetails = ({
  vehicleType,
  fare,
  capacity,
  currentTime = getCurrentTime24Hour(),
  estimatedTravelTime,
  otherDetails,
  onClick,
}) => {
  const VehicleImageSrc = {
    car: "/LandingPage/car.webp",
    auto: "/LandingPage/auto.jpeg",
    bike: "/LandingPage/bike.jpeg",
  };

  return (
    <div
      onClick={onClick}
      className="flex mt-2 active:border-black shadow-xl cursor-pointer border-gray-200 border-2 rounded-xl p-4 shadow-"
    >
      <div className="w-2/6">
        <img
          src={VehicleImageSrc[vehicleType]}
          className="h-16 rounded-full"
          alt=""
        />
      </div>
      <div className="flex flex-col w-3/6 ml-0 mr-0">
        <div className="items-center flex ">
          <p className="font-bold text-lg inline mr-4">UberGo</p>

          <FaUser className="inline mr-2" />
          <span className="text-xl font-bold">{capacity}</span>
        </div>
        <p className="font-semibold text-sm">
          {parseInt(estimatedTravelTime)} mins away <span>{currentTime}</span>
        </p>
        <p className="text-gray-500 text-sm font-semibold">
          Affordable, compact ride
        </p>
      </div>
      <div className="w-1/6 flex justify-end">
        <p
          className="font-bold text-lg text-right"
          style={{ wordBreak: "break-word", whiteSpace: "normal" }}
        >
          ₹{fare}
        </p>
      </div>
    </div>
  );
};

export default VehicleDetails;
