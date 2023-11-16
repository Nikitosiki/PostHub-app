import { useLoaderData } from "react-router-dom";

import { default as PostComponent } from "src/modules/Post";
import { IPost } from "src/interfaces";

const Post = () => {
  const data = useLoaderData() as IPost;

  return (
    <>
      <div className="flex w-full flex-col gap-4">
        <PostComponent post={data} />
      </div>
    </>
  );
};

export default Post;
