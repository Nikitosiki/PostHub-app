import { FC } from "react";
import { Chip } from "@nextui-org/react";
import { Link } from "react-router-dom";

import { ITag } from "src/interfaces";

type TypeTagProps = {
  tag: ITag;
  disableLink?: boolean;
  onClose?: () => void;
  className?: string;
};

const Tag: FC<TypeTagProps> = ({ tag, onClose, disableLink, className }) => {
  const content = (
    <Chip onClose={onClose} className={`bg-default-200 ${className}`}>
      {tag.title}
    </Chip>
  );

  return disableLink ? content : <Link to={`/tag/${tag.id}`}>{content}</Link>;
};

export default Tag;
