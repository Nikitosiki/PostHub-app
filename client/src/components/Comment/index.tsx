import { FC, ReactNode, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Button, useDisclosure } from "@nextui-org/react";

import { timeElapsedString, nullToUndefined } from "src/utils";
import { NavigateAuthorPage, NavigatePostCommentsPage } from "src/paths";
import { IComment, IUser } from "src/interfaces";
import InnerHTML from "../InnerHTML";
import SendCommentModal from "src/modules/SendCommentModal/SendCommentModal";
import Reactions from "src/modules/Reactions";

interface ICommentProps {
  comment: IComment;
  postId: string;
  user?: IUser | null;
  children?: ReactNode;
}

const Comment: FC<ICommentProps> = ({ comment, postId, user, children }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [typeAction, setTypeAction] = useState<"new" | "edit">("new");
  const navigate = useNavigate();
  const [isVisibleContent, setVisibleContent] = useState<boolean>(true);

  const controls = (
    <div className="inline-flex gap-2 text-xs text-default-500">
      <Reactions
        user={user ?? null}
        dependence={comment}
        variant="comment"
        children={
          <>
            {user && (
              <>
                <Button
                  size="sm"
                  variant="light"
                  className="h-6 min-w-0 gap-2 px-2 text-sm text-default-500"
                  onClick={() => {
                    setTypeAction("new");
                    onOpen();
                  }}
                  startContent={
                    <span className="material-symbols-rounded text-lg">
                      sms
                    </span>
                  }
                >
                  Reply
                </Button>
                {user?.id === comment.author.id && (
                  <Button
                    size="sm"
                    variant="light"
                    className="h-6 min-w-0 gap-2 px-2 text-sm text-default-500"
                    onClick={() => {
                      setTypeAction("edit");
                      onOpen();
                    }}
                    startContent={
                      <span className="material-symbols-rounded text-lg">
                        ink_pen
                      </span>
                    }
                  >
                    Edit
                  </Button>
                )}
                <SendCommentModal
                  user={user}
                  action={
                    typeAction === "new"
                      ? { postId: postId, responseToComment: comment }
                      : { editCommentId: comment.id, content: comment.content }
                  }
                  isOpen={isOpen}
                  onOpenChange={onOpenChange}
                />
              </>
            )}
            <Button
              size="sm"
              variant="light"
              className="h-6 min-w-0 gap-1.5 px-2 text-sm text-default-500"
              onClick={() =>
                navigate(NavigatePostCommentsPage(postId, comment.id))
              }
              startContent={
                <span className="material-symbols-rounded">expand_content</span>
              }
            >
              Open
            </Button>
          </>
        }
      />
    </div>
  );

  return (
    <>
      <div className="mt-2 flex flex-row gap-2">
        {!isVisibleContent && (
          <span
            className="material-symbols-rounded mt-1 cursor-pointer text-base text-primary"
            onClick={() => setVisibleContent(true)}
          >
            open_in_full
          </span>
        )}
        <div className="flex w-full flex-row gap-2">
          <div className="flex flex-col">
            <Link to={NavigateAuthorPage(comment.author.id)}>
              <Avatar
                size="sm"
                name={comment.author.name}
                src={nullToUndefined(comment.author.image_url)}
                imgProps={{referrerPolicy: "no-referrer"}}
              />
            </Link>
            <div
              className={`ml-1 mt-2 h-full w-[18px] cursor-pointer
             border-l-[11px] border-r-[5px] border-background
             bg-background-200 hover:bg-background-400 hover:dark:bg-background-800`}
              onClick={() => setVisibleContent(!isVisibleContent)}
            />
          </div>
          <div className="w-full">
            <div className="my-2 text-sm">
              <Link to={NavigateAuthorPage(comment.author.id)}>
                <span className="text-default-600">{comment.author.name}</span>
              </Link>
              <span className="m-1 text-default-400">𐄁</span>
              <span className="text-default-400">
                {timeElapsedString(comment.created_at)}
              </span>
            </div>

            {isVisibleContent && (
              <div className="flex w-full flex-col gap-2">
                <InnerHTML content={comment.content} />
                {controls}
                <div className="-ml-3">{children}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
