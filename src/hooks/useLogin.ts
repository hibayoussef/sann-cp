import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { _axios } from "../interceptor/http-config";
import { useSignInValidation } from "../pages/AuthPages/validations/useAuthValidation";
import { _AuthApi } from "../services/auth.service";
import { useAuthStore } from "../store/useAuthStore";
import type { ILoginRequest } from "../types/auth";
import { toast } from "react-toastify";

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      return _axios.post("/auth/register", data).then((res) => res.data);
    },
  });
};

export const useLogin = () => {
  const { signInSchema } = useSignInValidation();
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const { register, handleSubmit, formState } = useForm<ILoginRequest>({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { errors } = formState;

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (input: ILoginRequest) => {
      const res = await _AuthApi.login(input);
      return res;
    },
    onSuccess: (data: any) => {
      login(data?.data?.user, data?.data?.token);
      navigate("/home");
    },
    onError: (error) => {
      console.error("Error logging in:", error);
    },
  });

  const onSubmit: SubmitHandler<ILoginRequest> = (input) => {
    mutate(input);
  };

  return {
    errors,
    isPending,
    error,
    onSubmit,
    register,
    handleSubmit,
  };
};

export const useVerifyEmail = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (token: string) => {
      return _AuthApi.verifyEmail(token);
    },
    onSuccess: () => {
      setTimeout(() => navigate("/signin"), 3000);
    },
    onError: (error) => {
      console.error("Email verification failed:", error);
    },
  });
};

export const useResendVerificationEmail = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      return _AuthApi.resendVerificationEmail(email);
    },
    onSuccess: () => {
      alert("Verification email resent. Check your inbox!");
    },
    onError: (error) => {
      console.error("Failed to resend verification email:", error);
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      return _AuthApi.forgotPassword(email);
    },
    // onSuccess: () => {
    //   toast.success("A password reset link has been sent to your email.");
    // },
    // onError: (error) => {
    //   toast.error("Failed to send reset email. Please try again.");
    //   console.error("Error sending reset email:", error);
    // },
  });
};

export const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({
      token,
      password,
    }: {
      token: string;
      password: string;
    }) => {
      return _AuthApi.resetPassword(token, password);
    },
    onSuccess: () => {
      setTimeout(() => navigate("/signin"), 2000);
    },
    onError: (error) => {
      toast.error("Failed to reset password. Please try again.");
      console.error("Error resetting password:", error);
    },
  });
};

export const useCheckEmail = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      return _AuthApi.checkEmail(email);
    },
  });
};
