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
    <div className="flex flex-col mt-2 gap-4 border-2 shadow-xl border-gray-200 cursor-pointer rounded-xl max-w-lg mx-auto  p-4 bg-white ">
      <div className="m-2">
        <div>
          {/* Vehicle Info */}
          <div className="flex justify-between items-center">
            <div className="avatar">
              <div className="h-48 rounded-full">
                <img src={VehicleImageSrc["car"]} alt="Vehicle Image" />
              </div>
            </div>
            <div>
              <p className="text-md font-semibold text-gray-600 capitalize">
                Sumit Yadav
              </p>
              <p className="text-md font-bold text-xl uppercase">KA15AK00-0</p>
              <p className="text-md font-semibold capitalize text-gray-400">
                White Scorpio S-Presso LXi
              </p>
            </div>
          </div>

          {/* Destination Info */}
          <div className="flex items-center gap-4 border-t-2 pt-2 mt-2">
            <FaMapPin />
            <div>
              <p className="font-bold text-md inline mr-4 capitalize">
                Third Wave Coffee
              </p>
              <p className="font-medium text-sm text-gray-400 block capitalize">
                17th Cross Road, PWD Quarter, 1st Sector, HSR Layout, Bengaluru,
                Karnataka
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Info */}
      <div className="flex items-center gap-4 border-b-2 pb-2 mb-2 rounded-lg">
        <MdPayment />
        <div>
          <p className="font-bold text-md inline mr-4">₹{state.fare}</p>
          <p className="font-medium text-sm text-gray-400 block capitalize">
            G-Pay
          </p>
        </div>
      </div>

      {/* Razorpay Button */}
      <RazorpayButton rideData={rideData} />
    </div>
  );
};

export default MakePayment;
