import { client } from "./config/supabase";
import { IReactions, TablesInsert } from "src/interfaces";
import { toReaction } from "./parsers";


export const addReactionToComment = async (
  comment_react: TablesInsert<"comment_reactions">,
) => {
  await client
    .from("comment_reactions")
    .delete()
    .eq("comment_id", comment_react.comment_id)
    .eq("user_id", comment_react.user_id);

  const { data, error } = await client
    .from("comment_reactions")
    .insert(comment_react)
    .select();

  error && console.log(error);
  return { data, error };
};

export const removeMyReactionToComment = async (
  comment_react: Omit<TablesInsert<"comment_reactions">, "reaction_id">,
) => {
  const { data, error } = await client
    .from("comment_reactions")
    .delete()
    .eq("comment_id", comment_react.comment_id)
    .eq("user_id", comment_react.user_id);

  error && console.log(error);

  return data;
};

export const getReactionsToComment = async (
  commentId: number,
): Promise<IReactions> => {
  const { data, error } = await client
    .from("comments")
    .select("reactions(*)")
    .eq("id", commentId);

  error && console.log(error);
  if (!Array.isArray(data) || data.length < 1) return [];

  return data[0].reactions.map((react) => toReaction(react));
};

export const getMyReactionIdToComment = async (
  userId: string,
  commentId: number,
): Promise<number | null> => {
  const { data, error } = await client
    .from("comment_reactions")
    .select("reaction_id")
    .eq("comment_id", commentId)
    .eq("user_id", userId)
    .maybeSingle();

  error && console.log(error);

  return data?.reaction_id ?? null;
};