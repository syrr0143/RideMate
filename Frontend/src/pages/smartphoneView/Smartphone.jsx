import React, { useState } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

const SmartphoneMockup = ({ websiteUrl }) => {
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="max-h-screen bg-gray-200 flex items-center justify-center p-4">
      <div className="hidden md:block">
        <div className="  relative w-[375px] h-[667px] bg-black rounded-[40px] shadow-xl overflow-hidden">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-black rounded-b-3xl z-20"></div>

          {/* Speaker */}
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-800 rounded-full z-30"></div>

          {/* Bezel */}
          <div className="absolute inset-2 bg-white rounded-[35px] overflow-hidden">
            {/* iframe */}
            <iframe
              src={websiteUrl}
              title="Embedded Website"
              className="w-full h-full border-none"
              sandbox="allow-scripts allow-same-origin allow-forms "
            ></iframe>
          </div>

          {/* Mute/Unmute Button */}
          <button
            onClick={toggleMute}
            className="absolute bottom-4 right-4 bg-gray-800 text-white p-2 rounded-full z-30"
          >
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
        </div>
      </div>
      <div className="md:hidden text-center">
        <p className="text-xl font-semibold">
          Please view on a larger screen to see the smartphone mockup.
        </p>
      </div>
    </div>
  );
};

export default SmartphoneMockup;
