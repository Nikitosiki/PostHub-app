import { FC, useState } from "react";
import { Input, InputProps } from "@nextui-org/react";

type InputPropsType = {
  className?: string;
  props?: InputProps;
} & InputProps;

const InputTitle: FC<InputPropsType> = ({ className, ...props }) => {
  const [title, setTitle] = useState<string>("");

  return (
    <>
      <Input
        variant="bordered"
        placeholder="Title"
        classNames={{
          input: "text-lg",
          inputWrapper:
            "shadow-none border-default-200 data-[hover=true]:border-default-200 group-data-[focus=true]:border-default-200", // border-default-200/75
        }}
        endContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-small text-default-400">
              {title.length}/300
            </span>
          </div>
        }
        value={title}
        onValueChange={setTitle}
        maxLength={300}
        className={className ?? ""}
        {...props}
      />
    </>
  );
};

export default InputTitle;
