import { FC } from "react";
import { Chip } from "@nextui-org/react";
import { getReactionIcon } from "src/utils";
import { IReactions } from "src/interfaces";

type TypeReactionsProps = {
  reactions: IReactions;
  className?: string;
};

const Reactions: FC<TypeReactionsProps> = ({ reactions, className }) => {
  return (
    <>
      {/* border-1 border-primary-200 */}
      <Chip className={`bg-default-100 p-1 text-base ${className}`}>
        <div className="flex flex-row">
          {reactions
            .filter((reaction) => reaction.count > 0)
            .map((reaction) => (
              <div className="-ml-2 h-6 w-6 rounded-full bg-default-100 font-notocolor dark:font-noto">
                {getReactionIcon(reaction.grade)}
              </div>
            ))}
          <div className="ml-1 mt-[0.125rem] text-sm">{13}</div>
        </div>
      </Chip>
    </>
  );
};

export default Reactions;
