import { FC } from "react";
import { Chip } from "@nextui-org/react";
import { getReactionIcon } from "src/utils";
import { IReaction } from "src/interfaces";

type TypeReactionProps = {
  className?: string;
} & IReaction;

const Reaction: FC<TypeReactionProps> = ({ grade, count, className }) => {
  return (
    <>
      <Chip
        className={`border-1 border-primary-200 bg-inherit pl-0 pr-1 ${className}`}
      >
        <div className="flex flex-row gap-1">
          <div className="font-notocolor dark:font-noto">
            {getReactionIcon(grade)}
          </div>
          <div>{count}</div>
        </div>
      </Chip>
    </>
  );
};

export default Reaction;
