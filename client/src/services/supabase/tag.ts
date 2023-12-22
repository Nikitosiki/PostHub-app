import { client } from "./config/supabase";
import { TablesInsert, ITags, ITag } from "src/interfaces";
import { toTag } from "./parsers";

export const createTag = async (tag: TablesInsert<"tags">) => {
  const { data, error } = await client.from("tags").insert(tag).select();
  return { data, error };
};

export const getSortedTags = async (
  pageNumber: number,
  pageSize: number = 10,
  sortBy: string,
): Promise<ITags> => {
  const { data, error } = await client
    .from("tags")
    .select(`*, users(*, genders(name))`)
    .order(sortBy === "latest" || sortBy === "first" ? "created_at" : "title", {
      ascending: (sortBy === "first" || sortBy === "ascending"),
    })
    .range(pageNumber * pageSize - pageSize, pageNumber * pageSize - 1);

  error && console.log(error);
  if (!Array.isArray(data) || data.length < 1) return [];

  return data.map((tag) => toTag(tag)).filter((tag) => tag !== null) as ITags;
};

export const searchTagsByTitle = async (
  title: string,
  limit?: number,
): Promise<ITags> => {
  const { data, error } = await client
    .from("tags")
    .select(`*, users(*, genders(name))`)
    .filter("title", "ilike", `%${title}%`)
    .limit(limit ?? 50);

  error && console.log(error);
  if (!Array.isArray(data) || data.length < 1) return [];

  return data.map((tag) => toTag(tag)).filter((tag) => tag !== null) as ITags;
};

export const getTagIdByTitle = async (
  title: string,
): Promise<string | null> => {
  const { data, error } = await client
    .from("tags")
    .select("id")
    .eq("title", title);

  error && console.log(error);
  if (!Array.isArray(data) || data.length < 1) return null;

  return data[0].id;
};

export const getTagById = async (
  id: string,
): Promise<ITag | null> => {
  const { data, error } = await client
    .from("tags")
    .select(`*, users(*, genders(name))`)
    .eq("id", id);

  error && console.log(error);
  if (!Array.isArray(data) || data.length < 1) return null;

  return toTag(data[0]);
};

export const getCountTagsByAuthor = async (userId: string): Promise<number> => {
  const { data, error } = await client
    .from("tags")
    .select("id")
    .eq("author_id", userId);

  error && console.log(error);
  if (!Array.isArray(data) || data.length < 1) return 0;

  return data.length;
};

export const getTagsByPostId = async (postId: string): Promise<ITags> => {
  const { data, error } = await client
    .from("posts")
    .select(
      `tags(*, users(*, genders(name)))`,
    )
    .eq("id", postId);

  error && console.log(error);
  if (!Array.isArray(data) || data.length < 1) return [];

  return data[0].tags.map((tag) => toTag(tag)).filter((tag) => tag !== null) as ITags;
};