import { TypeSignIn, TypeLogOut } from "./AuthFunctions";
import { IUser } from "src/interfaces";

export type AuthModalType = {
  isOpenAuth: boolean;
  onOpenAuth: () => void;
  onCloseAuth: () => void;
  onOpenChangeAuth: () => void;
};

export type UserAuthType = IUser | null;

export type AuthContextPops = {
  user: UserAuthType;
  signInGoogle(): TypeSignIn | Promise<void>;
  signInGithub(): TypeSignIn | Promise<void>;
  signInFacebook(): TypeSignIn | Promise<void>;
  signInEmailAndPassword(
    email: string,
    password: string,
  ): TypeSignIn | Promise<void>;
  logOut(): TypeLogOut | Promise<void>;
} & AuthModalType;
