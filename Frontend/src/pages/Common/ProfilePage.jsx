// pages/ProfilePage.jsx
import ProfileHeader from "../../components/ProfileHeader.jsx";
import AccountSettings from "../../components/AccountSetting.jsx";
import MoreOptions from "../../components/MoreOptions.jsx";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth.jsx";

const ProfilePage = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 space-y-4">
        <div className="flex items-center mb-8">
          <Link
            to={`/${user?.role}/home`}
            className="btn btn-circle btn-ghost p-2 hover:bg-gray-200"
          >
            <FaArrowLeft className="w-6 h-6 text-gray-700" />
          </Link>
          <h1 className="text-2xl font-semibold ml-4 text-gray-800">Profile</h1>
        </div>

        <ProfileHeader />
        <AccountSettings />
        <MoreOptions />
      </div>
    </div>
  );
};

export default ProfilePage;
