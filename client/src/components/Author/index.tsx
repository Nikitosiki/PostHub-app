import { FC } from "react";
import { User, UserProps } from "@nextui-org/react";
import { Link } from "react-router-dom";

import { IUser } from "src/interfaces";
import { nullToUndefined } from "src/utils";

type TypeAuthorProps = {
  author: IUser;
  description?: string;
} & Omit<UserProps, "name">;

const Author: FC<TypeAuthorProps> = ({ author, description, ...rest }) => {
  return (
    <>
      <Link to={`/author/${author.id}`}>
        <User
          name={author.name}
          description={description}
          className=""
          classNames={{
            name: "font-bold text-default-600 truncate max-w-[10rem]",
            description: "text-default-500",
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
        />
      </Link>
    </>
  );
};

export default Author;
