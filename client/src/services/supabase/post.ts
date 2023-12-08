import { client } from "./config/supabase";
import { IPost, IPosts, IUser, TablesInsert } from "src/interfaces";
import { toPost } from "./parsers";

// export const createPost = async (post: ICreatePost) => {
//   const { data, error } = await client.rpc("create_post", {
//     title: post.title,
//     content: post.content,
//     author_id: post.author_id,
//   });
//   return { data, error };
// };

export const createPost = async (post: TablesInsert<"posts">) => {
  const { data, error } = await client.from("posts").insert(post).select();
  return { data, error };
};

export const searchPostsByTitle = async (text: string, limit?: number) => {
  const { data, error } = await client
    .from("posts")
    .select(
      ` *, 
    users!posts_author_id_fkey(*, genders(name)), 
    tags(*, users(*, genders(name))), 
    reactions(*)`,
    )
    .ilike("title", `%${text}%`)
    .range(0, (limit ?? 5) - 1);

  error && console.log(error);
  if (!Array.isArray(data) || data.length < 1) return [];

  return data
    .map((post) => toPost(post))
    .filter((post) => post !== null) as IPosts;
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

  return data
    .map((post) => toPost(post))
    .filter((post) => post !== null) as IPosts;
};

export const getNewPosts = async (
  pageNumber: number,
  pageSize: number = 10,
): Promise<IPost[]> => {
  console.log(pageNumber, pageSize);
  const { data, error } = await client
    .from("posts")
    .select(
      ` *, 
      users!posts_author_id_fkey(*, genders(name)), 
      tags(*, users(*, genders(name))), 
      reactions(*)`,
    )
    .order("created_at", { ascending: false })
    .range(pageNumber * pageSize - pageSize, pageNumber * pageSize - 1);

  error && console.log(error);
  if (!Array.isArray(data) || data.length < 1) return [];

  return data
    .map((post) => toPost(post))
    .filter((post) => post !== null) as IPosts;
};

export const getHotPosts = async (
  pageNumber: number,
  pageSize: number = 10,
): Promise<IPost[]> => {
  console.log(pageNumber, pageSize);
  const { data, error } = await client
    .from("posts")
    .select(
      ` *, 
      users!posts_author_id_fkey(*, genders(name)), 
      tags(*, users(*, genders(name))), 
      reactions(*)`,
    )
    .order("count_view", { ascending: false })
    .range(pageNumber * pageSize - pageSize, pageNumber * pageSize - 1);

  error && console.log(error);
  if (!Array.isArray(data) || data.length < 1) return [];

  return data
    .map((post) => toPost(post))
    .filter((post) => post !== null) as IPosts;
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

export const incrementViewPost = async (
  post_id: string,
  identifier: IUser | string,
) => {
  if (typeof identifier === "string") {
    await client.from("count_views_unauth").insert({
      post_id: post_id,
      fingerprint_id: identifier,
    });
  } else {
    await client.from("count_views_auth").insert({
      post_id: post_id,
      user_id: identifier.id,
    });
  }
};

export const getCountPosts = async (): Promise<number> => {
  const { data, error } = await client.rpc("get_count_post");

  if (error) return 0;
  return data;
};

export const getCountPostsByTag = async (tagId: string): Promise<number> => {
  const { data, error } = await client
    .from("post_tags")
    .select("post_id")
    .eq("tag_id", tagId);

  console.log(data);
  error && console.log(error);
  if (!Array.isArray(data) || data.length < 1) return 0;

  return data.length;
};
