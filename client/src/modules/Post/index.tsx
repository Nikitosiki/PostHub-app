import { User } from "@nextui-org/react";
import { IPost } from "src/interfaces";

export interface IPostProps {
  post: IPost;
  onClick: () => void;
}

export default function Post(props: IPostProps) {
  return (
    <>
      <div className="mt-4 w-full rounded-2xl drop-shadow-lg bg-background p-4"> {/* border border-background-200 */}
        <div className="flex flex-wrap items-center gap-6">
          <User
            name="Nikita Savenko"
            avatarProps={{
              src: "https://i.pravatar.cc/150?u=a04258114e29026703d",
            }}
            className="mb-4"
          />
          <div className="mb-2 items-center text-xl font-bold text-primary-500">
            {props.post.title}
          </div>
        </div>
        <div className="mb-2">{props.post.content}</div>
        <div className="text-sm">{props.post.views} views</div>
      </div>
    </>
  );
}
