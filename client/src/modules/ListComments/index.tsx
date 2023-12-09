import { FC, useEffect, useState } from "react";
import { ICommentData, IComments, ICommentsData } from "src/interfaces";
import Comments from "src/components/Comments";

import {
  getCommentById,
  getFirstChildrensComment,
  getFirstComments,
} from "src/services/supabase/comments";
import { buildCommentTree } from "src/utils";
import Loading from "src/components/Loading";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { CommentSortConfig } from "src/modules/SelectSort/configs";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "src/contexts";

type ListCommentsProps = {
  postId: string;
  commentId?: number;
};

const sortConfig = CommentSortConfig;

const ListComments: FC<ListCommentsProps> = ({ postId, commentId }) => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [parentComment, setParentComment] = useState<ICommentData | null>(null);

  const [commentsData, setCommentData] = useState<ICommentsData>([]);
  const [comments, setComments] = useState<IComments>([]);
  // let lengthComments = 0;

  const [loading, setLoading] = useState(false);
  const [hasMoreComments, setHasMoreComments] = useState<boolean>(true);
  const [numberPage, setNumberPage] = useState<number>(1);
  const commentsOnPage = 10;

  useEffect(() => {
    reloadInfiniteScroll();
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      setParentComment(await getCommentById(Number(commentId)));
    };

    commentId && fetchData();
    reloadInfiniteScroll();
  }, [commentId]);

  const getNextComments = async () => {
    setLoading(true);
    const nextDataComments = commentId
      ? await getFirstChildrensComment(
          commentId,
          numberPage,
          commentsOnPage,
          (searchParams.get(sortConfig.searchParamName) ??
            sortConfig.defaultKey) !== sortConfig.items[0].key,
        )
      : await getFirstComments(
          postId,
          numberPage,
          commentsOnPage,
          (searchParams.get(sortConfig.searchParamName) ??
            sortConfig.defaultKey) !== sortConfig.items[0].key,
        );
        
    setNumberPage(numberPage + 1);
    setHasMoreComments(nextDataComments.length !== 0);
    setCommentData(commentsData.concat(nextDataComments));
    buildCommentTree(
      commentsData,
      parentComment?.parent_comment_id ?? null,
    ).then(setComments);
    setLoading(false);
  };

  const reloadInfiniteScroll = async () => {
    setLoading(true);
    comments.length = 0;
    commentsData.length = 0;
    setHasMoreComments(true);
    setNumberPage(1);
    setLoading(false);
  };

  const [sentryRef] = useInfiniteScroll({
    loading: loading,
    hasNextPage: hasMoreComments,
    onLoadMore: getNextComments,
  });

  return (
    <>
      <Comments
        comments={comments}
        user={user}
        postId={postId}
        countParents={
          parentComment?.path.length ? parentComment?.path.length - 1 : 0
        }
      />
      {(loading || hasMoreComments) && (
        <div ref={sentryRef}>
          <Loading className="mx-auto mt-2" />
        </div>
      )}
    </>
  );
};

export default ListComments;
