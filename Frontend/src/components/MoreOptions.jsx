// components/MoreOptions.jsx
import { FaChevronRight, FaQuestionCircle, FaInfoCircle } from "react-icons/fa"; // Replaced with react-icons
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const MoreOptions = () => {
  const { userRole } = useAuth();
  return (
    <div className="card bg-white shadow-2xl ">
      <div className="p-4 text-sm font-medium text-gray-500">More</div>
      <div className="divide-y">
        <Link
          to={`/${userRole}/help`}
          className="flex items-center justify-between p-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gray-100">
              <FaQuestionCircle className="w-5 h-5" />
            </div>
            <p className="font-medium">Help & Support</p>
          </div>
          <FaChevronRight className="w-5 h-5 text-gray-400" />
        </Link>

        <Link
          to={`/${userRole}/about`}
          className="flex items-center justify-between p-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gray-100">
              <FaInfoCircle className="w-5 h-5" />
            </div>
            <p className="font-medium">About App</p>
          </div>
          <FaChevronRight className="w-5 h-5 text-gray-400" />
        </Link>
      </div>
    </div>
  );
};

export default MoreOptions;
