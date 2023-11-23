import { FC } from "react";
import {
  Button,
  Divider,
  Input,
  ModalBody,
  ModalHeader,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { GithubIcon, GoogleIcon, FacebookIcon } from "src/assets";
import {
  signInGithub,
  signInGoogle,
  signInFacebook,
  signInEmailAndPassword,
} from "src/contexts/Auth/AuthFunction";

import { CloseAuthModalType, SwitchSelectedType } from "../types/SwitchSelectedType";
import { LoginSchema, LoginSchemaType } from "src/validations";

const LoginContent: FC<SwitchSelectedType & CloseAuthModalType> = ({ onSwitchSelect, closeAuthModal }) => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = async (submitData: LoginSchemaType) => {
    const { data, error } = await signInEmailAndPassword(
      submitData.email,
      submitData.password,
    );
    if (error) {
      setError("password", {
        type: error?.status?.toString(),
        message: error?.message,
      });
    } else {
      closeAuthModal();
      location.reload();
    }
    console.log(data, error)
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <ModalHeader>
          <h2>Log in</h2>
        </ModalHeader>
        <ModalBody className="py-0 text-default-500">
          <p>Join the PostHub community</p>
        </ModalBody>
        <ModalBody className="flex flex-row justify-center gap-2 px-6 py-4">
          <Button
            size="md"
            className="w-full bg-background-100"
            onClick={() => {
              signInGithub();
            }}
          >
            <GithubIcon className="w-6 text-foreground" />
          </Button>
          <Button
            size="md"
            className="w-full bg-background-100"
            onClick={() => {
              signInGoogle();
            }}
          >
            <GoogleIcon className="w-6" />
          </Button>
          <Button
            size="md"
            className="w-full bg-background-100"
            onClick={() => {
              signInFacebook();
            }}
          >
            <FacebookIcon className="w-6 text-white" />
          </Button>
        </ModalBody>

        <Divider className="mx-6 w-auto" />

        <ModalBody className="py-4">
          <Input
            type="email"
            variant={"underlined"}
            label="Email"
            {...register("email")}
            errorMessage={errors.email?.message}
          />
          <Input
            type="password"
            variant={"underlined"}
            label="Password"
            {...register("password")}
            errorMessage={errors.password?.message}
          />
        </ModalBody>

        <ModalBody className="py-4">
          <Button type="submit">Log in</Button> {/* isDisabled={true} */}
          <span className="text-center text-sm text-default-500">
            Don't have an account?{" "}
            <span
              className="cursor-pointer text-default-600"
              onClick={() => {
                onSwitchSelect("signup");
              }}
            >
              Sign Up Now
            </span>
          </span>
        </ModalBody>
        {/* <ModalFooter>
        <p className="w-full text-center text-xs text-default-500">
          Our service is not responsible for any data loss on this resource.
        </p>
      </ModalFooter> */}
      </form>
    </>
  );
};

export default LoginContent;
