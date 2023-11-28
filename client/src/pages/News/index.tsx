import Post from "src/modules/Post";
import Search from "src/components/Search";

// import { getPosts } from "src/api/preview";
import { Button } from "@nextui-org/react";
import { Link, useLoaderData } from "react-router-dom";
import { IPosts } from "src/interfaces";

const News = () => {
  const posts = useLoaderData() as IPosts;

  return (
    <>
      <div className="flex w-full flex-col gap-4 p-2">
        <div className="flex flex-row gap-2">
          <Search />
          <Link to="/post/create" className="h-auto">
            <Button color="primary" className="h-full">
              <span className="material-symbols-rounded">add</span>
            </Button>
          </Link>
        </div>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </>
  );
};

export default News;
