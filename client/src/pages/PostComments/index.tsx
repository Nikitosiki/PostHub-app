import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react";

import {
  getCommentById,
  getFirstChildrensComment,
} from "src/services/supabase/comments";
import Comments from "src/components/Comments";
import { buildCommentTree } from "src/utils";
import { ICommentData, IComments, ICommentsData, IPost } from "src/interfaces";
import { useAuth } from "src/contexts";
import useInfiniteScroll from "react-infinite-scroll-hook";
import Loading from "src/components/Loading";
import { NavigatePostPage } from "src/paths";
import Post from "src/modules/Post";
import { getPostById } from "src/services/supabase/post";
import { CommentSortConfig } from "src/modules/SelectSort/configs";
import SelectSort from "src/modules/SelectSort";

const sortConfig = CommentSortConfig;

const PostComments = () => {
  // const [sortCommentsBy, setSortComments] = useState<string>("First");
  const [commentsData, setCommentData] = useState<ICommentsData>([]);
  const [comments, setComments] = useState<IComments>([]);

  const [loading, setLoading] = useState(false);
  const [hasMoreComments, setHasMoreComments] = useState<boolean>(true);
  const [numberPage, setNumberPage] = useState<number>(1);
  const commentsOnPage = 10;

  const { user } = useAuth();
  const params = useParams();
  const [searchParams] = useSearchParams();

  const [parentComment, setParentComment] = useState<ICommentData | null>(null);
  const [commentPost, setCommentPost] = useState<IPost | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setParentComment(await getCommentById(params.id ?? ""));
      setCommentPost(await getPostById(params.postId ?? ""));
    };

    fetchData();
    reloadInfiniteScroll();
  }, [params]);

  const getNextComments = async () => {
    setLoading(true);
    const nextDataComments = await getFirstChildrensComment(
      Number(params.id),
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
      <div className="flex w-full flex-col sm:gap-4 sm:p-2">
        {commentPost && (
          <Post
            post={commentPost}
            tagsVisible={false}
            reactionVisible={false}
            countViewVisible={false}
            userViewVisible={false}
            contentHeight="short"
            cardClassName="rounded-none sm:rounded-large"
          />
        )}
        <Card
          className="w-full rounded-t-none border-none bg-background drop-shadow-lg hover:drop-shadow-xl sm:rounded-t-large sm:p-1"
          shadow="none"
        >
          <CardHeader className="flex flex-row items-center justify-between">
            {/* <h1 className="w-full text-left text-lg">Comments</h1> */}
            <Link to={NavigatePostPage(params.postId ?? "")}>
              <div className="inline-flex h-full items-center gap-1 text-sm text-primary">
                <span className="material-symbols-rounded">
                  keyboard_backspace
                </span>
                <span className="pt-0.5">Back to post</span>
              </div>
            </Link>
            <SelectSort
              sortConfig={sortConfig}
              className="max-w-[10rem]"
            />
          </CardHeader>

          {/* <CardBody className="pb-0">
            <Link to={NavigatePostPage(params.postId ?? "")}>
              <p className="text-primary">• • •</p>
            </Link>
            <Button
              size="sm"
              color="primary"
              variant="light"
              className="text-xs mr-auto"
              onClick={() => navigate(NavigatePostPage(params.postId ?? ""))}
            >
              View all comments
            </Button>
          </CardBody> */}

          <CardBody className="pt-0">
            <Comments
              comments={comments}
              user={user}
              postId={params.postId ?? ""}
              countParents={
                parentComment?.path.length ? parentComment?.path.length - 1 : 0
              }
            />
            {(loading || hasMoreComments) && (
              <div ref={sentryRef}>
                <Loading className="mx-auto mt-2" />
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default PostComments;
