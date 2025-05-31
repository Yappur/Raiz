import { create } from "zustand";

const useAppStore = create((set) => ({
  isLoading: false,
  setLoading: (loading) => set({ loading }),

  toastMessage: null,
  toastType: null,
  setToast: (message, type) => set({ toastMessage: message, toastType: type }),
  closeToast: () => set({ toastMessage: null, toastType: null }),
}));

export default useAppStore;
