import React, { useState, useEffect } from "react";
import useDriverStore from "../../store/restaurant/driverStore";
import Sidebar from "../../components/restaurant/Sidebar";

const InviteDriverPage = () => {
  const [phone, setPhone] = useState("");
  const { loading, error, success, inviteDriver, reset } = useDriverStore();

  useEffect(() => {
    // Reset the store state when the component unmounts
    return () => {
      reset();
    };
  }, [reset]);

  const handleSubmit = (e) => {
    e.preventDefault();
    inviteDriver(phone);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6">Invite a Driver</h1>
          <p className="text-gray-600 mb-6">
            Enter the phone number of a customer to invite them to become a driver for
            your restaurant.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Customer Phone Number
              </label>
              <input
                id="phone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E23E3E]"
                placeholder="Enter customer's phone number"
                required
              />
            </div>

            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                Driver invited successfully!
              </div>
            )}

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#E23E3E] text-white py-2 rounded-xl font-semibold hover:bg-red-400 transition disabled:opacity-60"
            >
              {loading ? "Sending Invitation..." : "Invite Driver"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InviteDriverPage;
