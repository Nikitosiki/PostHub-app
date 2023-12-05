import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Select,
  SelectItem,
} from "@nextui-org/react";

import {
  getCommentById,
  getFirstChildrensComment,
} from "src/services/supabase/comments";
import Comments from "src/components/Comments";
import { buildCommentTree } from "src/utils";
import { ICommentData, IComments, ICommentsData } from "src/interfaces";
import { useAuth } from "src/contexts";
import useInfiniteScroll from "react-infinite-scroll-hook";
import Loading from "src/components/Loading";

const PostComments = () => {
  // const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [sortCommentsBy, setSortComments] = useState<string>("First");

  const [commentsData, setCommentData] = useState<ICommentsData>([]);
  const [comments, setComments] = useState<IComments>([]);

  const [loading, setLoading] = useState(false);
  const [hasMoreComments, setHasMoreComments] = useState<boolean>(true);
  const [numberPage, setNumberPage] = useState<number>(1);
  const commentsOnPage = 10;

  const { user } = useAuth();
  const params = useParams();

  const [parentComment, setParentComment] = useState<ICommentData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCommentById(params.id ?? "");
      setParentComment(result);
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
      sortCommentsBy !== "First",
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
      <div className="sm:p-2">
        <Card
          className="w-full rounded-t-none border-none bg-background drop-shadow-lg hover:drop-shadow-xl sm:rounded-t-large sm:p-1"
          shadow="none"
        >
          <CardHeader className="flex flex-row justify-between">
            <h1 className="w-full text-left text-lg">Comments</h1>
            <Select
              size="sm"
              className="max-w-[12rem]"
              selectedKeys={[sortCommentsBy]}
              // disabledKeys={["First", "Recent"]}
              disallowEmptySelection
              onChange={(select) => {
                setSortComments(select.target.value);
                reloadInfiniteScroll();
              }}
              startContent={
                <span className="material-symbols-rounded">sort</span>
              }
              classNames={{
                popoverContent: "bg-background",
                trigger: "bg-transparent shadow-none py-0 min-h-10 h-8",
                value: "pl-1",
              }}
            >
              <SelectItem key={"First"}>First</SelectItem>
              <SelectItem
                key={"Recent"}
                endContent={
                  <Chip className="h-4 bg-primary-100 p-0 text-xs text-primary">
                    Beta
                  </Chip>
                }
              >
                Recent
              </SelectItem>
            </Select>
          </CardHeader>

          <CardBody>
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
