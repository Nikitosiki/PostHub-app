import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { useMediaQuery } from "react-responsive";

import Comment from "src/components/Comment";
import { IComments, IUser } from "src/interfaces";
import { NavigatePostCommentsPage } from "src/paths";

interface ICommentsProps {
  comments: IComments;
  user?: IUser | null;
  postId: string;
}

const Comments: FC<ICommentsProps> = ({
  comments,
  user = null,
  postId,
}) => {
  const navigate = useNavigate();
  const min896 = useMediaQuery({ query: "(min-width: 896px)" });
  const min848 = useMediaQuery({ query: "(min-width: 848px)" });
  const min768 = useMediaQuery({ query: "(min-width: 768px)" });
  const min672 = useMediaQuery({ query: "(min-width: 672px)" });
  const min576 = useMediaQuery({ query: "(min-width: 576px)" });
  const min512 = useMediaQuery({ query: "(min-width: 512px)" });
  const min448 = useMediaQuery({ query: "(min-width: 448px)" });
  const min384 = useMediaQuery({ query: "(min-width: 384px)" });
  const min320 = useMediaQuery({ query: "(min-width: 320px)" });

  const maxlength = (): number => {
    // 1 comment - 44px
    if (min896) return 24;
    if (min848) return 21;
    if (min768) return 19;
    if (min672) return 16;
    if (min576) return 12;
    if (min512) return 10;
    if (min448) return 8;
    if (min384) return 6;
    if (min320) return 5;
    return 4;
  };

  const getComments = (comments: IComments) => {
    return comments.map((comment) =>
      comment.path.length <= maxlength() ? (
        <Comment
          key={comment.id}
          comment={comment}
          postId={postId}
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
          onClick={() =>
            navigate(NavigatePostCommentsPage(postId, comment.id))
          }
        >
          load more...
        </Button>
      ),
    );
  };

  return getComments(comments);
};

export default Comments;
