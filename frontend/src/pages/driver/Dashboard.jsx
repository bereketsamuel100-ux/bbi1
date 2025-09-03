import React from "react";
import Sidebar from "../../components/driver/Sidebar";

const DriverDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6 ml-20">
        <h1 className="text-2xl font-bold">Driver Dashboard</h1>
        <p>Welcome to your dashboard.</p>
      </div>
    </div>
  );
};

export default DriverDashboard;
