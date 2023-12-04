import { FC, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  CardBody,
  Select,
  SelectItem,
} from "@nextui-org/react";

import { IComments, ICommentsData, IPost, IUser } from "src/interfaces";
import InfiniteScrollWrapper from "src/components/InfiniteScrollWrapper";
import Comments from "src/components/Comments";

import {
  getCountComments,
  getFirstComments,
} from "src/services/supabase/comments";
import { buildCommentTree } from "src/utils";

type CardCommentsProps = {
  user: IUser | null;
  fatherContent: IPost;
};

const CardComments: FC<CardCommentsProps> = ({ user, fatherContent }) => {
  const [sortCommentsBy, setSortComments] = useState<string>("First");

  const [commentsData, setCommentData] = useState<ICommentsData>([]);
  const [comments, setComments] = useState<IComments>([]);

  const [countComments, setCountComments] = useState<number>(0);
  const [hasMoreComments, setHasMoreComments] = useState<boolean>(true);
  const [numberPage, setNumberPage] = useState<number>(1);
  const commentsOnPage = 3;

  useEffect(() => {
    getCountComments(fatherContent.id).then(setCountComments);
  }, []);

  const getNextComments = async () => {
    const nextDataComments = await getFirstComments(
      fatherContent.id,
      numberPage,
      commentsOnPage,
      sortCommentsBy === "Recent",
    );
    if (nextDataComments.length === 0) setHasMoreComments(false);
    setCommentData([...commentsData, ...nextDataComments]);

    const nextComments = await buildCommentTree(nextDataComments);
    setComments([...comments, ...nextComments]);
    setNumberPage(numberPage + 1);

    console.log("comments", comments);
    console.log("commentsData", commentsData);
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
            onChange={(select) => {
              setSortComments(select.target.value);
              setCommentData([]);
              setComments([]);
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
            <SelectItem key={"Recent"}>Recent</SelectItem>
          </Select>
        </div>
      </CardBody>

      {/* -------- Create Comment -------- */}
      <CardBody className="pb-0">
        {user && (
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
                // setCommentFormVisibility(true);
              }}
            >
              Leave a comment
            </Button>
          </div>
        )}
      </CardBody>

      {/* ---------- Comments ---------- */}
      <CardBody className="pt-0">
        <InfiniteScrollWrapper
          dataLength={comments.length}
          next={getNextComments}
          hasMore={hasMoreComments}
          loader={""}
        >
          <Comments comments={comments} user={user} />
        </InfiniteScrollWrapper>
      </CardBody>
    </>
  );
};

export default CardComments;
