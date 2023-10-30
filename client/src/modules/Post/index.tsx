import { User } from "@nextui-org/react";
import { IPost } from "src/interfaces";

export interface IPostProps {
  post: IPost;
  onClick: () => void;
}

export default function Post(props: IPostProps) {
  return (
    <>
      <div className="border-primery mt-4 w-full rounded-2xl border p-4">
        {/* <div className="mb-2 text-xs font-semibold first-line:text-default-500">
          Nikita Savenko
        </div> */}
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
        {/* <div className="flex flex-col items-center justify-center gap-4 md:gap-8">
          <div className="text-4xl md:text-6xl">{props.post.title}</div>
          <div className="">{props.post.content}</div>
        </div> */}
      </div>
    </>
  );
}
