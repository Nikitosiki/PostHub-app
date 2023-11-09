import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Tabs,
  Tab,
  Spacer,
} from "@nextui-org/react";

const AuthButton = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selected, setSelected] = React.useState<React.Key>("login");

  return (
    <>
      <Button
        as={Link}
        color="primary"
        variant="flat"
        onClick={onOpen}
        radius="full"
      >
        Login
      </Button>
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
                <Tabs
                  fullWidth
                  size="md"
                  aria-label="Tabs form"
                  selectedKey={selected}
                  onSelectionChange={setSelected}
                >
                  <Tab key="login" title="Login">
                    <form className="flex flex-col gap-4">
                      <Input
                        isRequired
                        label="Email"
                        // placeholder="Enter your email"
                        type="email"
                      />
                      <Input
                        isRequired
                        label="Password"
                        // placeholder="Enter your password"
                        type="password"
                      />
                      {/* <div className="flex justify-end gap-2">
                        <Button fullWidth color="primary">
                          Login
                        </Button>
                      </div> */}
                    </form>
                  </Tab>
                  <Tab key="sign-up" title="Sign up">
                    <form className="flex flex-col gap-4">
                      <Input
                        isRequired
                        label="Name"
                        // placeholder="Enter your name"
                        type="name"
                      />
                      <Input
                        isRequired
                        label="Email"
                        // placeholder="Enter your email"
                        type="email"
                      />
                      <Input
                        isRequired
                        label="Password"
                        // placeholder="Enter your password"
                        type="password"
                      />
                      {/* <div className="flex justify-end gap-2">
                        <Button fullWidth color="primary">
                          Sign up
                        </Button>
                      </div> */}
                    </form>
                  </Tab>
                </Tabs>
                {/* <Input
                  autoFocus
                  endContent={
                    <MailIcon className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
                  }
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                />
                <Input
                  endContent={
                    <LockIcon className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
                  }
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                /> */}
                <div className="flex justify-between px-1 py-2">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                </div>
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

export default AuthButton;
