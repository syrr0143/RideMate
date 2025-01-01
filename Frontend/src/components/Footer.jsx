import { Link } from "react-router-dom";
import { FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Ridemate</h3>
            <p className="text-gray-400">Your trusted ride-sharing partner.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            &copy; 2023 Ridemate. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
              aria-label="Facebook"
            >
              <FiFacebook size={24} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
              aria-label="Twitter"
            >
              <FiTwitter size={24} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
              aria-label="Instagram"
            >
              <FiInstagram size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
