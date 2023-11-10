import { FC } from "react";
import { Chip } from "@nextui-org/react";
import { Link } from "react-router-dom";

import { ITag } from "src/interfaces";

type TypeTagProps = {
  tag: ITag;
  className?: string;
};

const Tag: FC<TypeTagProps> = ({ tag, className }) => {
  return (
    <>
      <Link to={`/tag/${tag.id}`}>
        <Chip className={`bg-default-300 ${className}`}>{tag.title}</Chip>
      </Link>
    </>
  );
};

export default Tag;
