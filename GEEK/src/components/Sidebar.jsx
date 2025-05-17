import React from "react";
import { NavLink } from "react-router-dom";
import { FaRegImage, FaUsers } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-60 h-screen bg-gray-50 border-r p-5">
      <h1 className="text-2xl font-bold mb-6 text-green-700">GEEK<span className="text-green-400">UP</span></h1>
      <nav className="flex flex-col space-y-2">
        <NavLink to="/albums" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 ${isActive ? "bg-blue-100 text-blue-600" : ""}`}>
          <FaRegImage /> Albums
        </NavLink>
        <NavLink to="/users" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 ${isActive ? "bg-blue-100 text-blue-600" : ""}`}>
          <FaUsers /> Users
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
