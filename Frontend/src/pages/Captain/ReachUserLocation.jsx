import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { MdTurnLeft } from "react-icons/md";
import { FaAngleUp } from "react-icons/fa";

import useSocket from "../../hooks/useSocket";
import useAuth from "../../hooks/useAuth";
import { baseUrl } from "../../config/Api.js";
import { Button } from "../../components/index.jsx";
import Modal from "../../components/Captain_Component/Modal";
import Map from "../../components/Map.jsx"; // Update the import path according to your file structure
import axios from "axios";

export default function ReachUserLocation() {
  const navigate = useNavigate();
  const { socket } = useSocket();
  const location = useLocation();
  const { token } = useAuth();

  const [isConfirmRideOpen, setIsConfirmRideOpen] = useState(false);
  const rideData = location?.state?.rideData;

  console.log(rideData);
  const { userRole } = useAuth();
  const [isRideFinish, setIsRideFinish] = useState(false);

  const handleLocationUpdate = ({ latitude, longitude }) => {
    // Handle location updates if needed
  };
  const startRide = async (otp) => {
    try {
      const response = await axios.post(
        `${baseUrl}/captain/confirm-otp`,
        { rideId: rideData?._id, otp: otp },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      //  TODO
      setIsConfirmRideOpen(false);
      navigate("/captain/live-track", {
        state: { rideData, destinationCoords: rideData?.destinationCoords },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelRide = () => {
    setIsConfirmRideOpen(false);
  };

  return (
    <div className="h-screen w-full max-w-md mx-auto bg-black text-white flex flex-col relative">
      {/* Top Navigation Bar */}
      <div className="flex items-center px-4 py-3 backdrop-blur-sm z-10">
        <button className="p-2">
          <MdTurnLeft className="font-bold text-4xl" />
        </button>
        <div className="ml-2">
          <h1 className="text-lg font-medium">Gracechurch Street</h1>
          <p className="text-md text-gray-300 ">40 m</p>
        </div>
      </div>

      {/* Map Component */}
      <Map
        destinationCoords={rideData?.pickupCoords}
        onLocationUpdate={handleLocationUpdate}
      />

      {/* Bottom Bar */}
      <div className="bg-yellow-400 text-black p-4 flex items-center justify-between">
        <FaAngleUp />
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold">4 KM AWAY</span>
        </div>
        <Button
          name={"Start Ride"}
          onClick={() => setIsConfirmRideOpen(true)}
          style={"bg-green-500 text-white font-bold text-lg"}
        />
      </div>
      <Modal
        message={"Ask user for OTP"}
        OnAccept={startRide}
        status={rideData?.status}
        closeModal={handleCancelRide}
        isModalOpen={isConfirmRideOpen}
        showForm={true}
        rideData={rideData}
      />
    </div>
  );
}
