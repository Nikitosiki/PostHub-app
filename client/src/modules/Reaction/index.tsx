import { FC } from "react";
import { Chip } from "@nextui-org/react";

const icon = (iconNumber: number): string => {
  switch (iconNumber) {
    case 1:
      return "🤨";
    case 2:
      return "🫡";
    case 3:
      return "😊";
    case 4:
      return "😄";
    case 5:
      return "🤪";

    default:
      return "❌";
  }
};

type TypeReactionProps = {
  iconNumber: number;
  number: number;
  className?: string;
};

const Reaction: FC<TypeReactionProps> = ({ iconNumber, number, className }) => {
  return (
    <>
      <Chip
        className={`border-1 border-primary-200 bg-inherit pl-0 pr-1 ${className}`}
      >
        <div className="flex flex-row gap-1">
          <div className="font-notocolor dark:font-noto">
            {icon(iconNumber)}
          </div>
          <div>{number}</div>
        </div>
      </Chip>
    </>
  );
};

export default Reaction;
