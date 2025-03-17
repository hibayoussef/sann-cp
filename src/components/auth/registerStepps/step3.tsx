import { useState } from "react";
import Input from "../../form/input/InputField";
import Label from "../../form/Label";
import { EyeCloseIcon, EyeIcon } from "../../../icons";
import { useFormikContext } from "formik";
import { _AuthApi } from "../../../services/auth.service";
import { useMutation } from "@tanstack/react-query";

export default function Step3() {
  const [showPassword, setShowPassword] = useState(false);
  const [emailMessage, setEmailMessage] = useState<string | null>(null);

  const { values, handleBlur, handleChange, errors, touched } =
    useFormikContext<{ email: string; password: string; mobile: string }>();

  const { mutate: checkEmail, isPending } = useMutation({
    mutationFn: async (email: string) => _AuthApi.checkEmail(email),
    onSuccess: (message) => setEmailMessage(message?.message || ""),
    onError: () => setEmailMessage("Email Exist"),
  });

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    handleBlur(e);
    if (values.email) checkEmail(values.email);
  };

  const passwordRules = [
    {
      text: "At least 8 characters",
      check: (pass: string) => pass.length >= 8,
    },
    {
      text: "At least one symbol",
      check: (pass: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pass),
    },
    { text: "At least one number", check: (pass: string) => /\d/.test(pass) },
    {
      text: "At least one uppercase and one lowercase letter",
      check: (pass: string) => /[a-z]/.test(pass) && /[A-Z]/.test(pass),
    },
  ];

  return (
    <div className="flex flex-col w-full overflow-y-auto no-scrollbar">
      <div className="flex flex-col justify-center w-full mx-auto max-w-xl">
        <div className="w-full text-center mb-5 sm:mb-8">
          <h2 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90">
            Contact Information
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter your Contact Information!
          </p>
        </div>
        <form className="w-full space-y-5">
          {/* Email Field */}
          <div className="w-full">
            <Label>
              Email <span className="text-error-500">*</span>
            </Label>
            <Input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleEmailBlur}
              placeholder="info@gmail.com"
              className="w-full"
            />
            {isPending && (
              <p className="mt-2 text-sm text-[#575db1]">Checking...</p>
            )}
            {emailMessage == "Email Exist" && (
              <div
                className={`mt-2 p-2 text-sm rounded-md ${
                  emailMessage.includes("success")
                    ? "bg-green-100 text-green-700 border border-green-400"
                    : "bg-red-100 text-red-700 border border-red-400"
                }`}
              >
                {emailMessage}
              </div>
            )}
          </div>

          {/* Mobile Field */}
          <div className="w-full">
            <Label>
              Mobile <span className="text-error-500">*</span>
            </Label>
            <Input
              type="tel"
              name="mobile"
              value={values.mobile}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your Mobile Number"
              className="w-full"
            />
            {errors.mobile && touched.mobile && (
              <p className="text-red-500 text-sm">{errors.mobile}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="w-full">
            <Label>
              Password <span className="text-error-500">*</span>
            </Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your password"
                className="w-full"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute cursor-pointer right-4 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeIcon className="size-5 fill-gray-500" />
                ) : (
                  <EyeCloseIcon className="size-5 fill-gray-500" />
                )}
              </span>
            </div>
            {errors.password && touched.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-x-4 gap-y-2 mt-2">
              {passwordRules.map((rule, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <span
                    className={`w-5 h-5 flex items-center justify-center rounded-full border-2 text-xs ${
                      rule.check(values.password)
                        ? "border-green-600 bg-green-600 text-white"
                        : "border-gray-400 text-gray-400"
                    }`}
                  >
                    ✓
                  </span>
                  <span
                    className={`${
                      rule.check(values.password)
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    {rule.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
