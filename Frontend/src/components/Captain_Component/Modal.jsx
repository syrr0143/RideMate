import React, { useState } from "react";
import { FaMapPin, FaMapMarkerAlt } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { Button, InputBox } from "../index";
import RideStatusBadge from "../RideStatusBadge";

const Modal = ({
  isModalOpen,
  closeModal,
  OnAccept,
  message,
  rideData,
  showForm,
  status,
  button1 = true,
  button2 = true,
  button1Name = "Ignore",
  button2Name = "Accept",
}) => {
  const [otp, setOtp] = useState(""); // Track OTP input
  const [isOtpValid, setIsOtpValid] = useState(false); // Track OTP validity
  const handleOtpChange = (e) => {
    const value = e.target.value;
    setOtp(value);

    // Check if OTP is exactly 6 digits long
    if (value.length === 6) {
      setIsOtpValid(true); // Enable buttons if OTP is valid
    } else {
      setIsOtpValid(false); // Disable buttons if OTP is invalid
    }
  };

   const handleAccept = () => {
     if (showForm && OnAccept) {
       OnAccept(otp); // Pass the OTP to the parent component
     } else {
       OnAccept();
     }
   };
  return (
    <div>
      {isModalOpen && (
        <div className="modal modal-open" role="dialog">
          <div className="modal-box">
            <div className="flex justify-between">
              <p className="text-center text-xl font-bold capitalize">
                {message}
              </p>
              <RideStatusBadge status={status} />
            </div>
            <hr className="m-2" />
            <div>
              <div className="flex items-center justify-between bg-[#936639] rounded-lg p-2">
                <div className="flex items-center gap-4">
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img
                        src={
                          rideData?.userId?.avatar ||
                          "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        }
                        alt="User Avatar"
                      />
                    </div>
                  </div>
                  <p className="inline text-lg font-bold text-white">
                    {rideData?.userId?.fullName || "Unknown User"}
                  </p>
                </div>
                <p className="font-bold text-white">
                  {rideData?.distance || "0"} km
                </p>
              </div>
              <hr className="m-2" />
              {/* Pickup Location */}
              <div className="flex items-center gap-4">
                <div className="text-3xl p-2 bg-gray-300 rounded-full">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="text-lg font-bold text-black">
                    {rideData?.pickup || "Pickup location"}
                  </p>
                </div>
              </div>
              <hr className="m-2" />
              {/* Destination */}
              <div className="flex items-center gap-4">
                <div className="text-3xl p-2 bg-gray-300 rounded-full">
                  <FaMapPin />
                </div>
                <div>
                  <p className="text-lg font-bold text-black">
                    {rideData?.destination || "Destination"}
                  </p>
                </div>
              </div>
              <hr className="m-2" />
              {/* Fare */}
              <div className="flex items-center gap-4">
                <div className="text-3xl p-2 bg-gray-300 rounded-full">
                  <MdPayment />
                </div>
                <div>
                  <p className="text-lg font-bold text-black">
                    ₹{rideData?.fare || "0"}
                  </p>
                  <p className="font-bold text-gray-400 capitalize">
                    for complete ride
                  </p>
                </div>
              </div>
            </div>
            {showForm && (
              <InputBox
                type="number"
                inputStyle={"text-lg font-bold"}
                placeholder={"Enter OTP to confirm"}
                value={otp}
                name={"otp"}
                onChange={handleOtpChange}
              />
            )}
            <div className="modal-action">
              {button1 && (
                <Button
                  name={button1Name}
                  style={"font-bold"}
                  onClick={closeModal}
                  disabled={showForm ? true : false}
                />
              )}
              {button2 && (
                <Button
                  name={button2Name}
                  style={"bg-green-500 text-white font-bold"}
                  onClick={handleAccept}
                  disabled={showForm ? !isOtpValid : false}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
