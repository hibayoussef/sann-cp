import { create } from "zustand";
import type { TimeZone } from "../types/common";

interface Store {
  zipCode: string | null;
  timeZone: TimeZone | null;
  currency: number  | undefined;
  setZipCode: (zipCode: string) => void;
  setTimeZone: (timeZone: TimeZone | null) => void;
  setCurrency: (currency: number | undefined) => void;
}

export const useCommonStore = create<Store>((set) => ({
  zipCode: null,
  timeZone: null,
  currency: undefined,
  setZipCode: (zipCode) => set({ zipCode }),
  setTimeZone: (timeZone) => set({ timeZone }),
  setCurrency: (currency) => set({ currency }),
}));
