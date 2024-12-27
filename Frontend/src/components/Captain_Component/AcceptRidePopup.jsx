import React, { useState } from "react";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import useSocket from "../../hooks/useSocket";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const AcceptRidePopup = ({ rideData, onClose }) => {
  const [isConfirmRideOpen, setIsConfirmRideOpen] = useState(false);
  const [isNewRideModalOpen, setisNewRideModalOpen] = useState(rideData);
  const { token } = useAuth();
  const { socket } = useSocket();
  const navigate = useNavigate();

  const handleAcceptRide = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/captain/confirm-ride",
        { rideId: rideData._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("response after ride aaccept is ", response);
      setIsConfirmRideOpen(true);
     setisNewRideModalOpen(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleIgnoreRide = () => {
    onClose(); // Close the popup
  };

  const finishRide = async(otp) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/captain/confirm-ride"
      );
    } catch (error) {
      console.log(error)
    }
  };

  const handleCancelRide = () => {
    setIsConfirmRideOpen(false);
  };

  return (
    <>
      <Modal
        message={`New ride available`}
        status={rideData?.status}
        OnAccept={handleAcceptRide}
        closeModal={handleIgnoreRide}
        isModalOpen={isNewRideModalOpen}
        showForm={false}
        rideData={rideData}
      />
      <Modal
        message={"Ask user for OTP"}
        OnAccept={finishRide}
        closeModal={handleCancelRide}
        isModalOpen={isConfirmRideOpen}
        showForm={true}
        rideData={rideData}
      />
    </>
  );
};

export default AcceptRidePopup;
