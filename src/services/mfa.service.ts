import { _axios } from "@/interceptor/http-config";
import { AxiosResponse } from "axios";

interface AuthPayload {
  email: string;
  password: string;
}

interface CodePayload extends AuthPayload {
  code: string;
}

export const _TwoFactorApi = {
  // Enable 2FA
  enable2FA: async (data: AuthPayload) => {
    const response = await _axios.post(
      "/auth/user/two-factor-authentication",
      data
    );
    return response.data;
  },

  // Disable 2FA
  disable2FA: async (data: AuthPayload) => {
    const response = await _axios.delete(
      "/auth/user/two-factor-authentication",
      { data }
    );
    return response.data;
  },

  // Get QR Code for 2FA setup
  get2FAQRCode: async (data: AuthPayload) => {
    const response = await _axios.get<AxiosResponse<any>>(
      "/auth/user/two-factor-qr-code",
      { data }
    );
    return response.data;
  },

  // Get Recovery Codes
  getRecoveryCodes: async (data: AuthPayload) => {
    const response = await _axios.get<AxiosResponse<any>>(
      "/auth/user/two-factor-recovery-codes",
      { data }
    );
    return response.data;
  },

  // Regenerate Recovery Codes
  regenerateRecoveryCodes: async (data: AuthPayload) => {
    const response = await _axios.post(
      "/auth/user/two-factor-recovery-codes",
      data
    );
    return response.data;
  },

  // Handle 2FA Login (Verify Code)
  verify2FACode: async (data: CodePayload) => {
    const response = await _axios.post(
      "/auth/user/handle-two-factor-authentication",
      data
    );
    return response.data;
  },
};
