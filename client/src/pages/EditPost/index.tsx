import { useLoaderData } from "react-router-dom";
import { useAuth } from "src/contexts";
import { IPost } from "src/interfaces";
import CreatePost from "../CreatePost";
const EditPost = () => {
  const { user } = useAuth();
  const post = useLoaderData() as IPost;

  if (post.author.id !== user?.id)
    throw new Response("You are not the owner of this post", { status: 403 });

  return <CreatePost editPostData={post} />;
};

export default EditPost;
