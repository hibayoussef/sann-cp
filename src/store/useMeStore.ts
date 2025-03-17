import { create } from "zustand";
import { IMeResponse } from "../types/me";

interface MeStore {
  me: IMeResponse | null;
  organizationId: number | null;
  setMe: (data: IMeResponse) => void;
  clearMe: () => void;
}

export const useMeStore = create<MeStore>((set) => ({
  me: null,
  organizationId: null,
  setMe: (data) =>
    set({
      me: data,
      organizationId: data?.organization?.id,
    }),
  clearMe: () =>
    set({
      me: null,
      organizationId: null,
    }),
}));
