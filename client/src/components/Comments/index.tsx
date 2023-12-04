import { FC } from "react";

import Comment from "src/components/Comment";
import { IComments, IUser } from "src/interfaces";

interface ICommentsProps {
  comments: IComments;
  user?: IUser | null;
}

const Comments: FC<ICommentsProps> = ({ comments, user = null }) => {
  const getComments = (comments: IComments) => {
    return comments.map((comment) => (
      <Comment
        key={comment.id}
        comment={comment}
        fullFunct={user ? true : false}
      >
        {getComments(comment.child_comments ?? [])}
      </Comment>
    ));
  };

  return getComments(comments);
};

export default Comments;
