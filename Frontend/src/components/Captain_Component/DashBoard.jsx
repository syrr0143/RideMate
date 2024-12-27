import React, { useEffect, useState } from "react";

import { IoMdTime, IoMdSpeedometer } from "react-icons/io";
import { GiPathDistance } from "react-icons/gi";
import { FiRefreshCcw } from "react-icons/fi";
import { BrandLogo, Button } from "../index";
import AcceptRidePopup from "./AcceptRidePopup";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import RideStatusBadge from "../RideStatusBadge";

const VehicleImageSrc = {
  car: "/LandingPage/car.webp",
  auto: "/LandingPage/auto.jpeg",
  bike: "/LandingPage/bike.jpeg",
};

const DashBoard = () => {
  const { token, user } = useAuth();
  const [rides, setRides] = useState(null);

  const handleRefresh = async () => {
    try {
      const ridesAvailable = await axios.get(
        "http://localhost:3000/api/v1/captain/available-rides",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRides(ridesAvailable?.data.rideAvailable);
    } catch (error) {
      console.log(error);
    }
    // window.location.reload();
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
          <p className="text-lg font-bold capitalize">{user?.fullName}</p>
        </div>
        <div>
          <img
            className="w-24 h-24 rounded-full"
            src={VehicleImageSrc[user?.vehicle.vehicleType]}
            alt=""
          />
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
      {rides ? (
        <div className="mt-4">
          <p className="text-xl font-bold mb-4">Available Rides</p>
          <div className="carousel overflow-x-scroll max-w-[98vw]">
            {rides.map((ride) => {
              return (
                <div className="carousel-item mx-4 mb-4 mt-4 rounded-lg shadow-2xl border-2 ">
                  <div class="max-w-[80vw] rounded overflow-hidden  bg-white ">
                    <div class="px-6 py-4">
                      <div class="font-bold text-xl mb-2">
                        <RideStatusBadge status={ride.status} />
                      </div>
                      <p class="text-black text-lg">
                        <span className="font-bold ">Fare </span>:{" "}
                        ₹ {ride.fare}
                      </p>
                      <p class="text-black text-lg">
                        <span className="font-bold ">Source </span>:{" "}
                        {ride.pickup.split(",")[0]}
                      </p>
                      <p class="text-black text-lg">
                        <span className="font-bold ">Destination </span>:{" "}
                        {ride.destination.split(",")[0]}
                      </p>
                     
                      <p class="text-black text-lg">
                        <span className="font-bold ">Distance </span>:{" "}
                        {ride.distance} KM
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        "No Ride Available"
      )}
    </div>
  );
};

export default DashBoard;
