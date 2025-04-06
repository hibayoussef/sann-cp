import * as Yup from "yup";

export const signinValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const otpValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  otp: Yup.string().when("$emailSent", {
    is: (emailSent: boolean) => emailSent,
    then: (schema) =>
      schema
        .required("OTP is required")
        .length(6, "OTP must be 6 digits")
        .matches(/^\d+$/, "OTP must contain only numbers"),
  }),
});

export const CodeValidationSchema = Yup.object().shape({
  code: Yup.string()
    .required('Verification code is required')
    .matches(/^\d{6}$/, 'Code must be 6 digits')
});