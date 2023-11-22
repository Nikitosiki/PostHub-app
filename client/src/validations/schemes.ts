import * as yup from "yup";
import {
  confirmPasswordSchema,
  emailSchema,
  nameSchema,
  passwordSchema,
} from "./parts";

export const LoginSchema = yup
  .object({
    email: emailSchema,
    password: passwordSchema,
  })
  .required();

export const SingUpSchema = yup
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .required();

export type LoginSchemaType = yup.InferType<typeof LoginSchema>;
export type SingUpSchemaType = yup.InferType<typeof SingUpSchema>;
