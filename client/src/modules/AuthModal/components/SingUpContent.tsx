import { FC } from "react";
import { Button, Input, ModalBody, ModalHeader } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { signUpEmailAndPassword } from "src/contexts/Auth/AuthFunctions";
import { SwitchSelectedType } from "../types/SwitchSelectedType";
import { SingUpSchema, SingUpSchemaType } from "src/validations";

const SingUpContent: FC<SwitchSelectedType> = ({ onSwitchSelect }) => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<SingUpSchemaType>({
    resolver: yupResolver(SingUpSchema),
  });

  const onSubmit = async (submitData: SingUpSchemaType) => {
    const { data, error } = await signUpEmailAndPassword(
      submitData.name,
      submitData.email,
      submitData.password,
    );
    if (error) {
      setError("password", {
        type: error?.status?.toString(),
        message: error?.message,
      });
    } else {
      onSwitchSelect("emailMessage");
    }
    console.log(data, error);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <ModalHeader>
          <h2>Sing Up</h2>
        </ModalHeader>
        <ModalBody className="py-0 text-default-500">
          <p>Create a new account</p>
        </ModalBody>

        {/* <Divider className="mx-6 w-auto" /> */}

        <ModalBody className="py-4">
          <Input
            type="name"
            variant={"underlined"}
            label="First Name"
            {...register("name")}
            errorMessage={errors.name?.message}
          />
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
          <Input
            type="password"
            variant={"underlined"}
            label="Password"
            {...register("confirmPassword")}
            errorMessage={errors.confirmPassword?.message}
          />
        </ModalBody>

        <ModalBody className="py-4">
          <Button type="submit">Sing Up</Button>
          <span className="text-center text-sm text-default-500">
            Already have an account?{" "}
            <span
              className="cursor-pointer text-default-600"
              onClick={() => {
                onSwitchSelect("login");
              }}
            >
              Log In Now
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

export default SingUpContent;
