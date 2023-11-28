import { FC } from "react";
import { Chip } from "@nextui-org/react";
import { Link } from "react-router-dom";

import { ITag } from "src/interfaces";

type TypeTagProps = {
  tag: ITag;
  close?: () => void;
  className?: string;
};

const Tag: FC<TypeTagProps> = ({ tag, close, className }) => {
  return (
    <>
      <Link to={`/tag/${tag.id}`}>
        <Chip onClose={close} className={`bg-default-200 ${className}`}>
          {tag.title}
        </Chip>
      </Link>
    </>
  );
};

export default Tag;
