import { FC, useRef, useEffect } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { Link } from "react-router-dom";

import { IPost } from "src/interfaces";
import { useStateWindowSize } from "src/hooks";
import { getShortFormattedDate } from "src/utils";
import Author from "../Author";

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

  console.log(post.published_at.toString());

  return (
    <>
      {/* border border-background-200 */}
      <Card
        className="border-none bg-background p-1 drop-shadow-lg hover:drop-shadow-xl"
        shadow="none"
        key={post.id}
        isPressable
      >
        <Link to={`/post/${post.id}`}>
          <CardHeader className="gap- flex-col items-start gap-2 pb-2">
            <Author
              author={post.author}
              description={`Posted on ${getShortFormattedDate(
                post.published_at,
              )}`}
            />
            <h2 className="text-left text-xl font-bold text-primary">
              {post.title}
            </h2>
          </CardHeader>
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
          <CardFooter className="pt-0">
            <p className="text-sm">{post.views} views</p>
          </CardFooter>
        </Link>
      </Card>
    </>
  );
};

export default Post;
