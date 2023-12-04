import { FC, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  CardBody,
  Chip,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";

import { IComments, ICommentsData, IPost, IUser } from "src/interfaces";
import InfiniteScrollWrapper from "src/components/InfiniteScrollWrapper";
import Comments from "src/components/Comments";

import {
  getCountComments,
  getFirstComments,
} from "src/services/supabase/comments";
import { buildCommentTree } from "src/utils";
import SendCommentModal from "../SendCommentModal/SendCommentModal";

type CardCommentsProps = {
  user: IUser | null;
  fatherContent: IPost;
};

const CardComments: FC<CardCommentsProps> = ({ user, fatherContent }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [sortCommentsBy, setSortComments] = useState<string>("First");

  const [commentsData, setCommentData] = useState<ICommentsData>([]);
  const [comments, setComments] = useState<IComments>([]);
  // let lengthComments = 0;

  const [countComments, setCountComments] = useState<number>(0);
  const [hasMoreComments, setHasMoreComments] = useState<boolean>(true);
  const [numberPage, setNumberPage] = useState<number>(1);
  const commentsOnPage = 3;

  useEffect(() => {
    getCountComments(fatherContent.id).then(setCountComments);
  }, []);

  // useEffect(() => {
  //   if (lengthComments === comments.length) {
  //     if (hasMoreComments)
  //       getNextComments();
  //   } else lengthComments = comments.length;
  // }, [numberPage]);

  const getNextComments = async () => {
    const nextDataComments = await getFirstComments(
      fatherContent.id,
      numberPage,
      commentsOnPage,
      sortCommentsBy !== "First",
    );
    if (nextDataComments.length === 0) setHasMoreComments(false);
    setCommentData([...commentsData, ...nextDataComments]);
    buildCommentTree(commentsData).then(setComments);
    setNumberPage(numberPage + 1);
  };

  return (
    <>
      {/* ---------- Comments header ---------- */}
      <CardBody className="pb-0">
        <div className="flex w-full flex-row justify-between">
          <h6 className="my-auto">{`${countComments} comments`}</h6>
          <Select
            size="sm"
            className="max-w-[12rem]"
            selectedKeys={[sortCommentsBy]}
            // disabledKeys={["First", "Recent"]}
            disallowEmptySelection
            onChange={(select) => {
              setSortComments(select.target.value);
              setComments([]);
              setCommentData([]);
              setHasMoreComments(true);
              setNumberPage(1);
              getNextComments();
            }}
            startContent={
              <span className="material-symbols-rounded">sort</span>
            }
            classNames={{
              popoverContent: "bg-background",
              trigger: "bg-transparent shadow-none",
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
        </div>
      </CardBody>

      {/* -------- Create Comment -------- */}
      <CardBody className="pb-0">
        {true && (
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
              post={fatherContent}
              isOpen={isOpen}
              onOpenChange={onOpenChange}
            />
          </div>
        )}
      </CardBody>

      {/* ---------- Comments ---------- */}
      <CardBody className="pt-0">
        <InfiniteScrollWrapper
          dataLength={commentsData.length}
          next={getNextComments}
          hasMore={hasMoreComments}
          loader={""}
        >
          <Comments
            comments={comments}
            user={user}
            fatherContent={fatherContent}
          />
        </InfiniteScrollWrapper>
      </CardBody>

      {hasMoreComments && (
        <CardBody>
          <Button
            size="sm"
            color="primary"
            variant="light"
            className="text-xs"
            onClick={() => getNextComments()}
          >
            load more...
          </Button>
        </CardBody>
      )}
    </>
  );
};

export default CardComments;
