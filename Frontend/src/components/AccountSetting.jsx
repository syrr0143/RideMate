// components/AccountSettings.jsx
import {
  FaChevronRight,
  FaUsers,
  FaShieldAlt,
  FaSignOutAlt,
} from "react-icons/fa"; // Replaced with react-icons
import { MdHistory } from "react-icons/md";
import Loader from "../components/Loader.jsx";
import { Link, replace, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { logoutCaptain, logoutUser } from "../utils/apiHandling.js";
import { baseUrl } from "../config/Api.js";

const AccountSettings = () => {
  const { token, userRole, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  const handleLogoutReq = async () => {
    setLoading(true);
    try {
      if (userRole === "user") {
        const response = await logoutUser(token);
      }
      if (userRole === "captain") {
        const response = await logoutCaptain(token);
      }
      handleLogout();
      navigate("https://ride-mate-five.vercel.app", { replace: true });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="card bg-white  shadow-2xl ">
      <div className="divide-y">
        <Link
          to={`/${userRole}/account`}
          className="flex items-center justify-between p-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gray-100">
              <FaUsers className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium">My Account</p>
              <p className="text-sm text-gray-500">
                Make changes to your account
              </p>
            </div>
          </div>
          <FaChevronRight className="w-5 h-5 text-gray-400" />
        </Link>

        <Link
          to={`/${userRole}/help`}
          className="flex items-center justify-between p-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gray-100">
              <MdHistory className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium">History</p>
              <p className="text-sm text-gray-500">Rides taken so far</p>
            </div>
          </div>
          <FaChevronRight className="w-5 h-5 text-gray-400" />
        </Link>

        <Link
          onClick={handleLogoutReq}
          className="flex items-center justify-between p-4"
        >
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-gray-100">
                  <FaSignOutAlt className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Log out</p>
                  <p className="text-sm text-gray-500">
                    Further secure your account for safety
                  </p>
                </div>
              </div>
              <FaChevronRight className="w-5 h-5 text-gray-400" />
            </>
          )}
        </Link>
      </div>
    </div>
  );
};

export default AccountSettings;
