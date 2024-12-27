import React from "react";

const RideStatusBadge = ({ status }) => {
  // Define the styles for each status
  const statusStyles = {
    cancelled: "bg-red-500 text-white",
    pending: "bg-yellow-500 text-black",
    accepted: "bg-green-500 text-white",
    completed: "bg-blue-500 text-white",
  };

  // Get the appropriate style based on the status
  const badgeStyle = statusStyles[status] || "bg-gray-500 text-white";

  return (
    <div
      className={`badge p-2 rounded-md text-sm font-bold capitalize ${badgeStyle}`}
    >
      {status}{" "}
    </div>
  );
};

export default RideStatusBadge;
