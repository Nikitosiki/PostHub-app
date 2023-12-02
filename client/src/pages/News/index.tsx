import { useState } from "react";

import Post from "src/modules/Post";
import { IPost } from "src/interfaces";
import { getNewPosts } from "src/services/supabase/post";
import InfiniteScrollWrapper from "src/components/InfiniteScrollWrapper";

const News = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [hasMorePosts, setHasMorePosts] = useState<boolean>(true);
  const [numberPage, setNumberPage] = useState<number>(1);
  const postsOnPage = 3;

  const getNextPosts = async () => {
    const nextPosts = await getNewPosts(numberPage, postsOnPage);
    if (nextPosts.length === 0) setHasMorePosts(false);
    setPosts([...posts, ...nextPosts]);
    setNumberPage(numberPage + 1);
  };

  return (
    <>
      <InfiniteScrollWrapper
        dataLength={posts.length}
        next={getNextPosts}
        hasMore={hasMorePosts}
        loader={""}
      >
        <div className="flex w-full flex-col gap-4 p-2">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </InfiniteScrollWrapper>
    </>
  );
};

export default News;
