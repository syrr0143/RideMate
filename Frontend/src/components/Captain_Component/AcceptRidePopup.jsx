import React, { useState } from "react";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import useSocket from "../../hooks/useSocket";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { baseUrl } from "../../config/Api.js";

const AcceptRidePopup = ({ rideData, onClose }) => {
  const [isNewRideModalOpen, setisNewRideModalOpen] = useState(rideData);
  const { token } = useAuth();
  const { socket } = useSocket();
  const navigate = useNavigate();

  const handleAcceptRide = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/captain/confirm-ride`,
        { rideId: rideData._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("response after ride aaccept is ", response);
      setisNewRideModalOpen(false);
      navigate("/captain/reach-user-location", {
        state: { rideData },
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleIgnoreRide = () => {
    onClose(); // Close the popup
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
    </>
  );
};

export default AcceptRidePopup;
