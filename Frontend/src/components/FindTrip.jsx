import React, { useState } from "react";
import InputBox from "../components/InputBox.jsx";
import { FaMapPin } from "react-icons/fa";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
import { LocationSearchResult } from "../components/AllImport/index.jsx";
import { Navigate, useNavigate } from "react-router-dom";
import { useHidden } from "../hooks/useHidden.jsx";

const FindTrip = () => {
  const { hidden, setHidden } = useHidden();
  const navigate = useNavigate();
  const locationArray = [
    { type: "plumber", address: "22b, near lahisarai" },
    { type: "parking", address: "22b, near lahisarai" },
    ,
    { type: "museum", address: "22b, near lahisarai" },
    ,
    { type: "school", address: "22b, near lahisarai" },
    ,
    { type: "cinema", address: "22b, near lahisarai" },
    ,
    { type: "medical", address: "22b, near lahisarai" },
    ,
    { type: "hospital", address: "22b, near lahisarai" },
    {
      type: "hospital",
      address: "22b, near lahisarai in bhagalpur bihar sabour",
    },
  ];
  const handleFocus = () => {
    setHidden(true);
  };
  const handleClick = (e) => {
    console.log("clicked");
    setHidden(false);
    navigate("chose-vehicle");
  };
  return (
    <>
      <div className="ml-2 me-2 mt-2">
        <div className="flex flex-row justify-between">
          <p className="text-start font-bold text-2xl">Find a trip</p>
          {hidden ? (
            <IoIosArrowDropdown
              onClick={(prev) => setHidden(!prev)}
              className="text-3xl"
            />
          ) : (
            <IoIosArrowDropup
              onClick={(prev) => setHidden(true)}
              className="text-3xl"
            />
          )}
        </div>
        <form className="w-full flex flex-col items-center space-y-4">
          <div className="relative w-full">
            <InputBox
              onFocus={handleFocus}
              inputStyle="w-[95vw] pr-8"
              type="text"
              placeholder="Enter your source"
            />

            <FaMapMarkerAlt className="absolute right-4 top-8" />
            <InputBox
              onFocus={handleFocus}
              inputStyle="w-[95vw] pr-8"
              type="text"
              placeholder="Enter your destination"
            />
            <FaMapPin className="absolute right-4 top-24" />
          </div>

          {/* Second Input Box */}
        </form>
        <div className="mt-4">
          {locationArray.map((location, idx) => (
            <LocationSearchResult
              key={idx}
              handleClick={handleClick}
              address={location.address}
              type={location.type}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default FindTrip;
