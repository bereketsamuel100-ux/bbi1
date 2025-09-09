import { create } from "zustand";
import driverApi from "../../api/driver/driverApi";

const useDriverAuthStore = create((set) => ({
  isLoggedIn: false,
  user: null,
  loading: false,
  error: null,

  signup: async (name, email, phone, password) => {
    set({ loading: true, error: null });
    try {
      const response = await driverApi.post("/register", {
        name,
        email,
        phone,
        password,
        role: "driver",
      });
      set({ loading: false });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Signup failed";
      set({ loading: false, error: errorMessage });
      return { status: "error", message: errorMessage };
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await driverApi.post("/login", { email, password });
      set({ loading: false, isLoggedIn: true, user: response.data.data });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      set({ loading: false, error: errorMessage });
      return { status: "error", message: errorMessage };
    }
  },

  logout: async () => {
    set({ loading: true, error: null });
    try {
      await driverApi.post("/logout");
      set({ loading: false, isLoggedIn: false, user: null });
      return { status: "success" };
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Logout failed";
      set({ loading: false, error: errorMessage });
      return { status: "error", message: errorMessage };
    }
  },

  verifyOTP: async (phone, otp) => {
    set({ loading: true, error: null });
    try {
      const response = await driverApi.post("/verify-otp", { phone, otp });
      set({ loading: false, isLoggedIn: true, user: response.data.data });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "OTP verification failed";
      set({ loading: false, error: errorMessage });
      return { status: "error", message: errorMessage };
    }
  },

  forgotPassword: async (email, phone) => {
    set({ loading: true, error: null });
    try {
      const response = await driverApi.post("/forgot-password", {
        email,
        phone,
      });
      set({ loading: false });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Forgot password failed";
      set({ loading: false, error: errorMessage });
      return { status: "error", message: errorMessage };
    }
  },

  resetPassword: async (phone, code, newPassword) => {
    set({ loading: true, error: null });
    try {
      const response = await driverApi.post("/reset-password", {
        phone,
        code,
        newPassword,
      });
      set({ loading: false });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Reset password failed";
      set({ loading: false, error: errorMessage });
      return { status: "error", message: errorMessage };
    }
  },
}));

export default useDriverAuthStore;
