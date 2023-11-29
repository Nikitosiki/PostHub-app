import { FC } from "react";
import { Input } from "@nextui-org/react";

type TypeErrorMessageProps = {
  message?: string;
};

const ErrorMessage: FC<TypeErrorMessageProps> = ({ message }) => {
  return (
    <Input classNames={{ inputWrapper: "hidden" }} errorMessage={message} />
  );
};

export default ErrorMessage;
