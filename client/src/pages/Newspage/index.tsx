import Post from "src/modules/Post";
import Search from "src/modules/Search";

import { getPosts } from "src/api/preview";

function Newspage() {
  return (
    <>
      <div className="container mx-auto">
        <div className="flex flex-col gap-4">
          <Search />
          {getPosts().map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Newspage;
