import { Button } from "@nextui-org/react";
import { signInGithub, signInGoogle } from "src/contexts/Auth/AuthFunction";

const LoginContent = () => {
  return (
    <div className="flex justify-center gap-2">
      <Button
        onClick={() => {
          signInGithub();
        }}
      >
        Github
      </Button>

      <Button
        onClick={() => {
          signInGoogle();
        }}
      >
        Google
      </Button>
    </div>
  );
};

export default LoginContent;
