import React, { useState } from "react";
import VehicleDetails from "../components/VehicleDetails";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaMapPin, FaUser } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import BrandLogo from "../components/BrandLogo";
import Button from "../components/Button";
const ConfirmRide = ({ userCurrentLocation, userDestinationLocation }) => {
  const VehicleImageSrc = {
    car: "/LandingPage/car.webp",
    auto: "/LandingPage/auto.jpeg",
    bike: "/LandingPage/bike.jpeg",
  };
  const [loading, setLoading] = useState(false);
  const vehicle = {capacity: 2,
                currentTime: "15:24",
                estimatedTravelTime: 5,
                fare: 193,
                vehicleType: "auto",}
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/home/driver-assigned",{state:vehicle});
    }, 3000);
  };
  return (
   
    <div className="flex flex-col mt-2 gap-4 cursor-pointer rounded-xl p-4">
      <p className="text-xl font-bold mb-2 text-center">
        {loading ? "Looking For Nearby Driver..." : "Conform Your Ride"}
      </p>
      <div className="border-b-2 mb-2 flex justify-center">
        <img
          src={VehicleImageSrc["bike"]}
          className="h-32 rounded-full "
          alt=""
        />
      </div>

      <div className="items-center flex gap-4 border-b-2 rounded-lg p-2">
        <FaMapMarkerAlt />
        <div>
          <p className="font-bold text-md inline mr-4 capitalize"> 562/11-A </p>
          <p className="font-medium text-sm text-gray-400 block  capitalize">
            {" "}
            Mallupur , kerakat, jaunpur{" "}
          </p>
        </div>
      </div>
      <div className="items-center flex gap-4  border-b-2 rounded-lg p-2">
        <FaMapPin />
        <div>
          <p className="font-bold text-md inline mr-4 capitalize">
            {" "}
            Third wave coffee{" "}
          </p>
          <p className="font-medium text-sm text-gray-400 block  capitalize">
            {" "}
            17th cross road, pwd quarter, 1st sector, HSR layout, bengaluru ,
            karaatak{" "}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4  border-b-2 rounded-lg p-2">
        <MdPayment />
        <div>
          <p className="font-bold text-md inline mr-4"> ₹{state.fare} </p>
          <p className="font-medium text-sm text-gray-400 block  capitalize">
            {" "}
            G-pay{" "}
          </p>
        </div>
      </div>

      <Button
        onClick={handleClick}
        disabled={loading}
        loading={loading}
        name={"Confirm Ride"}
        style={"bg-green-500 text-white cursor-pointer font-bold text-md"}
      />
    </div>
  );
};

export default ConfirmRide;
