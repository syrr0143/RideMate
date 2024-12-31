import React, { useState } from "react";
import { Button, InputBox, BrandLogo } from "../../components/index.jsx";

import { requestLocationAccess } from "../../utils/locationAccess.js";

const LocationConsent = () => {
  const [loading, setLoading] = useState(false);
  const handleClick = async (e) => {
    console.log("clicked");
    e.preventDefault();
    setLoading(true);
    try {
      requestLocationAccess();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-4">
      <div className="h-[50vh] bg-no-repeat bg-center bg-[url('/LandingPage/bg_car2.png')]"></div>
      <div className="text-center">
        <p className="font-bold text-xl text-center m-4">
          Welcome to Ridemate.
        </p>
        <small className="text-center flex mb-4">
          Have a hassle-free booking experience by giving us the following
          permission.
        </small>
        <ol className="list-disc pl-14 text-start">
          <li className="text-sm font-semibold">
            Location (for finding available rides.)
          </li>
          <li className="text-sm font-semibold">
            Phone (for account security verification.)
          </li>
        </ol>
      </div>
      <div className="flex justify-center mt-20">
        <Button
          onClick={handleClick}
          disabled={loading}
          loading={loading}
          name={"ALLOW"}
          style={" bg-black text-white w-full max-w-xs "}
        />
      </div>
    </div>
  );
};

export default LocationConsent;
