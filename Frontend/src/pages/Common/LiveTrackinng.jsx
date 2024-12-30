import { MdTurnLeft } from "react-icons/md";
import { Button, Loader } from "../../components/index";
import { FaAngleUp } from "react-icons/fa";
import { useEffect, useState } from "react";
import Modal from "../../components/Captain_Component/Modal";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useSocket from "../../hooks/useSocket";
import Map from "../../components/Map.jsx"; // Update the import path according to your file structure
import axios from "axios";
import { baseUrl } from "../../config/Api.js";

export default function LiveTracking() {
  const navigate = useNavigate();
  const location = useLocation();
  const rideData = location?.state?.rideData;
  const destinationCoords = location?.state?.destinationCoords;

  const { socket } = useSocket();
  const { token, userRole } = useAuth();

  const [isRideFinish, setIsRideFinish] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLocationUpdate = ({ latitude, longitude }) => {
    // Handle location updates if needed
  };
  console.log("checkingn destination position:", destinationCoords, rideData);

  const handleNotCompleted = () => {
    setIsRideFinish(false);
  };

  useEffect(() => {
    // Listen to the socket event when ride is completed
    if (socket) {
      socket.on("ride-completed", (message) => {
        console.log(message);
        navigate("/user/home");
      });
    }

    // Clean up the socket listener on component unmount
    return () => {
      if (socket) {
        socket.off("ride-completed");
      }
    };
  }, [socket]);

  const handleAccept = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${baseUrl}/captain/finish-ride`,
        { rideId: rideData?._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("this is response", response);
      navigate(`/${userRole}/home`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
        destinationCoords={destinationCoords}
        onLocationUpdate={handleLocationUpdate}
      />

      {/* Bottom Bar */}
      <div className="bg-yellow-400 text-black p-4 flex items-center justify-between">
        <FaAngleUp />
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold">4 KM AWAY</span>
        </div>

        {userRole !== "user" &&
          (loading ? (
            <Loader />
          ) : (
            <Button
              name={"Complete Ride"}
              onClick={() => setIsRideFinish(true)}
              style={"bg-green-500 text-white font-bold text-lg"}
            />
          ))}
      </div>

      {userRole === "user" ? (
        ""
      ) : (
        <Modal
          OnAccept={handleAccept}
          closeModal={handleNotCompleted}
          isModalOpen={isRideFinish}
          rideData={rideData}
          status={rideData?.status}
          message={"Finish this ride"}
          showForm={false}
          loading={loading}
          button2Name="Finish Ride"
          button1Name="Don't finish yet"
        />
      )}
    </div>
  );
}
