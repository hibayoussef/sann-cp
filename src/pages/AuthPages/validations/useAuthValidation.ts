import * as yup from "yup";

// Sign In Validation
export const useSignInValidation = () => {
  const signInSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),

    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long")
      .max(20, "Password must be at most 20 characters long"),
  });

  return { signInSchema };
};
