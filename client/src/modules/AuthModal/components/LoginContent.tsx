import { Button } from "@nextui-org/react";
import { signInGithub } from "src/contexts/Auth/AuthFunction";

const LoginContent = () => {
  return (
    <div>
      <Button
        onClick={() => {
          signInGithub();
        }}
      >
        Github
      </Button>
    </div>
  );
};

export default LoginContent;
