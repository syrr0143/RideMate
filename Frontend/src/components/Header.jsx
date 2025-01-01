import { FiArrowRight, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  // State for handling mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-black">
          Ridemate
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4 items-center">
          <Link to={"/signup"}>
            <button className="bg-black text-white py-3 px-6 rounded-full flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors">
              Get Started
              <FiArrowRight className="ml-2" />
            </button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
      </div>

      {/* Mobile Navigation */}
    </header>
  );
}
