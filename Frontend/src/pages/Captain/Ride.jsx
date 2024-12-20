import { MdNavigation } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { MdTurnLeft } from "react-icons/md";
import { RiMapPin2Fill } from "react-icons/ri";
import { Button } from "../../components/index";
import { FaAngleUp } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { useState } from "react";
import Modal from "../../components/Captain_Component/Modal";
import { useNavigate } from "react-router-dom";
export default function Ride() {
    const navigate = useNavigate();
  const [isRideFinish, setIsRideFinish] = useState(false);
  const handleNotCompleted = () => {
    setIsRideFinish(false);
  };
  const handleAccept = () => {
    navigate("/captain/home");
  };

  return (
    <div className="h-screen w-full max-w-md mx-auto bg-black text-white flex flex-col relative">
      {/* Top Navigation Bar */}
      <div className="flex items-center px-4 py-3 bg-black/90 backdrop-blur-sm z-10">
        <button className="p-2">
          <MdTurnLeft className="font-bold text-4xl" />
        </button>
        <div className="ml-2">
          <h1 className="text-lg font-medium">Gracechurch Street</h1>
          <p className="text-md text-gray-300 ">40 m</p>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        <img
          src="/LandingPage/map.jpeg"
          alt="Map view"
          className="w-full h-full object-cover"
          width={400}
          height={800}
          priority
        />

        {/* Map Controls */}
        <div className="absolute right-4 bottom-24 flex flex-col gap-2">
          <button className="bg-white p-2 rounded-full shadow-lg">
            <MdNavigation className="w-6 h-6 text-gray-700" />
          </button>
          <button className="bg-white p-2 rounded-full shadow-lg">
            <RiMapPin2Fill className="w-6 h-6 text-gray-700" />
          </button>
          <button className="bg-white p-2 rounded-full shadow-lg">
            <FaHome className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Current Location Marker */}
        <div className="absolute left-1/2 bottom-1/2 transform -translate-x-1/2">
          <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg" />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-yellow-400 text-black p-4 flex items-center justify-between">
        <FaAngleUp />
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold">4 KM AWAY</span>
        </div>
        <Button
          name={"Complete Ride"}
          onClick={() => setIsRideFinish(true)}
          style={"bg-green-500 text-white font-bold text-lg"}
        />
      </div>
      <Modal
        OnAccept={handleAccept}
        closeModal={handleNotCompleted}
        isModalOpen={isRideFinish}
        message={"Finish this ride"}
        showForm={false}
        button2Name="Finish Ride"
        button1Name="Don't finish yet"
      />
    </div>
  );
}
