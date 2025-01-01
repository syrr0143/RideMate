// import React from "react";
// import { Link } from "react-router-dom";
// import { Button, BrandLogo } from "../../components/index.jsx";

// const SignupOption = () => {
//   return (
//     <>
//       <div>
//         <div className="h-[65vh] bg-[url('/LandingPage/bg_car2.png')] bg-contain bg-no-repeat bg-center">
//           {" "}
//           <BrandLogo style={"absolute"} />
//         </div>
//         <div className="m-4">
//           <div className="font-bold text-xl w-[60vw]">Welcome to Ridemate</div>
//           <Link to={"/captain-signup"}>
//             {" "}
//             <Button
//               name={"Continue as Captain"}
//               style={"bg-black mt-4 mb-4 text-white w-full"}
//               key={"continue"}
//             />
//           </Link>
//           <p className="font-bold text-xl justify-center flex"> OR</p>
//           <Link to={"/user-signup"}>
//             {" "}
//             <Button
//               name={"Continue as User"}
//               style={"bg-black mt-4 mb-4 text-white w-full"}
//               key={"continue"}
//             />
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SignupOption;

import { FiUser, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function SignUpOptions() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center p-4">
      <h1 className="text-3xl md:text-4xl font-bold text-black mb-8">
        Choose Your Role
      </h1>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* User Sign Up Option */}
        <div className="bg-gray-100 rounded-lg p-6 flex flex-col items-center text-center transition-transform hover:scale-105">
          <FiUser className="text-5xl text-black mb-4" />
          <h2 className="text-2xl font-semibold text-black mb-2">
            Sign Up as User
          </h2>
          <p className="text-gray-600 mb-6">
            Request rides, track your journey, and enjoy a comfortable
            experience.
          </p>
          <Link
            to={"/user-signup"}
            className="bg-black text-white py-2 px-6 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
          >
            Get Started <FiArrowRight className="ml-2" />
          </Link>
        </div>

        {/* Captain Sign Up Option */}
        <div className="bg-gray-100 rounded-lg p-6 flex flex-col items-center text-center transition-transform hover:scale-105">
          <FiUser className="text-5xl text-black mb-4" />

          <h2 className="text-2xl font-semibold text-black mb-2">
            Sign Up as Captain
          </h2>
          <p className="text-gray-600 mb-6">
            Drive and earn as a Captain. Manage your rides and set your
            availability.
          </p>
          <Link
            to={"/captain-signup"}
            className="bg-black text-white py-2 px-6 rounded-full flex
            items-center justify-center hover:bg-gray-800 transition-colors"
          >
            Get Started <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </div>

      {/* Steps for Beginners */}
    </div>
  );
}
