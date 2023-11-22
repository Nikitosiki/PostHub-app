import * as yup from "yup";

export const nameSchema = yup
  .string()
  .min(3, "Name must be at least 3 characters")
  .max(50, "Name must be at most 50 characters")
  .matches(
    /^[a-zA-Z0-9\s]+$/,
    "Name can only contain letters, numbers, and spaces",
  )
  .required("Name is required");

export const emailSchema = yup
  .string()
  .email("Enter a valid email")
  .max(255, "Email must be at most 255 characters")
  .required("Email is required");

export const passwordSchema = yup
  .string()
  .min(6, "Password must be at least 6 characters")
  .max(50, "Password must be at most 50 characters")
  .matches(/^[a-zA-Z0-9]+$/, "Password can only contain letters and numbers")
  .required("Password is required");

export const confirmPasswordSchema = yup
  .string()
  .oneOf([yup.ref("password"), undefined], "Passwords must match")
  .max(50, "Confirm password must be at most 50 characters")
  .required("Confirm password is required");
