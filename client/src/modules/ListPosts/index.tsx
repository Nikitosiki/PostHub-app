import { FC, useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";

import Post, { PostProps } from "src/modules/Post";
import { IPost } from "src/interfaces";
import { getSortedPosts } from "src/services/supabase/post";
import Loading from "src/components/Loading";

type ListPostProps = {
  sortBy?: "hot" | "new";
  postsProps?: Omit<PostProps, "post">;
};

const ListPosts: FC<ListPostProps> = ({ sortBy = "new", postsProps }) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState<boolean>(true);
  const [numberPage, setNumberPage] = useState<number>(1);
  const postsOnPage = 3;

  const getNextPosts = async () => {
    setLoading(true);
    const nextPosts = await getSortedPosts(numberPage, postsOnPage, sortBy);
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
    <div className="flex flex-col gap-4 ">
      {posts.map((post) => (
        <Post key={post.id} post={post} {...postsProps} />
      ))}
      {(loading || hasMorePosts) && (
        <div ref={sentryRef}>
          <Loading className="mx-auto mt-2" />
        </div>
      )}
    </div>
  );
};

export default ListPosts;
