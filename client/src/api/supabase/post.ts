import { client } from "src/contexts/Auth/AuthFunctions";
import { ICreatePost, IPost } from "src/interfaces";
import { toPost } from "./parsers";

export const createPost = async (post: ICreatePost) => {
  const { data, error } = await client.rpc("create_post", {
    title: post.title,
    content: post.content,
    author_id: post.author_id,
  });
  return { data, error };
};

export const getPosts = async (): Promise<IPost[]> => {
  const { data, error } = await client.from("posts").select(
    ` *, 
      users!posts_author_id_fkey(*, genders(name)), 
      tags(*, users(*, genders(name))), 
      reactions(*)`,
  );
  error && console.log(error);
  if (!Array.isArray(data) || data.length < 1) return [];

  return data.map((post) => toPost(post));
};

export const getPostById = async (id: string): Promise<IPost | null> => {
  const { data, error } = await client
    .from("posts")
    .select(
      ` *, 
      users!posts_author_id_fkey(*, genders(name)), 
      tags(*, users(*, genders(name))), 
      reactions(*)`,
    )
    .eq("id", id);
  error && console.log(error);
  if (!Array.isArray(data) || data.length < 1) return null;

  return toPost(data[0]);
};
