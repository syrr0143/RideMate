import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineCreditCard,
  AiOutlineTransaction,
  AiOutlineFileText,
  AiOutlineUser,
} from "react-icons/ai";
import useAuth from "../hooks/useAuth";

export default function BottomNav() {
  const [active, setActive] = useState("home");
  const { user } = useAuth();

  return (
    <div className="btm-nav bg-white border-t shadow-2xl border-gray-100 pb-safe fixed bottom-0 left-0 right-0">
      <NavLink
        to="/"
        onClick={() => setActive("home")}
        className={({ isActive }) =>
          `flex flex-col items-center ${
            isActive || active === "home" ? "text-black" : "text-gray-500"
          }`
        }
      >
        <AiOutlineHome className="w-6 h-6" />
        <span className="btm-nav-label text-xs font-medium mt-1">Home</span>
      </NavLink>

      <NavLink
        to="/"
        onClick={() => setActive("cards")}
        className={({ isActive }) =>
          `flex flex-col items-center ${
            isActive || active === "cards" ? "text-black" : "text-gray-500"
          }`
        }
      >
        <AiOutlineCreditCard className="w-6 h-6" />
        <span className="btm-nav-label text-xs font-medium mt-1">Cards</span>
      </NavLink>

      <NavLink
        to="/"
        onClick={() => setActive("transactions")}
        className={({ isActive }) =>
          `flex flex-col items-center ${
            isActive || active === "transactions"
              ? "text-black"
              : "text-gray-500"
          }`
        }
      >
        <AiOutlineTransaction className="w-6 h-6" />
        <span className="btm-nav-label text-xs font-medium mt-1">
          Transactions
        </span>
      </NavLink>

      <NavLink
        to="/"
        onClick={() => setActive("requests")}
        className={({ isActive }) =>
          `flex flex-col items-center ${
            isActive || active === "requests" ? "text-black" : "text-gray-500"
          }`
        }
      >
        <AiOutlineFileText className="w-6 h-6" />
        <span className="btm-nav-label text-xs font-medium mt-1">Requests</span>
      </NavLink>

      <NavLink
        to={`/${user?.role}/profile`}
        onClick={() => setActive("profile")}
        className={({ isActive }) =>
          `flex flex-col items-center ${
            isActive || active === "profile" ? "text-black" : "text-gray-500"
          }`
        }
      >
        <AiOutlineUser className="w-6 h-6" />
        <span className="btm-nav-label text-xs font-medium mt-1">Profile</span>
      </NavLink>
    </div>
  );
}
