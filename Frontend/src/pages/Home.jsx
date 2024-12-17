import React, { useState } from "react";
import BrandLogo from "../components/BrandLogo.jsx";

import BottomNavbar from "../components/BottomNavbar.jsx";

import FindTrip from "../components/FindTrip.jsx";
const Home = () => {
  const [hidden, setHidden] = useState(false);
  return (
    <>
      <div className="max-h-screen">
        <div className={` ${hidden ? "hidden" : ""} h-[62vh]`}>
          <BrandLogo style={"absolute top-0 left-0 mt-0 ml-2"} />
          <img
            src="/LandingPage/map.jpeg"
            alt=""
            className="object-cover h-full w-full"
          />
        </div>
        <div className="pb-16">
          <div className="overflow-scroll">
            <FindTrip hidden={hidden} setHidden={setHidden} />
          
            {/* <ChoseVehicle /> */}
          </div>
        </div>
      </div>
      <BottomNavbar />
    </>
  );
};

export default Home;
