import axios from "axios";

export const inviteDriver = async (phone) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/delivery/restaurants/invite-driver",
      { phone },
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to invite driver");
  }
};
