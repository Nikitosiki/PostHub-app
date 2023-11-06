import { FC, useRef, useEffect } from "react";
import {
  Card,
  CardBody,
  User,
} from "@nextui-org/react";
import { IPost } from "src/interfaces";
import { useStateWindowSize } from "src/hooks";

export interface IPostProps {
  post: IPost;
  onClick: () => void;
}

const Post: FC<IPostProps> = ({ post, onClick }) => {
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
      {/* border border-background-200 */}
      <Card
        className="border-none bg-background p-1 drop-shadow-lg hover:drop-shadow-xl"
        shadow="none"
        key={post.id}
        isPressable
        onPress={onClick}
      >
        <CardBody>
          <div className="flex flex-wrap items-center gap-6">
            <User
              name="Nikita Savenko"
              avatarProps={{
                src: "https://i.pravatar.cc/150?u=a04258114e29026703d",
                size: "sm",
              }}
              className="mb-4"
            />
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
      </Card>
    </>
  );
};

export default Post;
