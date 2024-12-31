import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaMapPin, FaUser } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { Button } from "./index";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import useSocket from "../hooks/useSocket";
import { baseUrl } from "../config/Api.js";
const VehicleImageSrc = {
  car: "/LandingPage/car.webp",
  auto: "/LandingPage/auto.jpeg",
  bike: "/LandingPage/bike.jpeg",
};

const ConfirmRide = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAuth();
  const { socket } = useSocket();

  const [loading, setLoading] = useState(false);
  const [waitingForDriver, setwaitingForDriver] = useState(false);
  const [CaptainAssigned, setCaptainAssigned] = useState(null);
  const [otp, setOtp] = useState(""); // Add state for OTP

  // Destructure vehicle from location state
  const vehicle = location.state?.vehicle;
  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    setwaitingForDriver(true);
    try {
      const response = await axios.post(
        `${baseUrl}/user/create-ride`,
        {
          pickup: vehicle.source,
          destination: vehicle.destination,
          vehicleType: vehicle.vehicleType,
        }, // Send tripData in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in headers
          },
        }
      );
      const fetchedOtp = response?.data.ride.otp; // Fetch OTP from response
      setOtp(fetchedOtp); // Store OTP in state
      console.log("otp is ", fetchedOtp, response);
      if (response.data.sucess === true) {
        setwaitingForDriver(true);
      }
    } catch (error) {
      console.error("Error fetching fare details:", error);
    } finally {
      setLoading(false);
    }
  };
  const formattedFare = vehicle.fare.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });

  useEffect(() => {
    socket.on("ride-confirmed", (ride) => {
      console.log("ride confirmed", ride);
      setCaptainAssigned(ride?.captain);
      setwaitingForDriver(false);
      navigate("/user/home/driver-assigned", {
        state: { CaptainAssigned: ride?.captain, ride: ride, otp: otp },
      });
    });
  }, [socket, otp, navigate]);

  return (
    <div className="flex flex-col mt-2 gap-4 cursor-pointer rounded-xl p-4">
      <p className="text-xl font-bold mb-2 text-center">
        {waitingForDriver
          ? "Looking For Nearby Driver..."
          : "Confirm Your Ride"}
      </p>

      <div className="border-b-2 mb-2 flex justify-center ">
        <img
          src={VehicleImageSrc[vehicle.vehicleType]} // Displaying vehicle image
          className="h-32 rounded-full"
          alt={vehicle.vehicleType}
        />
      </div>

      <div className="items-center flex gap-4 border-b-2 rounded-lg p-2">
        <FaMapMarkerAlt />
        <div>
          <p className="font-bold text-md inline mr-4 capitalize">
            {" "}
            {vehicle.source.split(",")[0]}{" "}
          </p>
          <p className="font-medium text-sm text-gray-400 block capitalize">
            {vehicle.source}
          </p>
        </div>
      </div>

      <div className="items-center flex gap-4  border-b-2 rounded-lg p-2">
        <FaMapPin />
        <div>
          <p className="font-bold text-md inline mr-4 capitalize">
            {vehicle.destination.split(",")[0]}
          </p>
          <p className="font-medium text-sm text-gray-400 block capitalize">
            {vehicle.destination}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 border-b-2 rounded-lg p-2">
        <MdPayment />
        <div>
          <p className="font-bold text-md inline mr-4"> {formattedFare} </p>{" "}
          {/* Access fare from vehicle */}
          <p className="font-medium text-sm text-gray-400 block capitalize">
            G-Pay
          </p>
        </div>
      </div>

      <Button
        onClick={handleClick}
        disabled={loading}
        loading={loading || waitingForDriver}
        name={"Confirm Ride"}
        style={
          "shadow-2xl bg-green-500 text-white cursor-pointer font-bold text-md"
        }
      />
    </div>
  );
};

export default ConfirmRide;
