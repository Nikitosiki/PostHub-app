import { FC } from "react";
import { Button } from "@nextui-org/react";
import { IReactionView } from "src/interfaces";

type TypeReactionProps = {
  reaction: IReactionView;
  isSelected: boolean;
  className?: string;
  onClick?: (id: number) => {};
};

const Reaction: FC<TypeReactionProps> = ({
  reaction,
  isSelected = false,
  className,
  onClick,
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
        startContent={<span className="text-lg">{reaction.emoji}</span>}
        endContent={<span>{reaction.count}</span>}
        onClick={() => onClick && onClick(reaction.id)}
      />
    </>
  );
};

export default Reaction;
