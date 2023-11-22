import { FC } from "react";
import { ModalBody } from "@nextui-org/react";

import { SwitchSelectedType } from "../types/SwitchSelectedType";

const EmailMessageContent: FC<SwitchSelectedType> = ({ onSwitchSelect }) => {
  return (
    <div className="h-[480px]">
      <ModalBody className="flex h-full flex-col items-center justify-center gap-2">
        <span
          className="material-symbols-rounded my-2 cursor-pointer text-6xl"
          onClick={() => {
            window.location.href = `mailto:`;
          }}
        >
          mark_email_unread
        </span>
        <p className="">Confirm your mail</p>
        <p
          className="cursor-pointer text-sm text-default-500"
          onClick={() => {
            onSwitchSelect("login");
          }}
        >
          Return to login
        </p>
      </ModalBody>
    </div>
  );
};

export default EmailMessageContent;
