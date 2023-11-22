import { Button, useDisclosure, Link } from "@nextui-org/react";
import AuthModal from "src/modules/AuthModal";

const AuthButton = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
      <AuthModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default AuthButton;
