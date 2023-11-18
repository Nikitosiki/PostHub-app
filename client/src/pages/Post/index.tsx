import { Link, useLoaderData } from "react-router-dom";
import { Card, CardBody, Select, SelectItem } from "@nextui-org/react";

import { default as PostComponent } from "src/modules/Post";
import { IPost } from "src/interfaces";
import Tag from "src/components/Tag";
import FullReactions from "src/components/FullReactions";
import EditorComment from "src/components/EditorComment";

const Post = () => {
  const post = useLoaderData() as IPost;

  return (
    <>
      <div className="flex w-full flex-col gap-4">
        <PostComponent
          post={post}
          fullContent
          isPressable={false}
          tagsVisible={false}
          reactionVisible={false}
        >
          <CardBody>
            <div className="flex flex-row flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Tag
                  key={tag.id}
                  tag={tag}
                  className="whitespace-nowrap text-xs"
                />
              ))}
            </div>
          </CardBody>

          <CardBody className="items-center">
            <FullReactions reactions={post.reactions} />
          </CardBody>

          {/* ---------- Comment editor ---------- */}
          <CardBody>
            <p className="text-sm">
              Comment as{" "}
              <Link className="text-primary" to={`/author/${post.author.id}`}>
                {post.author.name}
              </Link>
            </p>
            <EditorComment />
          </CardBody>

          {/* ---------- Comments header ---------- */}
          <CardBody>
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
          <CardBody>Comments</CardBody>
          
        </PostComponent>
      </div>
    </>
  );
};

export default Post;
