import { FC, useEffect, useState } from "react";
import { Modal, ModalContent } from "@nextui-org/react";
import { UseDisclosureReturn } from "@nextui-org/use-disclosure";

import LoginContent from "./components/LoginContent";
import SingUpContent from "./components/SingUpContent";
import { SelectedType } from "./types/SwitchSelectedType";
import EmailMessageContent from "./components/EmailMessageContent";

type AuthModalProps = Pick<UseDisclosureReturn, "isOpen" | "onOpenChange">;

const AuthModal: FC<AuthModalProps> = ({ isOpen, onOpenChange }) => {
  const [selected, setSelected] = useState<SelectedType>("login");

  const closeAuthModal = () => {
    isOpen && onOpenChange();
  };

  useEffect(() => {
    setSelected("login");
  }, [isOpen]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        backdrop="opaque"
        // hideCloseButton
        className="bg-background"
      >
        <ModalContent>
          {selected === "login" ? (
            <LoginContent
              onSwitchSelect={setSelected}
              closeAuthModal={closeAuthModal}
            />
          ) : selected === "signup" ? (
            <SingUpContent onSwitchSelect={setSelected} />
          ) : (
            <EmailMessageContent onSwitchSelect={setSelected} />
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthModal;
