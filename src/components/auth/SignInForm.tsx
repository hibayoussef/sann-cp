import { useState } from "react";
import { Link } from "react-router-dom";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Checkbox from "../form/input/Checkbox";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { useLogin } from "../../hooks/useLogin";
import { Formik, Form, Field } from "formik";
import { signinValidationSchema } from "./registerStepps/validations/siginValidation";
import Loader from "../ui/loader/loader";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const { onSubmit, errors, isPending } = useLogin();

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8 text-center">
            <h2 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-sm md:text-md">
              WELCOME BACK!
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>
          <div>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={signinValidationSchema}
              onSubmit={(values, actions) => {
                onSubmit(values);
                actions.setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  <div>
                    <Label>
                      Email Address <span className="text-error-500">*</span>
                    </Label>
                    <Field
                      as={Input}
                      type="email"
                      name="email"
                      placeholder="info@gmail.com"
                      error={!!errors?.email}
                      hint={errors?.email?.message}
                    />
                  </div>
                  <div>
                    <Label>
                      Password <span className="text-error-500">*</span>
                    </Label>
                    <div className="relative">
                      <Field
                        as={Input}
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        error={!!errors?.password}
                        hint={errors?.password?.message}
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
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox checked={isChecked} onChange={setIsChecked} />
                      <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                        Remember me
                      </span>
                    </div>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-red-600 hover:text-red-700 dark:text-red-500"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting || isPending}
                      className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium disabled:opacity-50 text-white transition rounded-lg  shadow-theme-xs bg-[#575db1] hover:bg-[#474ca1]"
                    >
                      {" "}
                      {isPending ? <Loader /> : "Sign in"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Don&apos;t have an account?{" "}
                <Link
                  to="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
