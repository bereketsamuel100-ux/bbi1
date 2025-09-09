import axios from "axios";

export const getAssignedOrders = async (driverId) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/delivery/drivers/${driverId}/orders`,
      { withCredentials: true }
    );
    return res.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch orders");
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const res = await axios.post(
      `http://localhost:5000/api/delivery/orders/${orderId}/status`,
      { status },
      { withCredentials: true }
    );
    return res.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update order status");
  }
};
