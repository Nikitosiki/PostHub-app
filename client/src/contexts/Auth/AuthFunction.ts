import { AuthError, OAuthResponse, createClient } from "@supabase/supabase-js";

export type TypeSignIn = Promise<OAuthResponse>;
export type TypeLogOut = Promise<{
  error: AuthError | null;
}>;

export const client = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export const signInGoogle = async () => {};

export const signInGithub = async (): TypeSignIn => {
  return await client.auth.signInWithOAuth({
    provider: "github",
  });
};

export const signInEmailAndPassword = async (
  email: string,
  password: string,
) => {
  // const { data, error } = await client.auth.signUp({
  //   email: 'example@email.com',
  //   password: 'example-password',
  // })
  // console.log(data, error)
};

export const logOut = async (): TypeLogOut => {
  const result = await client.auth.signOut();
  document.location.reload();
  return result;
};
