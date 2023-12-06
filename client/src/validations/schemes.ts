import * as yup from "yup";
import {
  commentSchema,
  confirmPasswordSchema,
  contentPostSchema,
  emailSchema,
  nameSchema,
  passwordSchema,
  titlePostSchema,
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

export const CreatePostSchema = yup
  .object({
    title: titlePostSchema,
    content: contentPostSchema,
  })
  .required();

export const CommentSchema = yup
  .object({
    content: commentSchema,
  })
  .required();

export type LoginSchemaType = yup.InferType<typeof LoginSchema>;
export type SingUpSchemaType = yup.InferType<typeof SingUpSchema>;
export type CreatePostSchemaType = yup.InferType<typeof CreatePostSchema>;
export type CommentSchemaType = yup.InferType<typeof CommentSchema>;
