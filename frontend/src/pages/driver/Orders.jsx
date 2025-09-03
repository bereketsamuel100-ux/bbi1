import React from "react";
import Sidebar from "../../components/driver/Sidebar";

const DriverOrders = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6 ml-20">
        <h1 className="text-2xl font-bold">My Orders</h1>
        <p>This is where the driver can see their assigned orders.</p>
      </div>
    </div>
  );
};

export default DriverOrders;
