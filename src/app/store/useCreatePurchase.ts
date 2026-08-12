import { create } from "zustand";
interface CreatePurchase {
  created: boolean;
  setCreated: () => void;
}

export const useCreatePurchaseStore = create<CreatePurchase>((set) => ({
  created: false,
  setCreated: () => set({ created: true }),
}));
