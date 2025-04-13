import { _TwoFactorApi } from "@/services/mfa.service";
import { useAuthStore } from "@/store/useAuthStore";
import { QueryKeys } from "@/utils/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface AuthPayload {
  email: string;
  password: string;
}

interface CodePayload extends AuthPayload {
  code: string;
}

// Enable 2FA
export const useEnable2FA = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: AuthPayload) => {
      return _TwoFactorApi.enable2FA(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.ME],
      });
    },
  });
};

// Disable 2FA
export const useDisable2FA = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: AuthPayload) => {
      return _TwoFactorApi.disable2FA(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.ME],
      });
    },
  });
};

// Get QR Code
export const useGet2FAQRCode = () => {
  return useMutation({
    mutationFn: async (data: AuthPayload) => {
      return _TwoFactorApi.get2FAQRCode(data);
    },
  });
};

// Get Recovery Codes
export const useGetRecoveryCodes = () => {
  return useMutation({
    mutationFn: async (data: AuthPayload) => {
      return _TwoFactorApi.getRecoveryCodes(data);
    },
  });
};

// Regenerate Recovery Codes
export const useRegenerateRecoveryCodes = () => {
  return useMutation({
    mutationFn: async (data: AuthPayload) => {
      return _TwoFactorApi.regenerateRecoveryCodes(data);
    },
  });
};

// Verify 2FA Code During Login
export const useVerify2FACode = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: async (data: CodePayload) => {
      return _TwoFactorApi.verify2FACode(data);
    },
    onSuccess: (data: any) => {
      login(data?.data, data?.data?.token);
      navigate("/home");
    },
  });
};
