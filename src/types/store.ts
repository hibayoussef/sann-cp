import type { ILoginRequest } from "./auth";
import type { PermissionDTO } from "./user";

// useAuthStore Type
export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  firstName?: string;
  lastName?: string;
  profileImageURL?: string;
  email?: string;
  roleNames?: string[];
  permissions?: any;
  login: (userData: ILoginRequest, token: string) => void;
  logout: () => void;
}
