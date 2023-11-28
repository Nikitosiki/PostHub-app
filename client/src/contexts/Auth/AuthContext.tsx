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
import { getUserByUid } from "src/api/supabase/user";

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
        // console.log(value.data.user);
        getUserByUid(value.data.user.id).then((user) =>
          user ? setUser(user) : setUser(null),
        );
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
