import { Link, useLoaderData } from "react-router-dom";
import { CardBody } from "@nextui-org/react";

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

          <CardBody>
            <p className="text-sm">
              Comment as{" "}
              <Link className="text-primary" to={`/author/${post.author.id}`}>
                {post.author.name}
              </Link>
            </p>
            <EditorComment />
          </CardBody>

          <CardBody> Comments </CardBody>
        </PostComponent>
      </div>
    </>
  );
};

export default Post;
