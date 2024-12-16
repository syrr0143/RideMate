import React from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import BrandLogo from "../components/BrandLogo";

const LandingPage = () => {
  return (
    <>
      <div>
        <div
          loading="lazy"
          className="h-[65vh] bg-[url('LandingPage/bg_car2.png')] bg-auto bg-no-repeat bg-center"
        >
          {" "}
          <BrandLogo style={"absolute"} />
        </div>
        <div className="m-4">
          <div className="font-bold text-xl w-[60vw]">
            Explore new ways to travel with Ridemate
          </div>
          <Link to={"/signup"}>
            {" "}
            <Button
              name={"Continue with Email Address"}
              style={"bg-black mt-4 mb-4 text-white w-full"}
              key={"continue"}
            />
          </Link>
          <small>
            By continuing you agree that you have read and accept our{" "}
            <span className="underline">T&C</span> and{" "}
            <span className="underline">Privacy Policy</span>{" "}
          </small>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
