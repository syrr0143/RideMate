// import React from "react";
// import { Link } from "react-router-dom";
// import { Button, BrandLogo } from "../../components/index.jsx";
// import SmartphoneMockup from "../smartphoneView/Smartphone.jsx";

// const LandingPage = () => {
//   return (
//     <>
//       <div>
//         <div
//           loading="lazy"
//           className="h-[65vh] bg-[url('/LandingPage/bg_car2.png')] bg-auto bg-no-repeat bg-center"
//         >
//           {" "}
//           <BrandLogo style={"absolute"} />
//         </div>
//         <div className="m-4">
//           <div className="font-bold text-xl w-[60vw]">
//             Explore new ways to travel with Ridemate
//           </div>
//           <Link to={"/signup"}>
//             {" "}
//             <Button
//               name={"Continue with Email Address"}
//               style={"bg-black mt-4 mb-4 text-white w-full"}
//               key={"continue"}
//             />
//           </Link>
//           <small>
//             By continuing you agree that you have read and accept our{" "}
//             <span className="underline">T&C</span> and{" "}
//             <span className="underline">Privacy Policy</span>{" "}
//           </small>
//         </div>
//       </div>
//     </>
//   );
// };

// export default LandingPage;
import Header from "../../components/Header.jsx";
import Hero from "../../components/Hero.jsx";
import Features from "../../components/Feature.jsx";
import Testimonials from "../../components/Testimonials.jsx";
import Footer from "../../components/Footer.jsx";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
