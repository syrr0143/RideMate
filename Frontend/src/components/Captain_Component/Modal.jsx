import React from "react";
import { FaMapPin, FaMapMarkerAlt } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { Button, InputBox } from "../index";

const Modal = ({ isModalOpen, closeModal, OnAccept, message, showForm, button1=true, button2=true, button1Name="Ignore", button2Name="Accept" }) => {
  return (
    <div>
      {/* Modal */}
      {isModalOpen && (
        <div className="modal modal-open" role="dialog">
          <div className="modal-box">
            <p className="text-center text-xl font-bold capitalize ">
              {message}
            </p>
            <hr className="m-2" />
            <div>
              <div className="flex items-center justify-between bg-[#936639] rounded-lg p-2">
                <div className="flex items-center gap-4">
                  <div className="avatar ">
                    <div className="w-12 rounded-full">
                      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                  </div>

                  <p className="inline text-lg font-bold text-white">
                    Sumit yadav
                  </p>
                </div>
                <p className="font-bold text-white">2.2 km </p>
              </div>
              <hr className="m-2" />

              <div className="flex items-center gap-4">
                <div className="text-3xl p-2 bg-gray-300 rounded-full">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="text-lg font-bold text-black">562/11-a</p>
                  <p className="font-bold text-gray-400 capitalize">
                    muhhamadnagaae
                  </p>
                </div>
              </div>
              <hr className="m-2" />
              <div className="flex items-center gap-4">
                <div className="text-3xl p-2 bg-gray-300 rounded-full">
                  <FaMapPin />
                </div>
                <div>
                  <p className="text-lg font-bold text-black">562/11-a</p>
                  <p className="font-bold text-gray-400 capitalize">
                    muhhamadnagaae
                  </p>
                </div>
              </div>
              <hr className="m-2" />
              <div className="flex items-center gap-4">
                <div className="text-3xl p-2 bg-gray-300 rounded-full">
                  <MdPayment />
                </div>
                <div>
                  <p className="text-lg font-bold text-black">₹150</p>
                  <p className="font-bold text-gray-400 capitalize">
                    for complete ride
                  </p>
                </div>
              </div>
            </div>
            {showForm && <InputBox placeholder={"Enter otp to confirm"} />}
            <div className="modal-action">
              {button1 && (
                <Button
                  name={button1Name}
                  style={"font-bold"}
                  onClick={closeModal}
                />
              )}
              {button2 && (
                <Button
                  name={button2Name}
                  style={"bg-green-500 text-white font-bold"}
                  onClick={OnAccept}
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
