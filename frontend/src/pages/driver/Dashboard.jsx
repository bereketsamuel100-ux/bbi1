import React from "react";
import Sidebar from "../../components/driver/Sidebar";

const DriverDashboard = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-24 p-6">
        <div className="w-full">
          {children ? children : (
            <div>
              <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
              <p>Welcome to your driver dashboard. Select a page from the sidebar.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DriverDashboard;
