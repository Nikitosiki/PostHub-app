import { FC } from "react";
import { Chip } from "@nextui-org/react";
import { IReactions } from "src/interfaces";
import { toReactionViews } from "src/utils/reactionView";

type TypeReactionsProps = {
  reactions: IReactions;
  className?: string;
};

const Reactions: FC<TypeReactionsProps> = ({ reactions, className }) => {
  const reactionsView = toReactionViews(reactions);
  let reactionsCount: number = 0;

  return (
    <>
      <Chip className={`${reactionsView.length === 0 && "hidden"} bg-default-100 p-1 text-base ${className}`}>
        <div className="flex flex-row">
          {reactionsView
            .filter((reaction) => reaction.count > 0)
            .map((reaction) => {
              reactionsCount += reaction.count;
              return (
                <div className="-ml-2 h-6 w-6 rounded-full bg-default-100 font-notocolor dark:font-noto">
                  {reaction.emoji}
                </div>
              );
            })}
          <div className="ml-1 mt-[0.125rem] text-sm">{reactionsCount}</div>
        </div>
      </Chip>
    </>
  );
};

export default Reactions;
