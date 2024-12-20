import React from "react";
import { BottomNavbar, VehicleDetails } from "./index.jsx";
import { useNavigate } from "react-router-dom";

const ChoseVehicle = () => {
  const navigate = useNavigate();
  const handleVehicleSelect = (vehicle) => {
    console.log("clicked");
    // Redirect to ConfirmRide page with selected vehicle details
    navigate("/user/home/confirm-ride", { state: vehicle });
  };
  return (
    <div className="h-[50vh] ">
      <div className="mt-2 ml-2 mr-2">
        <p className="font-bold text-2xl mb-4">Choose a vehicle</p>
      </div>
      <div className="ml-2 mr-2">
        <VehicleDetails
          capacity={2}
          currentTime={"15:24"}
          estimatedTravelTime={5}
          fare={193}
          vehicleType={"car"}
          onClick={() =>
            handleVehicleSelect({
              capacity: 2,
              currentTime: "15:24",
              estimatedTravelTime: 5,
              fare: 193,
              vehicleType: "auto",
            })
          }
        />
        <VehicleDetails
          capacity={2}
          currentTime={"15:24"}
          estimatedTravelTime={5}
          fare={193}
          vehicleType={"bike"}
          onClick={() =>
            handleVehicleSelect({
              capacity: 2,
              currentTime: "15:24",
              estimatedTravelTime: 5,
              fare: 193,
              vehicleType: "bike",
            })
          }
        />
        <VehicleDetails
          capacity={2}
          currentTime={"15:24"}
          estimatedTravelTime={5}
          fare={193}
          vehicleType={"auto"}
          onClick={() =>
            handleVehicleSelect({
              capacity: 2,
              currentTime: "15:24",
              estimatedTravelTime: 5,
              fare: 193,
              vehicleType: "auto",
            })
          }
        />
      </div>
    </div>
  );
};

export default ChoseVehicle;
