import React from "react";
import { BottomNavbar, VehicleDetails } from "./index.jsx";
import { useNavigate, useLocation } from "react-router-dom";

const ChoseVehicle = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fareDetails, source, destination, eta } = location.state;
  const handleVehicleSelect = ({
    capacity,
    currentTime,
    estimatedTravelTime = eta,
    fare,
    vehicleType,
  }) => {
    const vehicle = {
      capacity,
      currentTime,
      estimatedTravelTime: estimatedTravelTime,
      fare,
      vehicleType,
      source,
      destination,
    };

    navigate("/user/home/confirm-ride", { state: { vehicle } }); // Pass `vehicle` correctly in state
  };

  return (
    <div className="mt-2 ml-2 mr-2">
      <p className="font-bold text-2xl mb-4">Choose a vehicle</p>

      <div className="ml-2 mr-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <VehicleDetails
          capacity={2}
          estimatedTravelTime={eta / 60}
          fare={fareDetails.car} // Dynamic fare for car
          vehicleType={"car"}
          onClick={() =>
            handleVehicleSelect({
              capacity: 2,
              estimatedTravelTime: eta,
              fare: fareDetails.car, // Use fare from API response
              vehicleType: "car",
            })
          }
        />
        <VehicleDetails
          capacity={2}
          estimatedTravelTime={eta / 60}
          fare={fareDetails.auto} // Dynamic fare for auto
          vehicleType={"auto"}
          onClick={() =>
            handleVehicleSelect({
              capacity: 2,
              estimatedTravelTime: eta / 60,
              fare: fareDetails.auto, // Use fare from API response
              vehicleType: "auto",
            })
          }
        />
        <VehicleDetails
          capacity={2}
          estimatedTravelTime={eta / 60}
          fare={fareDetails.bike} // Dynamic fare for bike
          vehicleType={"bike"}
          onClick={() =>
            handleVehicleSelect({
              capacity: 2,
              estimatedTravelTime: eta / 60,
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
