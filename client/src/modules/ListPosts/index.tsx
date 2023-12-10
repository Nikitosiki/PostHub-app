import { FC, useEffect, useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";

import Post, { PostProps } from "src/modules/Post";
import { IPost, ITag } from "src/interfaces";
import {
  getSortedPosts,
  getSortedPostsByTag,
} from "src/services/supabase/post";
import Loading from "src/components/Loading";
import { useSearchParams } from "react-router-dom";
import { PostSortConfig } from "../SelectSort/configs";

type ListPostProps = {
  postsProps?: Omit<PostProps, "post">;
  parentContent?: ITag;
  sortBy?: "hot" | "new";
};

const sortConfig = PostSortConfig;

const ListPosts: FC<ListPostProps> = ({ postsProps, parentContent, sortBy }) => {
  const [searchParams] = useSearchParams();

  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState<boolean>(true);
  const [numberPage, setNumberPage] = useState<number>(1);
  const postsOnPage = 3;

  useEffect(() => {
    reloadInfiniteScroll();
  }, [searchParams]);

  const getNextPosts = async () => {
    setLoading(true);
    const nextPosts = parentContent
      ? await getSortedPostsByTag(
          numberPage,
          postsOnPage,
          sortBy ?? searchParams.get(sortConfig.searchParamName) ?? sortConfig.defaultKey,
          parentContent.id,
        )
      : await getSortedPosts(
          numberPage,
          postsOnPage,
          sortBy ?? searchParams.get(sortConfig.searchParamName) ?? sortConfig.defaultKey,
        );
    setHasMorePosts(nextPosts.length !== 0);
    setPosts(posts.concat(nextPosts));
    setNumberPage(numberPage + 1);
    setLoading(false);
  };

  const reloadInfiniteScroll = async () => {
    setLoading(true);
    posts.length = 0;
    setHasMorePosts(true);
    setNumberPage(1);
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
