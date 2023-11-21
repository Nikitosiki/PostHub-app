import { FC, ReactNode, createContext, useEffect, useState } from "react";

import {
  signInGoogle,
  signInGithub,
  signInEmailAndPassword,
  logOut,
  TypeSignIn,
  TypeLogOut,
  client,
} from "./AuthFunction";
import { IUser } from "src/interfaces";

type UserAuthType = IUser | null;

type AuthContextPops = {
  user: UserAuthType;
  signInGoogle(): TypeSignIn | Promise<void>;
  signInGithub(): TypeSignIn | Promise<void>;
  signInEmailAndPassword(
    email: string,
    password: string,
  ): TypeSignIn | Promise<void>;
  logOut(): TypeLogOut | Promise<void>;
};

export const AuthContext = createContext<AuthContextPops>({
  user: null,
  signInGoogle: async () => {},
  signInGithub: async () => {},
  signInEmailAndPassword: async () => {},
  logOut: async () => {},
});

export const AuthContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserAuthType>(null);

  useEffect(() => {
    async function getUserData() {
      await client.auth.getUser().then((value) => {
        if (value.data.user === null) {
          setUser(null);
          console.log(12);
          return;
        }
        console.log(value.data.user);
        setUser({
          id: value.data.user.id,
          name:
            value.data.user.user_metadata.user_name ??
            value.data.user.user_metadata.name,
          role: "user",
          email: value.data.user.email ?? "",
          gender: null,
          image_url: value.data.user.user_metadata.avatar_url,
          reg_date: new Date(value.data.user.confirmed_at ?? new Date()),
        });
      });
    }
    getUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signInGoogle,
        signInGithub,
        signInEmailAndPassword,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
