import { Button, Link } from "@nextui-org/react";
import { useAuth } from "src/contexts";

const AuthButton = () => {
  const { onOpenAuth } = useAuth();

  return (
    <>
      <Button
        as={Link}
        color="primary"
        variant="flat"
        onClick={onOpenAuth}
        radius="full"
      >
        Login
      </Button>
    </>
  );
};

export default AuthButton;
