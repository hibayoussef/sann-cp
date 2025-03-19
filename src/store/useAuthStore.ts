import { create } from "zustand";
import type { AuthState } from "../types/store";

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  permissions: JSON.parse(localStorage.getItem("permissions")!) ?? null,

  // login: (userData: ILoginRequest, token: string) => {
  login: (userData: any, token: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("permissions", JSON.stringify(userData?.permissions));
    set({
      token,
      isAuthenticated: true,
      permissions: userData?.permissions,
    });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("permissions");

    set({
      token: null,
      isAuthenticated: false,
      permissions: [],
    });
  },
}));
