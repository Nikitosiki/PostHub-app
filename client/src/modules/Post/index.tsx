import { FC } from "react";
import { User, ScrollShadow } from "@nextui-org/react";
import { IPost } from "src/interfaces";

export interface IPostProps {
  post: IPost;
  onClick: () => void;
}

const Post: FC<IPostProps> = ({ post, onClick }) => {
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
        <ScrollShadow hideScrollBar className="max-h-[300px]">
          {" "}
          {/* overflow-hidden */}
          <div className="mb-2">{post.content}</div>
        </ScrollShadow>
        <div className="text-sm">{post.views} views</div>
      </div>
    </>
  );
};

export default Post;
