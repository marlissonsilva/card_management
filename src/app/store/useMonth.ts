import { create } from "zustand";
interface UseMonthProps {
  month: number;
  setMonth: (value: number) => void;
}

export const useMonthStore = create<UseMonthProps>((set) => ({
  month: new Date().getMonth(),
  setMonth: (value) => set({ month: value }),
}));
