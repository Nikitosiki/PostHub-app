import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { Card, CardBody } from "@nextui-org/react";

import { default as PostComponent } from "src/modules/Post";
import { IPost } from "src/interfaces";
import Tag from "src/components/Tag";
import FullReactions from "src/components/FullReactions";

import { incrementViewPost } from "src/services/supabase/post";
import { useAuth } from "src/contexts";
import CardComments from "../../modules/CardComments";

const Post = () => {
  const post = useLoaderData() as IPost;
  const { fsUserId, user } = useAuth();

  useEffect(() => {
    if (fsUserId || user) incrementViewPost(post.id, user ?? fsUserId ?? "");
  }, []);

  return (
    <>
      <div className="flex w-full flex-col sm:gap-4 sm:p-2">
        <PostComponent
          post={post}
          fullContent
          isPressable={false}
          tagsVisible={false}
          reactionVisible={false}
          countViewVisible={false}
          countCommentVisible={false}
          editButtonVisible={true}
          cardClassName="rounded-none sm:rounded-large"
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
        </PostComponent>

        <Card
          className={
            "w-full rounded-none border-none bg-background p-1 drop-shadow-lg hover:drop-shadow-xl sm:rounded-large"
          }
          shadow="none"
        >
          <CardBody
            className={`items-center ${post.reactions.length < 1 && "hidden"}`}
          >
            <FullReactions reactions={post.reactions} />
          </CardBody>

          <CardComments fatherContent={post} />
        </Card>
      </div>
    </>
  );
};

export default Post;
