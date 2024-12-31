import React from "react";
import {
  FiArrowLeft,
  FiMapPin,
  FiCreditCard,
  FiNavigation,
  FiPhoneCall,
  FiDollarSign,
  FiShield,
  FiSun,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function AboutApp() {
  const { userRole } = useAuth();
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header Section */}
      <header className="p-4 flex items-center justify-between">
        <Link to={`/${userRole}/profile`}>
          <button className="text-2xl" aria-label="Go back">
            <FiArrowLeft />
          </button>
        </Link>
        <h1 className="text-2xl font-bold">Ridemate</h1>
        <div className="w-8"></div> {/* Spacer for centering */}
      </header>

      {/* Introduction Section */}
      <section className="p-6 bg-gray-100">
        <h2 className="text-xl font-semibold mb-4">About Ridemate</h2>
        <p className="text-gray-700">
          Ridemate is on a mission to revolutionize urban transportation. We
          connect riders with drivers to provide safe, affordable, and reliable
          rides at the tap of a button.
        </p>
      </section>

      {/* Features Section */}
      <section className="p-6">
        <h2 className="text-xl font-semibold mb-4">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FeatureCard
            icon={<FiMapPin />}
            title="Easy Booking"
            description="Book a ride in seconds with our user-friendly app"
          />
          <FeatureCard
            icon={<FiCreditCard />}
            title="Multiple Payments"
            description="Choose from various payment options for your convenience"
          />
          <FeatureCard
            icon={<FiNavigation />}
            title="Real-time Tracking"
            description="Track your ride in real-time for peace of mind"
          />
          <FeatureCard
            icon={<FiPhoneCall />}
            title="24/7 Support"
            description="Our support team is always ready to assist you"
          />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="p-6 bg-gray-100">
        <h2 className="text-xl font-semibold mb-4">Why Choose Ridemate?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <USPCard
            icon={<FiDollarSign />}
            title="Affordable"
            description="Competitive pricing for every journey"
          />
          <USPCard
            icon={<FiShield />}
            title="Safe"
            description="Vetted drivers and secure rides"
          />
          <USPCard
            icon={<FiSun />}
            title="Eco-friendly"
            description="Reducing carbon footprint with every ride"
          />
        </div>
      </section>

      {/* Footer Section */}
      <footer className="p-6 bg-black text-white">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a href="#" className="hover:underline mr-4">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
          </div>
          <div className="text-center md:text-right">
            <p>Contact: support@ridemate.com</p>
            <p>Phone: +1 (800) 123-4567</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex items-start p-4 bg-white shadow-md rounded-lg">
      <div className="text-2xl mr-4 text-gray-600">{icon}</div>
      <div>
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function USPCard({ icon, title, description }) {
  return (
    <div className="text-center p-4 bg-white shadow-md rounded-lg">
      <div className="text-3xl mb-2 text-gray-600 flex justify-center">
        {icon}
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
