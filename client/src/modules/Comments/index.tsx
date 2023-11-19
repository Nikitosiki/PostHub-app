import { FC } from "react";

import Comment from "src/components/Comment";
import { IComments } from "src/interfaces";

const Comments: FC<{ comments: IComments }> = ({ comments }) => {
  
  const getComments = (comments: IComments) => {
    return comments.map((comment) => (
      <Comment key={comment.id} comment={comment}>
        {getComments(comment.child_comments ?? [])}
      </Comment>
    ));
  };

  return getComments(comments);
};

export default Comments;
