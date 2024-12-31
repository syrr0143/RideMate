import React, { useRef, useState } from "react";
import InputBox from "../components/InputBox.jsx";
import { FaMapPin, FaMapMarkerAlt } from "react-icons/fa";
import { IoIosArrowDropup, IoIosArrowDropdown } from "react-icons/io";
import { LocationSearchResult } from "../components/index.jsx";
import { Navigate, useNavigate } from "react-router-dom";
import { useHidden } from "../hooks/useHidden.jsx";
import { Button } from "../components/index.jsx";
import { baseUrl } from "../config/Api.js";
import axios from "axios";
import useAuth from "../hooks/useAuth.jsx";

const FindTrip = () => {
  const { token } = useAuth();
  const { hidden, setHidden } = useHidden();
  const [loading, setLoading] = useState(false);
  const [locationSuggestion, setLocationSuggestion] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [tripData, setTripData] = useState({
    source: "",
    destination: "",
  });
  const timeoutRef = useRef(null);
  const navigate = useNavigate();
  const handleFocus = (fieldName) => {
    // setHidden(true);
    setActiveField(fieldName); // Set the active field when input is focused
  };

  const handleTripDetailChange = (e) => {
    const { name, value } = e.target;
    setTripData((prev) => ({
      ...prev,
      [name]: value,
    }));
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (value.trim()) {
        fetchLocationSuggestion(value);
      } else {
        setLocationSuggestion([]);
      }
    }, 2000);
  };

  const fetchLocationSuggestion = async (query) => {
    try {
      const response = await axios.post(
        `${baseUrl}/user/location-suggestion`,
        { query }, // Send query in the body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in headers
          },
        }
      );
      console.log(response);
      setLocationSuggestion(response.data || []);
    } catch (error) {
      console.error("Error fetching location suggestions:", error.message);
    }
  };
  const handleLocationSelect = (location) => {
    // Use activeField instead of checking tripData.source
    setTripData((prev) => ({
      ...prev,
      [activeField]: location.place_name,
    }));
    setLocationSuggestion([]);
    setHidden(false);
  };

  const handleFindTrip = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${baseUrl}/user/fare-details`,
        tripData, // Send tripData in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in headers
          },
        }
      );
      const fareDetails = response.data.fares;
      navigate("/user/home/chose-vehicle", {
        state: { ...tripData, fareDetails },
      });
    } catch (error) {
      console.error("Error fetching fare details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="ml-2 me-2 mt-2">
        <div className="flex flex-row justify-between">
          <p className="text-start font-bold text-2xl">Find a trip</p>
          {hidden ? (
            <IoIosArrowDropdown
              // onClick={(prev) => setHidden(!prev)}
              className="text-3xl"
            />
          ) : (
            <IoIosArrowDropup
              // onClick={(prev) => setHidden(true)}
              className="text-3xl"
            />
          )}
        </div>
        <form className="w-full flex flex-col items-center space-y-4">
          <div className="relative w-full">
            <InputBox
              onChange={handleTripDetailChange}
              name={"source"}
              value={tripData.source}
              onFocus={() => handleFocus("source")}
              inputStyle="w-[95vw] pr-8"
              type="text"
              placeholder="Enter your source"
            />

            <FaMapMarkerAlt className="absolute right-4 top-8" />
            <InputBox
              onChange={handleTripDetailChange}
              name={"destination"}
              value={tripData.destination}
              onFocus={() => handleFocus("destination")}
              inputStyle="w-[95vw] pr-8"
              type="text"
              placeholder="Enter your destination"
            />
            <FaMapPin className="absolute right-4 top-24" />
          </div>
          <Button
            disabled={!tripData.source || !tripData.destination}
            name={"Find trip"}
            onClick={handleFindTrip}
            style={"bg-black text-white w-full"}
            type={"submit"}
            loading={loading}
          />
          {/* Second Input Box */}
        </form>
        <div
          className="mt-2 w-[95vw] min-h-48 overflow-y-auto"
          style={{ top: "120px", zIndex: 10 }}
        >
          {locationSuggestion.map(
            (location, idx) => (
              // !hidden ? (
              <LocationSearchResult
                key={idx}
                handleClick={() =>
                  handleLocationSelect(
                    location,
                    tripData.source ? "destination" : "source"
                  )
                }
                address={location.place_name}
              />
            )
            // ) : null
          )}
        </div>
      </div>
    </>
  );
};

export default FindTrip;
