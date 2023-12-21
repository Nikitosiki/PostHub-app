import { FC } from "react";
import { Button } from "@nextui-org/react";

type TypeReactionProps = {
  emoji: string;
  count: number;
  isSelected: boolean;
  className?: string;
};

const Reaction: FC<TypeReactionProps> = ({
  emoji,
  count,
  isSelected = false,
  className,
}) => {
  return (
    <>
      {/* className="font-notocolor dark:font-noto" */}
      <Button
        size="sm"
        className={
          `h-7 min-w-unit-7 gap-2 rounded-full bg-default-100 pl-1 text-sm ` +
          `${isSelected ? "bg-default-200 text-primary" : ""} ${className}`
        }
        startContent={<span className="text-lg">{emoji}</span>}
        endContent={<span>{count}</span>}
      />
    </>
  );
};

export default Reaction;
