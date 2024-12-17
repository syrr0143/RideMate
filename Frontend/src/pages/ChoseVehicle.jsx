import React from "react";
import VehicleDetails from "../components/VehicleDetails";
import BottomNavbar from "../components/BottomNavbar";

const ChoseVehicle = () => {
  return (
    <div className="h-[50vh] ">
      <div className="mt-2 ml-2 mr-2">
        <p className="font-bold text-2xl">Choose a Vehicle</p>
      </div>
      <div className="ml-2 mr-2">
        <VehicleDetails
          capacity={2}
          currentTime={"15:24"}
          estimatedTravelTime={5}
          fare={193}
          vehicleType={"car"}
        />
        <VehicleDetails
          capacity={2}
          currentTime={"15:24"}
          estimatedTravelTime={5}
          fare={193}
          vehicleType={"bike"}
        />
        <VehicleDetails
          capacity={2}
          currentTime={"15:24"}
          estimatedTravelTime={5}
          fare={193}
          vehicleType={"auto"}
        />
      </div>


    </div>
  );
};

export default ChoseVehicle;
