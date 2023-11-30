import { FC } from "react";
import { Chip, ChipProps } from "@nextui-org/react";
import { BsStars } from "react-icons/bs";

type TypeTagTextProps = {
  tagName: string;
  onClose?: () => void;
  className?: string;
} & ChipProps;

const TagPrev: FC<TypeTagTextProps> = ({
  tagName,
  onClose,
  className,
  ...props
}) => {
  return (
    <>
      <Chip
        onClose={onClose}
        className={`bg-primary-100 text-primary ${className}`}
        {...props}
      >
        <div className="inline-flex items-center gap-1 py-1">
          <BsStars />
          <span>{tagName}</span>
        </div>
      </Chip>
    </>
  );
};

export default TagPrev;
