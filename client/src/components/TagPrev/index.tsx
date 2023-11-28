import { FC } from "react";
import { Chip } from "@nextui-org/react";
import { BsStars } from "react-icons/bs";

type TypeTagTextProps = {
  tagName: string;
  close?: () => void;
  className?: string;
};

const TagPrev: FC<TypeTagTextProps> = ({ tagName, close, className }) => {
  return (
    <>
      <Chip
        onClose={close}
        className={`bg-primary-100 text-primary ${className}`}
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
