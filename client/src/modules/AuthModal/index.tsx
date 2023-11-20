import { FC, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  Input,
  Tabs,
  Tab,
  Spacer,
} from "@nextui-org/react";
import { UseDisclosureReturn } from "@nextui-org/use-disclosure";
import LoginContent from "./components/LoginContent";

type AuthModalProps = Pick<UseDisclosureReturn, "isOpen" | "onOpenChange">;

const AuthModal: FC<AuthModalProps> = ({ isOpen, onOpenChange }) => {
  // const [selected, setSelected] = useState<React.Key>("login");

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        backdrop="opaque"
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              {/* <ModalHeader className="flex flex-col gap-1">Hi👋</ModalHeader> */}
              <Spacer y={2} />
              <ModalBody>
                {/* <Tabs
                  fullWidth
                  size="md"
                  aria-label="Tabs form"
                  selectedKey={selected}
                  onSelectionChange={setSelected}
                >
                  <Tab key="login" title="Login">
                    <form className="flex flex-col gap-4">
                      <Input isRequired label="Email" type="email" />
                      <Input isRequired label="Password" type="password" />
                    </form>
                  </Tab>
                  <Tab key="sign-up" title="Sign up">
                    <form className="flex flex-col gap-4">
                      <Input isRequired label="Name" type="name" />
                      <Input isRequired label="Email" type="email" />
                      <Input isRequired label="Password" type="password" />
                    </form>
                  </Tab>
                </Tabs> */}

                {/* <div className="flex justify-between px-1 py-2">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                </div> */}

                <LoginContent />
              </ModalBody>

              <ModalFooter>
                <Button
                  className="bg-transparent"
                  variant="flat"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthModal;
