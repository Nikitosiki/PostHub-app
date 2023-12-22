import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

import { IPost } from "src/interfaces";
import { NavigatePostPage } from "src/paths";
import Post from "src/modules/Post";
import { getPostById } from "src/services/supabase/post";
import { CommentSortConfig } from "src/modules/SelectSort/configs";
import SelectSort from "src/modules/SelectSort";
import ListComments from "src/modules/ListComments";

const sortConfig = CommentSortConfig;

const PostComments = () => {
  const [commentPost, setCommentPost] = useState<IPost | null>(null);
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setCommentPost(await getPostById(params.postId ?? ""));
    };

    fetchData();
  }, [params]);


  return (
    <>
      <div className="flex w-full flex-col sm:gap-4 sm:p-2">
        {commentPost && (
          <Post
            post={commentPost}
            tagsVisible={false}
            reactionVisible={false}
            countViewVisible={false}
            countCommentVisible={false}
            userViewVisible={false}
            contentHeight="short"
            cardClassName="rounded-none sm:rounded-large"
          />
        )}
        <Card
          className="w-full rounded-t-none border-none bg-background drop-shadow-lg hover:drop-shadow-xl sm:rounded-t-large sm:p-1"
          shadow="none"
        >
          <CardHeader className="flex flex-row items-center justify-between">
            {/* <h1 className="w-full text-left text-lg">Comments</h1> */}
            <Link to={NavigatePostPage(params.postId ?? "")}>
              <div className="inline-flex h-full items-center gap-1 text-sm text-primary">
                <span className="material-symbols-rounded">
                  keyboard_backspace
                </span>
                <span className="pt-0.5">Back to post</span>
              </div>
            </Link>
            <SelectSort sortConfig={sortConfig} className="max-w-[10rem]" />
          </CardHeader>

          {/* <CardBody className="pb-0">
            <Link to={NavigatePostPage(params.postId ?? "")}>
              <p className="text-primary">• • •</p>
            </Link>
            <Button
              size="sm"
              color="primary"
              variant="light"
              className="text-xs mr-auto"
              onClick={() => navigate(NavigatePostPage(params.postId ?? ""))}
            >
              View all comments
            </Button>
          </CardBody> */}

          <CardBody className="pt-0">
            <ListComments
              postId={params.postId ?? ""}
              commentId={params.id ? Number(params.id) : undefined}
            />
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default PostComments;
