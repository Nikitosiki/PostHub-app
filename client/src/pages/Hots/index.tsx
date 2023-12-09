import { useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";

import Post from "src/modules/Post";
import { IPost } from "src/interfaces";
import { getSortedPosts } from "src/services/supabase/post";
import Loading from "src/components/Loading";

const Hots = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState<boolean>(true);
  const [numberPage, setNumberPage] = useState<number>(1);
  const postsOnPage = 3;

  const getNextPosts = async () => {
    setLoading(true);
    const nextPosts = await getSortedPosts(numberPage, postsOnPage, "hot");
    setHasMorePosts(nextPosts.length !== 0);
    setPosts(posts.concat(nextPosts));
    setNumberPage(numberPage + 1);
    setLoading(false);
  };

  const [sentryRef] = useInfiniteScroll({
    loading: loading,
    hasNextPage: hasMorePosts,
    onLoadMore: getNextPosts,
  });

  return (
    <>
      <div className="flex w-full flex-col gap-4 p-2">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
        {(loading || hasMorePosts) && (
          <div ref={sentryRef}>
            <Loading className="mx-auto mt-2" />
          </div>
        )}
      </div>
    </>
  );
};

export default Hots;
