import { FC } from "react";
import { Chip } from "@nextui-org/react";

type TypeReactionProps = {
  className?: string;
  emoji: string;
  count: number;
}

const Reaction: FC<TypeReactionProps> = ({ emoji, count, className }) => {
  return (
    <>
      <Chip
        className={`border-1 border-primary-200 bg-inherit pl-0 pr-1 ${className}`}
      >
        <div className="flex flex-row gap-1">
          {/* <div className="font-notocolor dark:font-noto"> */}
            {emoji}
          {/* </div> */}
          <div>{count}</div>
        </div>
      </Chip>
    </>
  );
};

export default Reaction;
