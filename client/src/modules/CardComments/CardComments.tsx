import { FC, useEffect, useState } from "react";
import { Avatar, Button, CardBody, useDisclosure } from "@nextui-org/react";

import { IComments, ICommentsData, IPost, IUser } from "src/interfaces";
import Comments from "src/components/Comments";

import {
  getCountComments,
  getFirstComments,
} from "src/services/supabase/comments";
import { buildCommentTree } from "src/utils";
import SendCommentModal from "../SendCommentModal/SendCommentModal";
import Loading from "src/components/Loading";
import useInfiniteScroll from "react-infinite-scroll-hook";
import SelectSort from "src/modules/SelectSort";
import { CommentSortConfig } from "src/modules/SelectSort/configs";
import { useSearchParams } from "react-router-dom";

type CardCommentsProps = {
  user: IUser | null;
  fatherContent: IPost;
};

const sortConfig = CommentSortConfig;

const CardComments: FC<CardCommentsProps> = ({ user, fatherContent }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [searchParams] = useSearchParams();

  const [commentsData, setCommentData] = useState<ICommentsData>([]);
  const [comments, setComments] = useState<IComments>([]);
  // let lengthComments = 0;

  const [countComments, setCountComments] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [hasMoreComments, setHasMoreComments] = useState<boolean>(true);
  const [numberPage, setNumberPage] = useState<number>(1);
  const commentsOnPage = 10;

  useEffect(() => {
    getCountComments(fatherContent.id).then(setCountComments);
  }, []);

  useEffect(() => {
    reloadInfiniteScroll();
  }, [searchParams]);

  const getNextComments = async () => {
    setLoading(true);
    const nextDataComments = await getFirstComments(
      fatherContent.id,
      numberPage,
      commentsOnPage,
      (searchParams.get(sortConfig.searchParamName) ??
        sortConfig.defaultKey) !== sortConfig.items[0].key,
    );
    setNumberPage(numberPage + 1);
    setHasMoreComments(nextDataComments.length !== 0);
    setCommentData(commentsData.concat(nextDataComments));
    buildCommentTree(commentsData).then(setComments);
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
      {/* ---------- Comments header ---------- */}
      <CardBody className="pb-0">
        <div className="flex w-full flex-row justify-between">
          <h6 className="my-auto">{`${countComments} comments`}</h6>
          <SelectSort
            sortConfig={sortConfig}
            className="max-w-[10rem]"
          />
        </div>
      </CardBody>

      {/* -------- Create Comment -------- */}
      {user && (
        <CardBody className="pb-0">
          <div className="mb-2 flex items-center">
            <Avatar
              size="sm"
              name={user?.name}
              src={user?.image_url ?? undefined}
            />
            <Button
              size="sm"
              color="primary"
              variant="light"
              className="ml-2 mr-auto text-sm"
              startContent={
                <span className="material-symbols-rounded">stylus_note</span>
              }
              onClick={() => {
                onOpen();
              }}
            >
              Leave a comment
            </Button>
            <SendCommentModal
              user={user}
              postId={fatherContent.id}
              isOpen={isOpen}
              onOpenChange={onOpenChange}
            />
          </div>
        </CardBody>
      )}

      {/* ---------- Comments ---------- */}
      <CardBody className="pt-0">
        <Comments comments={comments} user={user} postId={fatherContent.id} />
        {(loading || hasMoreComments) && (
          <div ref={sentryRef}>
            <Loading className="mx-auto mt-2" />
          </div>
        )}
      </CardBody>
    </>
  );
};

export default CardComments;
