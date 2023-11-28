import { FC, useState } from "react";
import { Badge } from "@nextui-org/react";

// import { default as NumberComponent } from "src/components/Number";
import { IReactions } from "src/interfaces";
import { toReactionViews } from "src/utils/reactionView";

type TypeReactionsProps = {
  reactions: IReactions;
  className?: string;
};

const FullReactions: FC<TypeReactionsProps> = ({ reactions, className }) => {
  const [selectReaction, changeSelect] = useState<string | null>(null);
  const reactionsView = toReactionViews(reactions);
  // let reactionsCount: number = 0;

  // reactions.forEach((reaction) => {
  //   reactionsCount += reaction.count;
  // });

  const handleReactionClick = (reactionEmoji: string) => {
    reactionEmoji !== selectReaction
      ? changeSelect(reactionEmoji)
      : changeSelect(null);
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* <h3 className="text-lg">What do you think?</h3> */}

      <div className="rounded-full bg-background-200 px-8 text-center">
        {/* <h6 className="mt-2">{reactionsCount} Responses</h6> */}
        <div className="mt-4 flex flex-row gap-2">
          {reactionsView.map((reaction) => {
            return (
              <Badge
                color="primary"
                content={
                  selectReaction === reaction.emoji
                    ? reaction.count + 1
                    : reaction.count
                }
                className="mr-[4px] border-none"
              >
                <div
                  className="h-12 w-12 cursor-pointer text-center font-notocolor text-3xl dark:font-noto"
                  onClick={() => {
                    handleReactionClick(reaction.emoji);
                  }}
                >
                  {reaction.emoji}
                </div>
                {/* <NumberComponent value={5} /> */}
              </Badge>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FullReactions;
