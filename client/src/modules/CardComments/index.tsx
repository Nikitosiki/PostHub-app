import { FC, useEffect, useState } from "react";
import { Avatar, Button, CardBody, useDisclosure } from "@nextui-org/react";

import { IPost } from "src/interfaces";
import { getCountComments } from "src/services/supabase/comments";
import SendCommentModal from "../SendCommentModal/SendCommentModal";
import SelectSort from "src/modules/SelectSort";
import { CommentSortConfig } from "src/modules/SelectSort/configs";
import ListComments from "../ListComments";
import { useAuth } from "src/contexts";

type CardCommentsProps = {
  fatherContent: IPost;
};

const sortConfig = CommentSortConfig;

const CardComments: FC<CardCommentsProps> = ({ fatherContent }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { user } = useAuth();
  const [countComments, setCountComments] = useState<number>(0);

  useEffect(() => {
    getCountComments(fatherContent.id).then(setCountComments);
  }, []);

  return (
    <>
      {/* ---------- Comments header ---------- */}
      <CardBody className="pb-0">
        <div className="flex w-full flex-row justify-between">
          <h6 className="my-auto">{`${countComments} comments`}</h6>
          {countComments > 0 && (
            <SelectSort sortConfig={sortConfig} className="max-w-[10rem]" />
          )}
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
              imgProps={{referrerPolicy: "no-referrer"}}
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
              action={{ postId: fatherContent.id }}
              isOpen={isOpen}
              onOpenChange={onOpenChange}
            />
          </div>
        </CardBody>
      )}

      {/* ---------- Comments ---------- */}
      <CardBody className="pt-0">
        <ListComments postId={fatherContent.id} />
      </CardBody>
    </>
  );
};

export default CardComments;
