import { _axios } from "../interceptor/http-config";
import type { ILoginDTO, ILoginRequest } from "../types/auth";

export const _AuthApi = {
  // CREATE ACCOUNT
  newAccount: async (data: any) => {
    return _axios.post("/auth/register", data).then((res) => res.data);
  },

  // LOGIN
  login: async (data: ILoginRequest) => {
    const res = await _axios.post<ILoginDTO>("/auth/login", data);
    return res.data;
  },

  // VERIFY EMAIL
  verifyEmail: async (token: string) => {
    return _axios.post("/auth/verfiy-email", { token }).then((res) => res.data);
  },

  // CHECK EMAIL
  checkEmail: async (email: string) => {
    return _axios.post("/auth/check-email", { email }).then((res) => res.data);
  },

  // RESEND VERIFICATION EMAIL
  resendVerificationEmail: async (email: string) => {
    return _axios
      .post("/auth/resend-verification-email", { email })
      .then((res) => res.data);
  },

  // FORGOT PASSWORD
  forgotPassword: async (email: string) => {
    return _axios
      .post("/auth/forgot-password", { email })
      .then((res) => res.data);
  },

  // RESET PASSWORD
  resetPassword: async (token: string, password: string) => {
    return _axios
      .post("/auth/reset-password", { token, password })
      .then((res) => res.data);
  },

  // LOGOUT
  logout: async () => {
    try {
      const res = await _axios.post("/auth/logout");
      _AuthApi.destroyToken(); 
      return res.data;
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  },

  // STORE TOKEN
  storeToken: (token: string) => {
    localStorage.setItem("token", token);
  },

  // GET TOKEN
  getToken: (): string | null => localStorage.getItem("token"),

  // STORE ROLES
  storeRole: (role: string[] | string) => {
    const roleData = Array.isArray(role) ? role : [role];
    localStorage.setItem("role", JSON.stringify(roleData));
  },

  // GET ROLES
  getRole: (): string[] | null => {
    const role = localStorage.getItem("role");
    return role ? JSON.parse(role) : null;
  },

  // STORE USER
  storeUser: (user: any) => {
    localStorage.setItem("user", JSON.stringify(user));
  },

  // GET USER
  getUser: (): any => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  // STORE PERMISSIONS
  storePermissions: (permissions: string[]) => {
    localStorage.setItem("permissions", JSON.stringify(permissions));
  },

  // GET PERMISSIONS
  getPermissions: (): string[] | null => {
    const permissions = localStorage.getItem("permissions");
    return permissions ? JSON.parse(permissions) : null;
  },

  // DELETE PERMISSIONS
  destroyPermissions: () => {
    localStorage.removeItem("permissions");
  },

  destroyToken: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // window.location.reload();
  },
};
