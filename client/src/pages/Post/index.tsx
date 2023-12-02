import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import {
  Avatar,
  Button,
  CardBody,
  Select,
  SelectItem,
} from "@nextui-org/react";

import { default as PostComponent } from "src/modules/Post";
import { IPost } from "src/interfaces";
import Tag from "src/components/Tag";
import FullReactions from "src/components/FullReactions";
import EditorComment from "src/components/EditorComment";
import Comments from "src/modules/Comments";
import { NavigateAuthorPage } from "src/paths";

import { incrementViewPost } from "src/services/supabase/post";
import { useAuth } from "src/contexts";

const Post = () => {
  const [isCommentFormVisible, setCommentFormVisibility] = useState(false);
  const post = useLoaderData() as IPost;
  const { fsUserId, user } = useAuth();

  useEffect(() => {
    if (fsUserId || user) incrementViewPost(post.id, user ?? fsUserId ?? "");
  }, []);

  return (
    <>
      <div className="flex w-full flex-col gap-4 sm:p-2">
        <PostComponent
          post={post}
          fullContent
          isPressable={false}
          tagsVisible={false}
          reactionVisible={false}
          cardClassName="rounded-t-none sm:rounded-t-large"
        >
          <CardBody>
            <div className="flex flex-row flex-wrap gap-2">
              {post.tags &&
                post.tags.map((tag) => (
                  <Tag
                    key={tag.id}
                    tag={tag}
                    className="whitespace-nowrap text-xs"
                  />
                ))}
            </div>
          </CardBody>

          <CardBody
            className={`items-center ${post.reactions.length < 1 && "hidden"}`}
          >
            <FullReactions reactions={post.reactions} />
          </CardBody>

          {/* ---------- Comment editor ---------- */}
          {isCommentFormVisible && (
            <CardBody>
              {/* <div className="hidden sm:block"> */}
              <p className="text-sm">
                Comment as{" "}
                <Link
                  className="text-primary"
                  to={NavigateAuthorPage(post.author.id)}
                >
                  {post.author.name} ******
                </Link>
              </p>
              <EditorComment />
              {/* </div> */}
            </CardBody>
          )}

          {/* ---------- Comments header ---------- */}
          <CardBody className="pb-0">
            <div className="flex w-full flex-row justify-between">
              <h6 className="my-auto">{`${5} comments`}</h6>
              <Select
                size="sm"
                className="max-w-[12rem]"
                defaultSelectedKeys={["Recent"]}
                startContent={
                  <span className="material-symbols-rounded">sort</span>
                }
                classNames={{
                  trigger: "bg-transparent shadow-none",
                  value: "pl-1",
                  // value: "text-right pr-2",
                }}
              >
                <SelectItem key={"Interesting"}>Interesting first</SelectItem>
                <SelectItem key={"Recent"}>Recent first</SelectItem>
              </Select>
            </div>
          </CardBody>

          {/* ---------- Comments ---------- */}
          <CardBody>
            {/* -------- Create Comment -------- */}
            {!isCommentFormVisible && (
              <div className="mb-4 flex items-center">
                <Avatar size="sm" name={"Your"} />
                <Button
                  size="sm"
                  color="primary"
                  variant="light"
                  className="ml-2 mr-auto"
                  startContent={
                    <span className="material-symbols-rounded">
                      stylus_note
                    </span>
                  }
                  onClick={() => {
                    setCommentFormVisibility(true);
                  }}
                >
                  Leave a comment
                </Button>
              </div>
            )}
            <Comments comments={[]} />
          </CardBody>
        </PostComponent>
      </div>
    </>
  );
};

export default Post;
