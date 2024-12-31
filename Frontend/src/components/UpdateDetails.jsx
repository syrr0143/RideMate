import { FaArrowLeft } from "react-icons/fa"; // Replaced lucide-react's ArrowLeft with react-icons
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import InputBox from "./InputBox";

export default function BioData() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Link
          to={`/${user?.role}/profile`}
          className="btn btn-circle btn-ghost p-2 hover:bg-gray-200"
        >
          <FaArrowLeft className="w-6 h-6 text-gray-700" />
        </Link>
        <h1 className="text-2xl font-semibold ml-4 text-gray-800">Bio-data</h1>
      </div>

      <div className="flex flex-col items-center space-y-8">
        {/* Profile Picture */}
        <div className="avatar">
          <div className="w-20 h-20 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>

        {/* User Information */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {user?.fullName}
          </h2>
          <p className="text-gray-500">{user?.role}</p>
        </div>

        {/* Form */}
        <form className="w-full max-w-lg space-y-6">
          <div className="form-control">
            <InputBox
              type="text"
              placeholder="What's your first name?"
              className="input input-bordered w-full p-3 rounded-lg text-gray-800"
            />
          </div>

          <div className="form-control">
            <InputBox
              type="text"
              placeholder="And your last name?"
              className="input input-bordered w-full p-3 rounded-lg text-gray-800"
            />
          </div>

          {/* <div className="form-control">
            <div className="input-group w-full">
              <select className="select select-bordered w-32 p-3 rounded-lg text-gray-800">
                <option>🇳🇬 +234</option>
              </select>
              <InputBox
                type="tel"
                placeholder="Phone number"
                className="input input-bordered flex-1 p-3 rounded-lg text-gray-800"
              />
            </div>
          </div> */}

          <div className="form-control">
            <select className="select select-bordered w-full p-3 rounded-lg text-gray-800">
              <option disabled selected>
                Select your gender
              </option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div className="form-control">
            <InputBox
              type="date"
              className="input input-bordered w-full p-3 rounded-lg text-gray-800"
            />
          </div>

          <button className="btn btn-block bg-black text-white hover:bg-black/90 p-3 rounded-lg">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
