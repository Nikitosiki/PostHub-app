import { FC } from "react";
import { Button } from "@nextui-org/react";

import Comment from "src/components/Comment";
import { IComments, IPost, IUser } from "src/interfaces";

interface ICommentsProps {
  comments: IComments;
  user?: IUser | null;
  fatherContent: IPost;
}

const Comments: FC<ICommentsProps> = ({
  comments,
  user = null,
  fatherContent,
}) => {
  const getComments = (comments: IComments) => {
    return comments.map((comment) =>
      comment.path.length <= 2 ? (
        <Comment
          key={comment.id}
          comment={comment}
          post={fatherContent}
          user={user}
        >
          {getComments(comment.child_comments ?? [])}
        </Comment>
      ) : (
        <Button
          size="sm"
          color="primary"
          variant="light"
          className="text-xs"
          onClick={() => {}}
        >
          load more...
        </Button>
      ),
    );
  };

  return getComments(comments);
};

export default Comments;
