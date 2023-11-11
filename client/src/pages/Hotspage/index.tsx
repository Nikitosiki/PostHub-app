import Post from "src/modules/Post";
import Search from "src/modules/Search";

import { getHotPosts } from "src/api/preview";

function Hotspage() {
  return (
    <>
      <div className="container mx-auto">
        <div className="flex flex-col gap-4">
          <Search />
          {getHotPosts().map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Hotspage;
