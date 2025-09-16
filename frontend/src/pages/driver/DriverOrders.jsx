import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import useDriverOrdersStore from "../../store/driver/ordersStore";
import DriverSidebar from "../../components/driver/Sidebar";

export default function DriverOrders() {
  const { driverId } = useParams();
  const {
    driver,
    orders,
    earnings,
    loading,
    error,
    updatingStatus,
    loadDriverOrders,
    toggleDriverAvailability,
    updateOrderStatus,
  } = useDriverOrdersStore();

  useEffect(() => {
    if (driverId) loadDriverOrders(driverId);
  }, [driverId, loadDriverOrders]);

  // Compute summary stats
  const summary = useMemo(() => {
    const counts = { pending: 0, picked: 0, delivered: 0, canceled: 0 };
    orders.forEach((order) => {
      if (counts[order.status] !== undefined) counts[order.status]++;
    });
    return {
      total: orders.length,
      pending: counts.pending,
      picked: counts.picked,
      delivered: counts.delivered,
      canceled: counts.canceled,
    };
  }, [orders]);

  if (loading && !driver)
    return <div className="text-center mt-20 text-lg">Loading driver data...</div>;
  if (error)
    return <div className="text-center mt-20 text-red-500 font-semibold">{error}</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DriverSidebar />

      <div className="flex-1 ml-20 sm:ml-24 p-6">
        {/* Header */}
        <h2 className="text-3xl font-bold mb-6">Driver Dashboard</h2>

        {/* Driver Info & Toggle */}
        {driver && (
          <div className="flex items-center justify-between p-4 mb-6 bg-white rounded-xl shadow-md">
            <div>
              <h3 className="text-xl font-semibold">{driver.email}</h3>
              <p className="text-gray-500">Driver ID: {driver._id}</p>
            </div>
            <div className="flex items-center">
              <span className="mr-3 font-medium">
                {driver.status === "available" ? "Available" : "Unavailable"}
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={driver.status === "available"}
                  onChange={toggleDriverAvailability}
                  disabled={updatingStatus}
                  className="sr-only"
                />
                <div
                  className={`w-14 h-7 rounded-full transition-colors ${
                    driver.status === "available" ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
                <div
                  className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                    driver.status === "available" ? "translate-x-7" : "translate-x-0"
                  }`}
                />
              </label>
            </div>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Order Stats */}
          <div className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
            <p className="text-gray-500">Today's Orders</p>
            <p className="text-2xl font-bold">
              {earnings ? earnings.todaysOrderCount : "..."}
            </p>
          </div>
          <div className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
            <p className="text-gray-500">Pending</p>
            <p className="text-2xl font-bold text-yellow-500">{summary.pending}</p>
          </div>
          <div className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
            <p className="text-gray-500">Delivered</p>
            <p className="text-2xl font-bold text-green-500">{summary.delivered}</p>
          </div>
          <div className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
            <p className="text-gray-500">Total Orders</p>
            <p className="text-2xl font-bold">{summary.total}</p>
          </div>

          {/* Earnings Stats */}
          <div className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition col-span-1 sm:col-span-2 lg:col-span-2">
            <p className="text-gray-500">Today's Earnings</p>
            <p className="text-2xl font-bold text-green-600">
              ${earnings ? earnings.todayEarnings.toFixed(2) : "0.00"}
            </p>
          </div>
          <div className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
            <p className="text-gray-500">Weekly Earnings</p>
            <p className="text-2xl font-bold">
              ${earnings ? earnings.weeklyEarning.toFixed(2) : "0.00"}
            </p>
          </div>
          <div className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
            <p className="text-gray-500">Total Earnings</p>
            <p className="text-2xl font-bold">
              ${earnings ? earnings.totalEarnings.toFixed(2) : "0.00"}
            </p>
          </div>
        </div>

        {/* Orders Table */}
        {orders.length === 0 ? (
          <p className="text-gray-600 text-center mt-10">No orders found</p>
        ) : (
          <div className="overflow-x-auto rounded-xl shadow">
            <table className="min-w-full border-collapse text-left">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  {["Order ID", "Customer ID", "Items", "Total", "Status", "Payment", "Created At"].map(
                    (head) => (
                      <th key={head} className="p-3 text-gray-700 font-medium border-b">
                        {head}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <tr
                    key={order._id}
                    className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition`}
                  >
                    <td className="p-3 border-b">{order._id}</td>
                    <td className="p-3 border-b">{order.customerId}</td>
                    <td className="p-3 border-b">
                      {order.items.map((item) => (
                        <div key={item._id}>
                          {item.name} x {item.quantity} (${item.price})
                        </div>
                      ))}
                    </td>
                    <td className="p-3 border-b">${order.total}</td>
                    <td className="p-3 border-b">
                      {order.status === "pending" ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => updateOrderStatus(order._id, "accepted")}
                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                            disabled={updatingStatus}
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => updateOrderStatus(order._id, "canceled")}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            disabled={updatingStatus}
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            order.status === "delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "canceled"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      )}
                    </td>
                    <td className="p-3 border-b">{order.paymentMethod}</td>
                    <td className="p-3 border-b">{new Date(order.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
