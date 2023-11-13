import { FC, useRef, useEffect } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  ScrollShadow,
} from "@nextui-org/react";
import { Link } from "react-router-dom";

import { IPost } from "src/interfaces";
import { useStateWindowSize } from "src/hooks";
import { getShortFormattedDate } from "src/utils";
import Author from "src/modules/Author";
import Reactions from "src/modules/Reactions";
import Tag from "src/modules/Tag";

const Post: FC<{ post: IPost }> = ({ post }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const windowSize = useStateWindowSize();

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

  return (
    <>
      <Card
        className="border-none bg-background p-1 drop-shadow-lg hover:drop-shadow-xl"
        shadow="none"
        key={post.id}
        isPressable
      >
        <Link to={`/post/${post.id}`} className="overflow-inherit w-full">
          <CardHeader className="flex-col items-start gap-2 pb-2">
            <div className="flex w-full flex-row justify-between">
              <Author
                author={post.author}
                description={`Posted on ${getShortFormattedDate(
                  post.published_at,
                )}`}
              />
              <div className="flex text-default-500">
                <span className="material-symbols-rounded -mt-[3px] mr-1 text-lg">
                  visibility
                </span>
                <p className="font-sans text-sm">{post.views}</p>
              </div>
            </div>
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
                <Tag
                  key={tag.id}
                  tag={tag}
                  className="whitespace-nowrap text-xs"
                />
              ))}
            </ScrollShadow>
          </CardHeader> */}

          <CardBody className="pt-0">
            <div
              ref={contentRef}
              className="relative max-h-[330px] overflow-hidden"
            >
              <p className="whitespace-pre-wrap">{post.content}</p>
              <div
                ref={shadowRef}
                className="absolute inset-x-0 -bottom-[1px] h-8 bg-gradient-to-b from-transparent to-background to-95%"
              ></div>
            </div>
          </CardBody>

          <CardFooter className="flex flex-row justify-between gap-4 pb-3 pt-1">
            <ScrollShadow
              hideScrollBar
              orientation="horizontal"
              className="flex flex-row gap-2"
            >
              {post.tags.map((tag) => (
                <Tag
                  key={tag.id}
                  tag={tag}
                  className="whitespace-nowrap text-xs"
                />
              ))}
            </ScrollShadow>
            <Reactions reactions={post.reactions} />
          </CardFooter>

          {/* <CardFooter className="flex flex-row gap-2 pt-0">
            {post.reactions
              .filter((reaction) => reaction.count > 0)
              .map((reaction) => (
                <Reaction
                  key={reaction.grade}
                  grade={reaction.grade}
                  count={reaction.count}
                />
              ))}
          </CardFooter> */}
        </Link>
      </Card>
    </>
  );
};

export default Post;
