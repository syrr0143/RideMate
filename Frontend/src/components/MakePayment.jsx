import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMapPin } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { Button } from "../components/index";
import RazorpayButton from "./RazorpayButton";

const MakePayment = ({ userCurrentLocation, userDestinationLocation }) => {
  const VehicleImageSrc = {
    car: "/LandingPage/car.webp",
    auto: "/LandingPage/auto.jpeg",
    bike: "/LandingPage/bike.jpeg",
  };
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //   const location = useLocation();
  //   const { state } = location;
  const state = {
    capacity: 2,
    fullName: "sumit yadav",
    currentTime: "15:24",
    estimatedTravelTime: 5,
    fare: 193,
    vehicleType: "auto",
  };
  const rideData = {
    capacity: 2,
    fullName: "sumit yadav",
    currentTime: "15:24",
    estimatedTravelTime: 5,
    fare: 193,
    vehicleType: "auto",
  };

  return (
    <div className="flex flex-col mt-2 gap-4 cursor-pointer rounded-xl p-4">
      <div className="m-2">
        <div>
          <div className="flex justify-between">
            <div className="avatar">
              <div className="w-20 h-20 rounded-full">
                <img src={VehicleImageSrc["car"]} alt="" />
              </div>
            </div>
            <div>
              <p className="text-md font-semibold text-gray-400 capitalize">
                sumit yadav
              </p>
              <p className="text-md font-bold text-xl uppercase">ka15ak00-0</p>
              <p className="text-md font-semibold capitalize text-gray-400">
                white scorpio s-presso lxi
              </p>
            </div>
          </div>
          <div className="items-center flex gap-4  border-t-2  p-2">
            <FaMapPin />
            <div>
              <p className="font-bold text-md inline mr-4 capitalize">
                {" "}
                Third wave coffee{" "}
              </p>
              <p className="font-medium text-sm text-gray-400 block  capitalize">
                {" "}
                17th cross road, pwd quarter, 1st sector, HSR layout, bengaluru
                , karaatak{" "}
              </p>
            </div>
          </div>
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
      <RazorpayButton rideData={rideData} />
    </div>
  );
};

export default MakePayment;
