import { create } from "zustand";
import type { ILoginRequest } from "../types/auth";
import type { AuthState } from "../types/store";

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),

  // login: (userData: ILoginRequest, token: string) => {
  login: (userData: ILoginRequest, token: string) => {
    localStorage.setItem("token", token);

    set({
      token,
      isAuthenticated: true,
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
