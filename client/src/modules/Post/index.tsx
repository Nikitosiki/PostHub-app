import { FC, useRef, useEffect } from "react";
import { User } from "@nextui-org/react";
import { IPost } from "src/interfaces";

export interface IPostProps {
  post: IPost;
  onClick: () => void;
}

const Post: FC<IPostProps> = ({ post, onClick }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

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
  }, [post.content]);

  return (
    <>
      {/* border border-background-200 */}
      <div
        className="mt-4 w-full cursor-pointer rounded-2xl bg-background p-4 drop-shadow-lg hover:drop-shadow-xl"
        onClick={onClick}
      >
        <div className="flex flex-wrap items-center gap-6">
          <User
            name="Nikita Savenko"
            avatarProps={{
              src: "https://i.pravatar.cc/150?u=a04258114e29026703d",
              size: "sm",
            }}
            className="mb-4"
          />
          <div className="mb-2 items-center text-xl font-bold text-primary-500">
            {post.title}
          </div>
        </div>
        <div
          ref={contentRef}
          className="relative max-h-[330px] overflow-hidden"
        >
          <div className="mb-2 whitespace-pre-wrap">{post.content}</div>
          <div
            ref={shadowRef}
            className="absolute inset-x-0 -bottom-[1px] h-8 bg-gradient-to-b from-transparent to-background to-95%"
          ></div>
        </div>
        <div className="text-sm">{post.views} views</div>
      </div>
    </>
  );
};

export default Post;
