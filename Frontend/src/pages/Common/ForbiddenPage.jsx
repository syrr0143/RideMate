// Forbidden.jsx
import React from "react";
import { BrandLogo } from "../../components/index.jsx";

const Forbidden = () => {
  return (
    <div>
      <BrandLogo />
      <div className="m-4">
        <img src={"/LandingPage/bg_car2.png"} alt="" className="mt-20 mb-20" />
        <h1 className="font-bold text-xl">Forbidden</h1>
        <p>You do not have permission to access this page.</p>
      </div>
    </div>
  );
};

export default Forbidden;
