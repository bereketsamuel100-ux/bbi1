import React from "react";
import { FiHome, FiList, FiBarChart2, FiUser, FiLogOut } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import useDriverAuthStore from "../../store/driver/authStore";
import useDriverStatusStore from "../../store/driver/statusStore";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useDriverAuthStore();
  const { online, toggleStatus } = useDriverStatusStore();

  const navItems = [
    { label: "Dashboard", icon: FiHome, path: "/driver/dashboard" },
    { label: "Orders", icon: FiList, path: `/driver/orders` },
    { label: "Earnings", icon: FiBarChart2, path: `/driver/earnings` },
    { label: "Profile", icon: FiUser, path: `/driver/profile` },
  ];

  return (
    <div className="w-20 sm:w-24 bg-white border-r h-screen flex flex-col items-center py-6 gap-8 fixed left-0 top-0 z-10">
      <img
        src="https://static.vecteezy.com/system/resources/previews/008/687/818/non_2x/food-delivery-logo-free-vector.jpg"
        alt="Logo"
        className="w-12 h-12 object-contain mb-4"
      />

      <div className="flex flex-col gap-6">
        {navItems.map(({ label, icon: Icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={label}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center text-xs ${
                isActive ? "text-red-500 font-semibold" : "text-gray-600"
              } hover:text-red-500 transition`}
            >
              <Icon size={20} />
              <span className="mt-1">{label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-auto flex flex-col gap-6 items-center">
        <div className="flex flex-col items-center">
          <label
            htmlFor="status-toggle"
            className="flex items-center cursor-pointer"
          >
            <div className="relative">
              <input
                type="checkbox"
                id="status-toggle"
                className="sr-only"
                checked={online}
                onChange={toggleStatus}
              />
              <div className="block bg-gray-600 w-10 h-6 rounded-full"></div>
              <div
                className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                  online ? "transform translate-x-full bg-green-400" : ""
                }`}
              ></div>
            </div>
          </label>
          <span className="text-xs mt-1">{online ? "Online" : "Offline"}</span>
        </div>

        <button
          onClick={() => {
            logout();
            navigate("/driver/login");
          }}
          className="flex flex-col items-center text-xs text-gray-600 hover:text-red-500 transition"
        >
          <FiLogOut size={20} />
          <span className="mt-1">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
