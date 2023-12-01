import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@nextui-org/react";

import { IComment } from "src/interfaces";
import { timeElapsedString, nullToUndefined } from "src/utils";
import { NavigateAuthorPage } from "src/paths";

interface ICommentProps {
  comment: IComment;
  children?: ReactNode;
}

const Comment: FC<ICommentProps> = ({ comment, children }) => {
  return (
    <>
      <div className="mb-2 flex flex-row gap-2">
        <Link to={NavigateAuthorPage(comment.author.id)}>
          <Avatar
            size="sm"
            name={comment.author.name}
            src={nullToUndefined(comment.author.image_url)}
          />
        </Link>
        <div>
          <div className="text-sm">
            <Link to={NavigateAuthorPage(comment.author.id)}>
              <span>{comment.author.name}</span>
            </Link>
            <span className="m-1 text-default-400">𐄁</span>
            <span className="text-default-400">
              {timeElapsedString(comment.created_at)}
            </span>
          </div>
          <p>{comment.content}</p>
          <div className="mt-2">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Comment;
