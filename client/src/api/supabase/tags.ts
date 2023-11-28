import { client } from "src/contexts/Auth/AuthFunctions";
import { ITags } from "src/interfaces";
import { toTag } from "./parsers";

export const getTagsByTitle = async (title: string): Promise<ITags> => {
  const { data, error } = await client
    .from("tags")
    .select(`*, users(*, genders(name))`)
    .filter("title", "ilike", `%${title}%`)
    .limit(50);
  error && console.log(error);
  if (!Array.isArray(data) || data.length < 1) return [];

  return data.map((tag) => toTag(tag));
};
