import { FC, useRef, useEffect } from "react";
import { Card, CardBody, User } from "@nextui-org/react";
import { Link } from "react-router-dom";

import { IPost } from "src/interfaces";
import { useStateWindowSize } from "src/hooks";
import { getShortFormattedDate, nullToUndefined } from "src/utils";

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
          <CardBody>
            <div className="flex flex-wrap items-center gap-6">
              <Link to={`/author/${post.author.id}`}>
                <User
                  name={post.author.name}
                  description={`Posted on ${getShortFormattedDate(
                    post.published_at,
                  )}`}
                  avatarProps={{
                    src: nullToUndefined(post.author.image_url),
                    classNames: {
                      base: "",
                    },
                    size: "sm",
                  }}
                  className="mb-4"
                />
              </Link>
              <p className="mb-2 items-center text-xl font-bold text-primary-500">
                {post.title}
              </p>
            </div>
            <div
              ref={contentRef}
              className="relative max-h-[330px] overflow-hidden"
            >
              <p className="mb-2 whitespace-pre-wrap">{post.content}</p>
              <div
                ref={shadowRef}
                className="absolute inset-x-0 -bottom-[1px] h-8 bg-gradient-to-b from-transparent to-background to-95%"
              ></div>
            </div>
            <p className="text-sm">{post.views} views</p>
          </CardBody>
        </Link>
      </Card>
    </>
  );
};

export default Post;
