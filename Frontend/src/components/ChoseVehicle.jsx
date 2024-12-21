import React from "react";
import { BottomNavbar, VehicleDetails } from "./index.jsx";
import { useNavigate, useLocation } from "react-router-dom";

const ChoseVehicle = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fareDetails, source, destination } = location.state;
  const handleVehicleSelect = ({
    capacity,
    currentTime,
    estimatedTravelTime,
    fare,
    vehicleType,
  }) => {
    const vehicle = {
      capacity,
      currentTime,
      estimatedTravelTime,
      fare,
      vehicleType,
      source,
      destination
    };
    console.log(vehicle);
    navigate("/user/home/confirm-ride", { state: { vehicle } }); // Pass `vehicle` correctly in state
  };

  return (
    <div>
      <div className="mt-2 ml-2 mr-2">
        <p className="font-bold text-2xl mb-4">Choose a vehicle</p>
      </div>
      <div className="ml-2 mr-2">
        <VehicleDetails
          capacity={2}
          currentTime={"15:24"}
          estimatedTravelTime={5}
          fare={fareDetails.car} // Dynamic fare for car
          vehicleType={"car"}
          onClick={() =>
            handleVehicleSelect({
              capacity: 2,
              currentTime: "15:24",
              estimatedTravelTime: 5,
              fare: fareDetails.car, // Use fare from API response
              vehicleType: "car",
            })
          }
        />
        <VehicleDetails
          capacity={2}
          currentTime={"15:24"}
          estimatedTravelTime={5}
          fare={fareDetails.auto} // Dynamic fare for auto
          vehicleType={"auto"}
          onClick={() =>
            handleVehicleSelect({
              capacity: 2,
              currentTime: "15:24",
              estimatedTravelTime: 5,
              fare: fareDetails.auto, // Use fare from API response
              vehicleType: "auto",
            })
          }
        />
        <VehicleDetails
          capacity={2}
          currentTime={"15:24"}
          estimatedTravelTime={5}
          fare={fareDetails.bike} // Dynamic fare for bike
          vehicleType={"bike"}
          onClick={() =>
            handleVehicleSelect({
              capacity: 2,
              currentTime: "15:24",
              estimatedTravelTime: 5,
              fare: fareDetails.bike, // Use fare from API response
              vehicleType: "bike",
            })
          }
        />
      </div>
    </div>
  );
};

export default ChoseVehicle;
