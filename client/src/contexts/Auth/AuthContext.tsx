import { FC, ReactNode, createContext, useEffect, useState } from "react";
import { useDisclosure } from "@nextui-org/react";

import {
  signInGoogle,
  signInGithub,
  signInFacebook,
  signInEmailAndPassword,
  logOut,
  client,
} from "./AuthFunctions";
import { AuthContextPops, UserAuthType } from "./AuthTypes";
import AuthModal from "src/modules/AuthModal";

export const AuthContext = createContext<AuthContextPops>({
  user: null,
  signInGoogle: async () => {},
  signInGithub: async () => {},
  signInFacebook: async () => {},
  signInEmailAndPassword: async () => {},
  logOut: async () => {},
  isOpenAuth: false,
  onOpenAuth: () => {},
  onCloseAuth: () => {},
  onOpenChangeAuth: () => {},
});

export const AuthContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [user, setUser] = useState<UserAuthType>(null);

  useEffect(() => {
    async function getUserData() {
      await client.auth.getUser().then((value) => {
        if (value.data.user === null) {
          setUser(null);

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
        signInFacebook,
        signInEmailAndPassword,
        logOut,
        isOpenAuth: isOpen,
        onOpenAuth: onOpen,
        onCloseAuth: onClose,
        onOpenChangeAuth: onOpenChange,
      }}
    >
      {children}
      <AuthModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </AuthContext.Provider>
  );
};
