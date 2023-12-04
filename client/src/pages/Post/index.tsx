import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import {
  CardBody,
} from "@nextui-org/react";

import { default as PostComponent } from "src/modules/Post";
import { IPost } from "src/interfaces";
import Tag from "src/components/Tag";
import FullReactions from "src/components/FullReactions";

import { incrementViewPost } from "src/services/supabase/post";
import { useAuth } from "src/contexts";
import CardComments from "../../modules/CardComments/CardComments";

const Post = () => {
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

          <CardComments user={user} fatherContent={post} />
        </PostComponent>
      </div>
    </>
  );
};

export default Post;
