import Post from "src/modules/Post";
import Search from "src/modules/Search";

import { getPosts } from "src/api/preview";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

function Newspage() {
  return (
    <>
      <div className="container mx-auto">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-2">
            <Search />
            <Link to="/post/create" className="h-auto">
              <Button color="primary" className="h-full">
                +
              </Button>
            </Link>
          </div>
          {getPosts().map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Newspage;
