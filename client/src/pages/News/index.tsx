import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";
import InfiniteScroll from "react-infinite-scroll-component";

import Post from "src/modules/Post";
import Search from "src/components/Search";
import { IPost } from "src/interfaces";
import { getNewPosts } from "src/api/supabase/post";

const News = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMorePosts, setHasMorePosts] = useState<boolean>(true);
  const [numberPage, setNumberPage] = useState<number>(1);
  const postsOnPage = 3;

  const getNextPosts = async () => {
    setIsLoading(true);
    const nextPosts = await getNewPosts(numberPage, postsOnPage);
    if (nextPosts.length === 0) setHasMorePosts(false);
    setPosts([...posts, ...nextPosts]);
    setNumberPage(numberPage + 1);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoading) return;
    if (hasMorePosts && document.body.scrollHeight === window.innerHeight) {
      getNextPosts();
    }
  });

  return (
    <>
      <InfiniteScroll
        dataLength={posts.length}
        next={getNextPosts}
        hasMore={hasMorePosts}
        loader={""}
      >
        <div className="flex w-full flex-col gap-4 p-2">
          {/* <div className="flex flex-row gap-2">
            <Search />
            <Link to="/post/create" className="h-auto">
              <Button color="primary" className="h-full">
                <span className="material-symbols-rounded">add</span>
              </Button>
            </Link>
          </div> */}
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default News;
