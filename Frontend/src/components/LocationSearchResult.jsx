import React from "react";
import {
  FaHospital,
  FaStore,
  FaCar,
  FaUtensils,
  FaDog,
  FaUniversity,
  FaFish,
  FaCoffee,
  FaShoppingBag,
  FaBicycle,
  FaBus,
  FaBowlingBall,
  FaCamera,
  FaCogs,
  FaMapPin,
  FaShoppingCart,
  FaLandmark,
} from "react-icons/fa"; // Import icons from Font Awesome
import {
  MdLocalGasStation,
  MdFireTruck,
  MdLocalLibrary,
  MdMovie,
  MdLocalAirport,
  MdMuseum,
} from "react-icons/md"; // More icons from Material Design
import { BiSolidBank, BiSolidCameraMovie } from "react-icons/bi"; // More icons from Material Design
import { GiCampfire, GiPostOffice } from "react-icons/gi"; // More icons from GI icons

const LocationSearchResult = ({ type, address, handleClick }) => {
  // Map of types to icons
  const getIcon = (type) => {
    switch (type) {
      case "hospital":
        return <FaHospital className="text-black" />;
      case "airport":
        return <MdLocalAirport className="text-black" />;
      case "gym":
        return <FaCogs className="text-black" />;
      case "gas_station":
        return <MdLocalGasStation className="text-black" />;
      case "university":
        return <FaUniversity className="text-black" />;
      case "restaurant":
        return <FaUtensils className="text-black" />;
      case "pet_store":
        return <FaDog className="text-black" />;
      case "store":
        return <FaStore className="text-black" />;
      case "movie_theater":
        return <MdMovie className="text-black" />;
      case "library":
        return <MdLocalLibrary className="text-black" />;
      case "park":
        return <FaFish className="text-black" />;
      case "coffee":
        return <FaCoffee className="text-black" />;
      case "casino":
        return <BiSolidCameraMovie className="text-black" />;
      case "bank":
        return <BiSolidBank className="text-black" />;
      case "bar":
        return <FaBeer className="text-black" />;
      case "book_store":
        return <FaShoppingBag className="text-black" />;
      case "bicycle_store":
        return <FaBicycle className="text-black" />;
      case "bus_station":
        return <FaBus className="text-black" />;
      case "bowling_alley":
        return <FaBowlingBall className="text-black" />;
      case "beauty_salon":
        return <FaCamera className="text-black" />;
      case "movie_rental":
        return <MdMovie className="text-black" />;
      case "department_store":
        return <FaStore className="text-black" />;
      case "doctor":
        return <FaHospital className="text-black" />;
      case "fire_station":
        return <MdFireTruck className="text-black" />;
      case "police":
        return <FaPolice className="text-black" />;
      case "cemetery":
        return <GiCemetery className="text-black" />;
      case "church":
        return <FaChurch className="text-black" />;
      case "shopping_mall":
        return <FaShoppingBag className="text-black" />;
      case "school":
        return <FaUniversity className="text-black" />;
      case "stadium":
        return <FaStadium className="text-black" />;
      case "museum":
        return <MdMuseum className="text-black" />;
      case "parking":
        return <FaCar className="text-black" />;
      case "plumber":
        return <FaCogs className="text-black" />;
      case "transit_station":
        return <GiPostOffice className="text-black" />;
      case "supermarket":
        return <FaShoppingCart className="text-black" />;
      case "synagogue":
        return <GiCemetery className="text-black" />;
      case "tourist_attraction":
        return <FaLandmark className="text-black" />;

      default:
        return <FaMapPin className="text-black" />;
    }
  };

  
  return (
    <div
      onClick={handleClick}
      className="mt-2 flex flex-row items-center space-x-4 cursor-pointer border-2 border-gray-100 p-2 rounded-xl active:border-black"
    >
      <div className="text-xl p-2 bg-gray-300 rounded-full">
        {getIcon(type)} {/* Your icon */}
      </div>
      <div className="text-lg font-medium capitalize ">{address}</div>
    </div>
  );
};

export default LocationSearchResult;
