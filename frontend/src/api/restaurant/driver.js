import axios from "axios";

export const inviteDriver = async (email) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/delivery/restaurants/invite-driver",
      { email },
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to invite driver");
  }
};
