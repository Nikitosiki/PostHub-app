import { client } from "src/contexts/Auth/AuthFunctions";
import { Create, IPost, IPosts } from "src/interfaces";
import { toPost } from "./parsers";

// export const createPost = async (post: ICreatePost) => {
//   const { data, error } = await client.rpc("create_post", {
//     title: post.title,
//     content: post.content,
//     author_id: post.author_id,
//   });
//   return { data, error };
// };

export const createPost = async (post: Create<"posts">) => {
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
