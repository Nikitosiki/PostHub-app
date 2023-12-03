import { ICommentsData } from "src/interfaces";
import { client } from "./config/supabase";
import { toCommentData } from "./parsers";

// export const getComments = async (post_id: string): Promise<IComments> => {
//   const { data, error } = await client
//     .from("post_comments")
//     .select(`comments(*, users(*, genders(name)))`)
//     .eq("post_id", post_id);

//   console.log(data, error);

//   error && console.log(error);
//   if (!Array.isArray(data) || data.length < 1) return [];

//   return data
//     .map((dataComment) =>
//       dataComment.comments ? toComment(dataComment.comments) : null,
//     )
//     .filter((comment) => comment !== null) as IComments;
// };

export const getComments = async (post_id: string): Promise<ICommentsData> => {
  const { data, error } = await client
    .from("comments")
    .select(`*, users!comments_author_id_fkey(*, genders(name)), reactions(*)`)
    .eq("post_id", post_id);

  console.log(data, error);

  error && console.log(error);
  if (!Array.isArray(data) || data.length < 1) return [];

  return data
    .map((dataComment) => (dataComment ? toCommentData(dataComment) : null))
    .filter((comment) => comment !== null) as ICommentsData;
};