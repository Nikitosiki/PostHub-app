import { FC } from "react";
import { Chip, ChipProps } from "@nextui-org/react";
import { Link } from "react-router-dom";

import { ITag } from "src/interfaces";

type TypeTagProps = {
  tag: ITag;
  disableLink?: boolean;
  onClose?: () => void;
  className?: string;
} & ChipProps;

const Tag: FC<TypeTagProps> = ({
  tag,
  onClose,
  disableLink,
  className,
  ...props
}) => {
  const content = (
    <Chip
      onClose={onClose}
      className={`bg-default-200 ${className}`}
      {...props}
    >
      {tag.title}
    </Chip>
  );

  return disableLink ? content : <Link to={`/tag/${tag.id}`}>{content}</Link>;
};

export default Tag;
