import {
  AuthError,
  AuthResponse,
  AuthTokenResponse,
  OAuthResponse,
} from "@supabase/supabase-js";
import { client } from "src/services/supabase/config/supabase";

export type TypeSignIn = Promise<OAuthResponse | AuthTokenResponse>;
export type TypeSignUp = Promise<AuthResponse>;
export type TypeLogOut = Promise<{
  error: AuthError | null;
}>;

export const signInGoogle = async (): TypeSignIn => {
  return await client.auth.signInWithOAuth({
    provider: "google",
  });
};

export const signInGithub = async (): TypeSignIn => {
  return await client.auth.signInWithOAuth({
    provider: "github",
  });
};

export const signInFacebook = async (): TypeSignIn => {
  return await client.auth.signInWithOAuth({
    provider: "facebook",
  });
};

export const signInEmailAndPassword = async (
  email: string,
  password: string,
): TypeSignIn => {
  return await client.auth.signInWithPassword({
    email: email,
    password: password,
  });
};

export const signUpEmailAndPassword = async (
  name: string,
  email: string,
  password: string,
): TypeSignUp => {
  return await client.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        name: name,
      }
    }
  });
};

export const logOut = async (): TypeLogOut => {
  const result = await client.auth.signOut();
  document.location.reload();
  return result;
};
