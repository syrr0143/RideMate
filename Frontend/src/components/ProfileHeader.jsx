import useAuth from "../hooks/useAuth";

const ProfileHeader = () => {
  const { user } = useAuth();
  return (
    <div className="card bg-black text-white p-4 shadow-2xl">
      <div className="flex items-center  justify-between">
        <div className="avatar">
          <div className="w-20 h-20 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>

        <div className="">
          <h2 className="text-lg font-semibold">{user?.fullName}</h2>
          <p className="text-sm opacity-75">{user?.role}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
