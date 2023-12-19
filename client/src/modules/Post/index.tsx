import { FC, ReactNode, useRef, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  ScrollShadow,
} from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";

import { IPost } from "src/interfaces";
import { useStateWindowSize } from "src/hooks";
import { timeElapsedString } from "src/utils";
import Author from "src/components/Author";
import Reactions from "src/components/Reactions";
import Tag from "src/components/Tag";
import InnerHTML from "src/components/InnerHTML";
import { NavigateEditPostPage, NavigatePostPage } from "src/paths";
import { getCountComments } from "src/services/supabase/comments";
import { useAuth } from "src/contexts";

interface IActiveParts {
  fullContent?: boolean;
  tagsVisible?: boolean;
  reactionVisible?: boolean;
  countViewVisible?: boolean;
  countCommentVisible?: boolean;
  userViewVisible?: boolean;
  editButtonVisible?: boolean;
}

interface IMainProps {
  post: IPost;
  children?: ReactNode;
  cardClassName?: string;
  isPressable?: boolean;
  contentHeight?: "hidden" | "short" | "normal";
}

export type PostProps = IMainProps & IActiveParts;

const maxHeightContent = (value: IMainProps["contentHeight"]) => {
  return value === "normal"
    ? "max-h-[330px]"
    : value === "short"
    ? "max-h-[50px]"
    : "hidden";
};

const Post: FC<IMainProps & IActiveParts> = ({
  post,
  children,
  cardClassName,
  isPressable = true,
  fullContent = false,
  tagsVisible = true,
  reactionVisible = true,
  countViewVisible = true,
  countCommentVisible = true,
  userViewVisible = true,
  editButtonVisible = false,
  contentHeight = "normal",
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const windowSize = useStateWindowSize();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [countComments, setCountComments] = useState<number>(0);

  useEffect(() => {
    const contentElement = contentRef.current;
    const shadowElement = shadowRef.current;

    if (contentElement && shadowElement) {
      const maxHeightContent = parseInt(
        window.getComputedStyle(contentElement).getPropertyValue("max-height"),
        10,
      );

      shadowElement.style.display =
        contentElement.offsetHeight < maxHeightContent ? "none" : "block";
    }
  }, [post.content, windowSize]);

  useEffect(() => {
    getCountComments(post.id).then(setCountComments);
  }, []);

  const thisContent = (
    <>
      <CardHeader className="flex-col items-start gap-2 pb-2">
        {(userViewVisible || countViewVisible || countCommentVisible) && (
          <div className="flex w-full flex-row justify-between">
            {userViewVisible && (
              <div className="overflow-auto px-2">
                <Author
                  className="text-left"
                  author={post.author}
                  description={`Posted on ${timeElapsedString(
                    post.published_at,
                  )}`}
                />
              </div>
            )}
            <div className="flex shrink-0 gap-2">
              {editButtonVisible && user?.id === post.author.id && (
                <Button
                  // size="sm"
                  variant="flat"
                  // className="h-6 min-w-0 gap-1 px-2 text-default-500"
                  className="h-8 w-12 min-w-0 px-2 text-default-500"
                  onClick={() => navigate(NavigateEditPostPage(post.id))}
                >
                  Edit
                </Button>
              )}
              {countCommentVisible && countComments > 0 && (
                <div className="flex text-default-500">
                  <span className="material-symbols-rounded -mt-[3px] mr-1 text-lg">
                    chat_bubble
                  </span>
                  <p className="font-sans text-sm">{countComments}</p>
                </div>
              )}
              {countViewVisible && (
                <div className="flex text-default-500">
                  <span className="material-symbols-rounded -mt-[3px] mr-1 text-lg">
                    visibility
                  </span>
                  <p className="font-sans text-sm">{post.views}</p>
                </div>
              )}
            </div>
          </div>
        )}
        <h2 className="text-left text-xl font-bold text-primary">
          # {post.title}
        </h2>
      </CardHeader>

      {/* <CardHeader className="pb-3 pt-0">
        <ScrollShadow
          hideScrollBar
          orientation="horizontal"
          className="flex flex-row gap-2"
        >
          {post.tags.map((tag) => (
            <Tag key={tag.id} tag={tag} className="whitespace-nowrap text-xs" />
          ))}
        </ScrollShadow>
      </CardHeader> */}

      {/* ---------- Content part ---------- */}

      <CardBody className="pt-0">
        {fullContent ? (
          // <p className="whitespace-pre-wrap">
          <InnerHTML content={post.content} />
        ) : (
          // </p>
          <div
            ref={contentRef}
            className={`relative overflow-hidden ${maxHeightContent(
              contentHeight,
            )}`}
          >
            {/* <p className="whitespace-pre-wrap"> */}
            <InnerHTML content={post.content} />
            {/* </p> */}
            <div
              ref={shadowRef}
              className="absolute inset-x-0 -bottom-[1px] h-8 bg-gradient-to-b from-transparent to-background to-95%"
            ></div>
          </div>
        )}
      </CardBody>

      {/* ---------- Tags and reactions ---------- */}

      {(tagsVisible || reactionVisible) && (
        <CardFooter className="flex flex-row justify-between gap-4 pb-3 pt-1">
          <ScrollShadow
            hideScrollBar
            orientation="horizontal"
            className="flex flex-row gap-2"
          >
            {tagsVisible &&
              post.tags.map((tag) => (
                <Tag
                  key={tag.id}
                  tag={tag}
                  className="whitespace-nowrap text-xs"
                />
              ))}
          </ScrollShadow>
          {reactionVisible && <Reactions reactions={post.reactions} />}
        </CardFooter>
      )}

      {children}

      {/* <CardFooter className="flex flex-row gap-2 pt-0">
        {post.reactions
          .filter((reaction) => reaction.count > 0)
          .map((reaction) => (
            <Reaction
              key={reaction.emoji}
              emoji={reaction.emoji}
              count={reaction.count}
            />
          ))}
      </CardFooter> */}
    </>
  );

  return (
    <>
      <Card
        className={`w-full border-none bg-background p-1 drop-shadow-lg hover:drop-shadow-xl ${
          cardClassName ?? ""
        }`}
        shadow="none"
        key={post.id}
        isPressable={isPressable}
      >
        {isPressable ? (
          <Link
            to={NavigatePostPage(post.id)}
            className="overflow-inherit w-full"
          >
            {thisContent}
          </Link>
        ) : (
          thisContent
        )}
      </Card>
    </>
  );
};

export default Post;
