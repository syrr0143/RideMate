import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import BrandLogo from "../components/BrandLogo";

const SignupOption = () => {
  return (
    <>
      <div>
        <div className="h-[65vh] bg-[url('LandingPage/bg_car2.png')] bg-contain bg-no-repeat bg-center">
          {" "}
          <BrandLogo style={"absolute"} />
        </div>
        <div className="m-4">
          <div className="font-bold text-xl w-[60vw]">Welcome to Ridemate</div>
          <Link to={"/captain-signup"}>
            {" "}
            <Button
              name={"Continue as Captain"}
              style={"bg-black mt-4 mb-4 text-white w-full"}
              key={"continue"}
            />
          </Link>
          <p className="font-bold text-xl justify-center flex"> OR</p>
          <Link to={"/user-signup"}>
            {" "}
            <Button
              name={"Continue as User"}
              style={"bg-black mt-4 mb-4 text-white w-full"}
              key={"continue"}
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignupOption;
