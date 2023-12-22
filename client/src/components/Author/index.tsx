import { FC } from "react";
import { Avatar, AvatarProps } from "@nextui-org/react";
import { Link } from "react-router-dom";

import { IUser } from "src/interfaces";
import { nullToUndefined } from "src/utils";
import { NavigateAuthorPage } from "src/paths";

type TypeAuthorProps = {
  author: IUser;
  description?: string;
  className?: string;
} & Omit<AvatarProps, "name">;

const Author: FC<TypeAuthorProps> = ({
  author,
  description,
  className,
  ...rest
}) => {
  return (
    <div className={`py-1 ${className}`}>
      <Link to={NavigateAuthorPage(author.id)}>
        {/* <User
          name={author.name}
          description={description}
          className=""
          classNames={{
            name: "font-bold text-default-600 truncate",
            description: "truncate text-default-500",
          }}
          avatarProps={{
            src: nullToUndefined(author.image_url),
            // isBordered: author.gender === "male" || author.gender === "female",
            isBordered: true,
            className: "mr-2 h-7 w-7 text-tiny ring-primary",
            // author.gender === "male" ? "ring-blue-400" : "ring-pink-400",
            // size: "sm",
          }}
          {...rest}
        /> */}

        <div className="mx-auto flex flex-row items-center gap-2 text-sm">
          <Avatar
            isBordered
            src={nullToUndefined(author.image_url)}
            className="mr-2 h-7 w-7 shrink-0 text-tiny ring-primary"
            imgProps={{referrerPolicy: "no-referrer"}}
            {...rest}
          />
          <div className="flex flex-col flex-nowrap overflow-hidden">
            <p className="truncate font-bold text-default-600">{author.name}</p>
            <p className="truncate text-xs text-default-500">{description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Author;
