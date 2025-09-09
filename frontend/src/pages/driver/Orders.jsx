import React, { useState, useEffect } from "react";
import { getAssignedOrders, updateOrderStatus } from "../../api/driver/orderApi";
import useDriverAuthStore from "../../store/driver/authStore";
import useDriverStatusStore from "../../store/driver/statusStore";

const DriverOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useDriverAuthStore();
  const { initStatus } = useDriverStatusStore();

  const fetchOrders = async () => {
    if (!user?._id) return;
    setLoading(true);
    setError(null);
    try {
      const { driver, orders: assignedOrders } = await getAssignedOrders(user._id);
      setOrders(assignedOrders);
      if (driver) {
        initStatus(driver.status);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const handleUpdateStatus = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
      fetchOrders(); // Refresh the orders list
    } catch (error) {
      setError(error.message);
    }
  };

  const renderActionButtons = (order) => {
    switch (order.status) {
      case "pending":
        return (
          <>
            <button
              onClick={() => handleUpdateStatus(order._id, "accepted")}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Accept
            </button>
            <button
              onClick={() => handleUpdateStatus(order._id, "canceled")}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Reject
            </button>
          </>
        );
      case "accepted":
        return (
          <button
            onClick={() => handleUpdateStatus(order._id, "picked")}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Mark as Picked Up
          </button>
        );
      case "picked":
        return (
          <button
            onClick={() => handleUpdateStatus(order._id, "en_route")}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
          >
            Mark as En Route
          </button>
        );
      case "en_route":
        return (
          <button
            onClick={() => handleUpdateStatus(order._id, "delivered")}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg"
          >
            Mark as Delivered
          </button>
        );
      case "canceled":
        return <p className="text-red-500">Rejected</p>;
      default:
        return null;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Assigned Orders</h1>
      {loading && <p>Loading orders...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {orders.length === 0 && !loading && (
        <p>No assigned orders at the moment.</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold">Order #{order._id.slice(-6)}</h2>
            <p className="text-sm text-gray-600">
              Status: <span className="font-semibold">{order.status}</span>
            </p>
            <p className="text-sm text-gray-600">
              Total: <span className="font-semibold">${order.total}</span>
            </p>
            <div className="mt-4 flex justify-end gap-2">
              {renderActionButtons(order)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriverOrders;
