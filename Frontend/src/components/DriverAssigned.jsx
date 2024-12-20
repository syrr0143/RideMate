import React from "react";
import { FaStar } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import { MdHealthAndSafety, MdEmergencyShare } from "react-icons/md";
import { IoCallSharp } from "react-icons/io5";
import { FaMapPin } from "react-icons/fa";
const DriverAssigned = () => {
  return (
    <div className="m-2">
      <div className="flex justify-between items-center mb-2">
        <p className="text-lg font-bold">Meet at this Checkpoint </p>
        <p className="bg-black rounded text-lg font-bold text-white p-3 ">
          2 min
        </p>
      </div>
      <div>
        <div className="flex justify-between">
          <div className="avatar">
            <div className="w-20 h-20 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
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
            <p className="text-md font-semibold capitalize text-gray-400 items-center flex gap-2">
              <span>
                <FaStar />
              </span>{" "}
              4.9
            </p>
          </div>
        </div>
        <div className="mt-2">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow text-gray-600 "
              placeholder="Send Message..."
            />
            <IoIosSend className="text-2xl" />
          </label>
        </div>
        <div className="flex justify-around items-center p-4">
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
              share my trip
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="bg-gray-200 text-blue-600 rounded-full p-4">
              <IoCallSharp size={24} />
            </div>
            <p className="text-center text-sm font-bold text-gray-700 capitalize">
              call driver
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
              17th cross road, pwd quarter, 1st sector, HSR layout, bengaluru ,
              karaatak{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverAssigned;
