import { FC } from "react";
import { Chip } from "@nextui-org/react";
import { IReactions } from "src/interfaces";
import { toReactionViews } from "src/utils";

type TypeReactionsProps = {
  reactions: IReactions;
  className?: string;
};

const ShortReactions: FC<TypeReactionsProps> = ({ reactions, className }) => {
  const reactionsTemp = toReactionViews(reactions);
  const reactionsView = reactionsTemp.slice(0, 5).reverse();
  const reactionsCount = reactionsTemp.reduce((a, b) => a + b.count, 0);

  return (
    <>
      <Chip
        className={`${
          reactionsView.length === 0 && "hidden"
        } bg-default-100 p-1 text-base ${className}`}
      >
        <div className="flex flex-row">
          {reactionsView.map((reaction) => {
            return (
              // font-notocolor dark:font-noto
              <div
                key={reaction.emoji}
                className="-ml-2 h-full rounded-full bg-default-100 text-lg"
              >
                {reaction.emoji}
              </div>
            );
          })}
          <div className="my-auto ml-1 text-sm">{reactionsCount}</div>
        </div>
      </Chip>
    </>
  );
};

export default ShortReactions;
