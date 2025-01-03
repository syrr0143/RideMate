import React, { useEffect } from "react";
import { FaStar } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import { MdHealthAndSafety, MdEmergencyShare } from "react-icons/md";
import { IoCallSharp } from "react-icons/io5";
import { FaMapPin } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import useSocket from "../hooks/useSocket";
const DriverAssigned = () => {
  const { socket } = useSocket();
  const navigate = useNavigate();
  const location = useLocation();
  const driverDetails = location.state?.CaptainAssigned;
  const rideDetails = location.state?.ride;
  const otp = location.state?.otp;

  useEffect(() => {
    socket.on("otp-success", (ride) => {
      navigate("/user/live-track", {
        state: {
          CaptainAssigned: ride?.captain,
          ride: ride,
          destinationCoords: ride?.destinationCoords,
        },
      });
    });
  }, [socket, otp, navigate]);

  return (
    <div className="m-4">
      {/* OTP Section */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-bold">OTP for the ride is</p>
        <p className="bg-black rounded text-lg font-bold text-white p-3">
          {otp}
        </p>
      </div>

      {/* Driver Info Section */}
      <div className="flex flex-col justify-between md:flex-row gap-4 items-center mb-6">
        {/* Avatar Section */}
        <div className="avatar flex-shrink-0 mb-4 md:mb-0 gap-8">
          <div className="w-24 h-24 rounded-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="Driver"
              className="object-cover"
            />
          </div>
          {/* Driver Details */}
          <div className="flex flex-col items-start md:items-start text-center md:text-left">
            <p className="text-md font-semibold text-gray-400 capitalize">
              {driverDetails?.fullName}
            </p>
            <p className="text-md font-bold text-xl uppercase">
              {driverDetails?.vehicle.numberPlate}
            </p>
            <p className="text-md font-semibold capitalize text-gray-400">
              {driverDetails?.vehicle.vehicleType}
            </p>
            <p className="text-md font-semibold capitalize text-gray-400 items-center flex gap-2">
              <span>
                <FaStar />
              </span>
              4.9
            </p>
          </div>
        </div>

        <div>
          <div className="flex justify-around items-center p-4 flex-wrap gap-4 md:flex-row">
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-gray-200 text-blue-600 rounded-full p-4">
                <MdHealthAndSafety size={24} />
              </div>
              <p className="text-center text-sm font-bold text-gray-700 capitalize">
                Safety
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-gray-200 text-blue-600 rounded-full p-4">
                <MdEmergencyShare size={24} />
              </div>
              <p className="text-center text-sm font-bold text-gray-700 capitalize">
                Share my trip
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-gray-200 text-blue-600 rounded-full p-4">
                <IoCallSharp size={24} />
              </div>
              <p className="text-center text-sm font-bold text-gray-700 capitalize">
                Call driver
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="mt-2">
        <label className="input input-bordered flex items-center gap-2 w-full">
          <input
            type="text"
            className="grow text-gray-600"
            placeholder="Send Message..."
          />
          <IoIosSend className="text-2xl" />
        </label>
      </div>

      {/* Destination Section */}
      <div className="items-center flex gap-4 border-t-2 p-2 mb-4">
        <FaMapPin />
        <div>
          <p className="font-bold text-md inline mr-4 capitalize">
            {rideDetails?.pickup.split(",")[0]}
          </p>
          <p className="font-medium text-sm text-gray-400 block capitalize">
            {rideDetails?.pickup}
          </p>
        </div>
      </div>
      <hr />
      <div className="items-center flex gap-4  p-2 ">
        <FaMapPin />
        <div>
          <p className="font-bold text-md inline mr-4 capitalize">
            {rideDetails?.destination.split(",")[0]}
          </p>
          <p className="font-medium text-sm text-gray-400 block capitalize">
            {rideDetails?.destination}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DriverAssigned;
