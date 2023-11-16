import Post from "src/modules/Post";
import Search from "src/components/Search";

import { getHotPosts } from "src/api/preview";

const Hots = () => {
  return (
    <>
      <div className="flex w-full flex-col gap-4">
        <Search />
        {getHotPosts().map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </>
  );
};

export default Hots;
