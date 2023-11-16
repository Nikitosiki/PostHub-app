import Post from "src/modules/Post";
import Search from "src/components/Search";

import { getPosts } from "src/api/preview";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

const News = () => {
  return (
    <>
      <div className="flex w-full flex-col gap-4">
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
    </>
  );
};

export default News;
