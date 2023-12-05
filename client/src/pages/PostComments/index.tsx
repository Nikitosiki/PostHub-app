import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Comments from "src/components/Comments";
import InfiniteScrollWrapper from "src/components/InfiniteScrollWrapper";

import {
  getCommentById,
  getFirstChildrensComment,
} from "src/services/supabase/comments";
import { buildCommentTree } from "src/utils";
import { IComments, ICommentsData } from "src/interfaces";
import { useAuth } from "src/contexts";

const PostComments = () => {
  // const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [commentsData, setCommentData] = useState<ICommentsData>([]);
  const [comments, setComments] = useState<IComments>([]);

  const [hasMoreComments, setHasMoreComments] = useState<boolean>(true);
  const [numberPage, setNumberPage] = useState<number>(1);
  const commentsOnPage = 3;

  const { user } = useAuth();
  const params = useParams();

  useEffect(() => {
    setCommentData([]);
    setComments([]);
    setHasMoreComments(true);
    setNumberPage(1);
    getNextComments();
  }, [params])
  


  const getNextComments = async () => {
    const nextDataComments = await getFirstChildrensComment(
      Number(params.id),
      numberPage,
      commentsOnPage,
    );

    if (nextDataComments.length === 0) setHasMoreComments(false);
    setCommentData([...commentsData, ...nextDataComments]);
    const parentCommentId = (await getCommentById(params.id ?? ""))?.parent_comment_id;
    buildCommentTree(commentsData, parentCommentId).then(
      setComments,
    );
    setNumberPage(numberPage + 1);
  };

  return (
    <>
      <div className="sm:p-2">
        <Card
          className="w-full rounded-t-none border-none bg-background drop-shadow-lg hover:drop-shadow-xl sm:rounded-t-large sm:p-1"
          shadow="none"
        >
          <CardHeader className="flex flex-col">
            <h1 className="w-full text-left text-lg">Comments</h1>
          </CardHeader>

          <CardBody>
            <InfiniteScrollWrapper
              dataLength={commentsData.length}
              next={getNextComments}
              hasMore={hasMoreComments}
              loader={""}
            >
              <Comments
                comments={comments}
                user={user}
                postId={params.postId ?? ""}
              />
            </InfiniteScrollWrapper>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default PostComments;
