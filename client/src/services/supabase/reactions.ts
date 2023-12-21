import { client } from "./config/supabase";
import { IReactions, Tables, TablesInsert } from "src/interfaces";
import { toReaction } from "./parsers";

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

export const removeMyReactionToPost = async (
  post_react: Omit<TablesInsert<"post_reactions">, "reaction_id">,
) => {
  const { data, error } = await client
    .from("post_reactions")
    .delete()
    .eq("post_id", post_react.post_id)
    .eq("user_id", post_react.user_id);

  error && console.log(error);

  return data;
};

export const getReactionsToPost = async (
  postId: string,
): Promise<IReactions> => {
  const { data, error } = await client
    .from("posts")
    .select("reactions(*)")
    .eq("id", postId);

  error && console.log(error);
  if (!Array.isArray(data) || data.length < 1) return [];

  return data[0].reactions.map((react) => toReaction(react));
};

export const getMyReactionIdToPost = async (
  userId: string,
  postId: string,
): Promise<number | null> => {
  const { data, error } = await client
    .from("post_reactions")
    .select("reaction_id")
    .eq("post_id", postId)
    .eq("user_id", userId)
    .maybeSingle();

  error && console.log(error);

  return data?.reaction_id ?? null;
};
