import { client } from "./config/supabase";
import { Tables, TablesInsert } from "src/interfaces";

export const getAllReactions = async (): Promise<Tables<"reactions">[]> => {
  const { data, error } = await client.from("reactions").select();

  error && console.log(error);
  if (!Array.isArray(data) || data.length < 1) return [];

  return data;
};

export const addReactionToPost = async (
  post_react: TablesInsert<"post_reactions">,
) => {
  await client
    .from("post_reactions")
    .delete()
    .eq("post_id", post_react.post_id)
    .eq("user_id", post_react.user_id);

  const { data, error } = await client
    .from("post_reactions")
    .insert(post_react)
    .select();

  error && console.log(error);
  return { data, error };
};
