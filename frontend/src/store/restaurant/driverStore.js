import { create } from "zustand";
import { inviteDriver as inviteDriverAPI } from "../../api/restaurant/driver";

const useDriverStore = create((set) => ({
  loading: false,
  error: null,
  success: false,
  inviteDriver: async (email) => {
    set({ loading: true, error: null, success: false });
    try {
      await inviteDriverAPI(email);
      set({ loading: false, success: true });
    } catch (error) {
      set({ loading: false, error: error.message, success: false });
    }
  },
  reset: () => set({ loading: false, error: null, success: false }),
}));

export default useDriverStore;
