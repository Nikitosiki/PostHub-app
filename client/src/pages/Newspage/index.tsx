import Post from "src/modules/Post";
import Search from "src/modules/Search";

import { getPost } from "src/api/preview";

function Newspage() {
  return (
    <>
      <div className="container mx-auto p-2">
        <div className="flex flex-col gap-6">
          <Search />
          {getPost().map((post) => (
            <Post post={post} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Newspage;
