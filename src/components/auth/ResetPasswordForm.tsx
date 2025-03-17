import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { useResetPassword } from "../../hooks/useLogin";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import Loader from "../ui/loader/loader";

interface IResetPassword {
  password: string;
}

// Validation schema using Yup
const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required")
});

export default function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
 const { token } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetPassword>({
    resolver: yupResolver(resetPasswordSchema),
  });

  const { mutate, isPending, error, isSuccess } = useResetPassword();

  const onSubmit: SubmitHandler<IResetPassword> = (data) => {
    if (!token) {
      alert("Invalid or missing token");
      return;
    }
    mutate({ token, password: data.password });
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8 text-center">
            <h2 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-sm md:text-md">
              Set Your New Password
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Create a strong password to secure your account.
            </p>
          </div>

          {!token ? (
            <p className="text-red-500 text-center text-sm">
              Invalid or missing token. Please check your email link.
            </p>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Enter New Password <span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="New password"
                      {...register("password")}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* <div>
                  <Label>
                    Confirm New Password{" "}
                    <span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      {...register("confirmPassword")}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div> */}

                <div>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium disabled:opacity-50 text-white transition rounded-lg  shadow-theme-xs bg-[#575db1] hover:bg-[#474ca1]"
                  >
                    {" "}
                    {isPending ? <Loader /> : "Update Password"}
                  </button>
                </div>

                {error && (
                  <p className="text-red-500 text-sm text-center mt-2">
                    {error.message}
                  </p>
                )}
                {isSuccess && (
                  <p className="text-green-500 text-sm text-center mt-2">
                    Password updated successfully! Redirecting...
                  </p>
                )}
              </div>
            </form>
          )}

          {/* <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                Sign Up
              </a>
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
