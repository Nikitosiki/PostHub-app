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

export const getSortedPosts = async (
  pageNumber: number,
  pageSize: number = 10,
  sortBy: string = "new",
): Promise<IPost[]> => {
  const { data, error } = await client
    .from("posts")
    .select(
      ` *, 
      users!posts_author_id_fkey(*, genders(name)), 
      tags(*, users(*, genders(name))), 
      reactions(*)`,
    )
    .order(sortBy === "hot" ? "count_view" : "created_at", { ascending: false })
    .range(pageNumber * pageSize - pageSize, pageNumber * pageSize - 1);

  error && console.log(error);
  if (!Array.isArray(data) || data.length < 1) return [];

  return data
    .map((post) => toPost(post))
    .filter((post) => post !== null) as IPosts;
};

export const getSortedPostsByTag = async (
  pageNumber: number,
  pageSize: number = 10,
  sortBy: string = "new",
  tagId: string,
): Promise<IPost[]> => {
  const dataPostsId = (await client.rpc("get_posts_by_tag", {
    tag_id_value: tagId,
    sort_option: sortBy,
    from: pageNumber * pageSize - pageSize,
    to: pageSize,
  }));

  if (!Array.isArray(dataPostsId.data) || dataPostsId.data.length < 1) return [];

  const postsId = dataPostsId.data.map(item => item.post_id);

  const { data, error } = await client
    .from("posts")
    .select(
      ` *, 
      users!posts_author_id_fkey(*, genders(name)), 
      tags(*, users(*, genders(name))), 
      reactions(*)`,
    )
    .in("id", postsId)
    .order(sortBy === "hot" ? "count_view" : "created_at", { ascending: false })
    .range(pageNumber * pageSize - pageSize, pageNumber * pageSize - 1);

  error && console.log(error);
  if (!Array.isArray(data) || data.length < 1) return [];

  return data
    .map((post) => toPost(post))
    .filter((post) => post !== null) as IPosts;
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

  error && console.log(error);
  if (!Array.isArray(data) || data.length < 1) return 0;

  return data.length;
};

export const getCountPostsByAuthor = async (userId: string): Promise<number> => {
  const { data, error } = await client
    .from("posts")
    .select("id")
    .eq("author_id", userId);

  error && console.log(error);
  if (!Array.isArray(data) || data.length < 1) return 0;

  return data.length;
};