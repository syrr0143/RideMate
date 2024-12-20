import React, { useState } from "react";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

const AcceptRidePopup = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [isConfirmRideOpen, setIsConfirmRideOpen] = useState(false);
  const handleAcceptRide = () => {
      setIsConfirmRideOpen(true);
      setIsOpen(false);
  };
  const handleIgnoreRide = () => {
    setIsOpen(false);
  };
  const handleConfirmRide = () => {
    navigate("/captain/ride");
  };
  const handleCancelRide = () => {
    setIsConfirmRideOpen(false);
  };
  return (
    <>
      <Modal
        message={"New ride available"}
        OnAccept={handleAcceptRide}
        closeModal={handleIgnoreRide}
        isModalOpen={isOpen}
      />{" "}
      {/* new ride modal*/}
      <Modal
        message={"Confirm Ride To Start"}
        OnAccept={handleConfirmRide}
        closeModal={handleCancelRide}
              isModalOpen={isConfirmRideOpen}
              showForm= {true}
      />{" "}
      {/* after accepting ride modal*/}
    </>
  );
};

export default AcceptRidePopup;
