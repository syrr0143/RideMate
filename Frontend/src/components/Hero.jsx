import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="h-[50%] flex  flex-col md:flex-row items-center">
      <img
        src="LandingPage/car.svg"
        alt="Ridemate hero image"
        layout="fill"
        className="z-0 object-cover w-[50%]"
      />
      <div className=" px-4 z-10 ">
        <div className="max-w-2xl bg-white bg-opacity-90 p-8 rounded-lg  shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Your Ride, Your Way
          </h1>
          <p className="text-xl text-gray-800 mb-6">
            Experience seamless, on-demand transportation with Ridemate.
          </p>
          <Link to={"/signup"}>
            <button className="bg-black text-white py-3 px-6 rounded-full flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors">
              Get Started
              <FiArrowRight className="ml-2" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
