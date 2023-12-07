import { client } from "./config/supabase";
import { TablesInsert, ITags } from "src/interfaces";
import { toTag } from "./parsers";

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

export const createTag = async (tag: TablesInsert<"tags">) => {
  const { data, error } = await client.from("tags").insert(tag).select();
  return { data, error };
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

export const getSortedTags = async (
  pageNumber: number,
  pageSize: number = 10,
  sortBy: "Latest" | "First" | "Ascending" | "Descending" = "Latest",
): Promise<ITags> => {
  const { data, error } = await client
    .from("tags")
    .select(`*, users(*, genders(name))`)
    .order(sortBy === "Latest" || sortBy === "First" ? "created_at" : "title", {
      ascending: (sortBy === "First" || sortBy === "Ascending"),
    })
    .range(pageNumber * pageSize - pageSize, pageNumber * pageSize - 1);

  error && console.log(error);
  if (!Array.isArray(data) || data.length < 1) return [];

  return data.map((tag) => toTag(tag)).filter((tag) => tag !== null) as ITags;
};
