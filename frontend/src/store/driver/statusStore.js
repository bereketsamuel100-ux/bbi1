import { create } from "zustand";
import driverApi from "../../api/driver/driverApi";

const useDriverStatusStore = create((set) => ({
  online: false,
  loading: false,
  error: null,

  initStatus: (status) => {
    set({ online: status === "available" });
  },

  toggleStatus: async () => {
    set({ loading: true, error: null });
    try {
      const newStatus = !useDriverStatusStore.getState().online;
      const response = await driverApi.patch("/status", {
        status: newStatus ? "available" : "unavailable",
      });
      set({ loading: false, online: newStatus });
      return response.data;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to update status",
      });
    }
  },
}));

export default useDriverStatusStore;
