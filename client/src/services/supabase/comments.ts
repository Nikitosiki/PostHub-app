import { ICommentData, ICommentsData, Database } from "src/interfaces";
import { client } from "./config/supabase";
import { toCommentData } from "./parsers";
import { TableCommentsPars } from "./parsers/types";

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

export const createComment = async (comment: Database["public"]["Functions"]["create_comment"]["Args"]) => {
  const { data, error } = await client.rpc("create_comment", comment);
  return { data, error };
};

export const getCommentById = async (
  id: string,
): Promise<ICommentData | null> => {
  const { data, error } = await client
    .from("comments")
    .select(`*, users!comments_author_id_fkey(*, genders(name)), reactions(*)`)
    .eq("id", id);

  error && console.log(error);
  if (!Array.isArray(data) || data.length < 1) return null;

  return toCommentData(data[0]) as ICommentData;
};

export const getFirstComments = async (
  post_id: string,
  pageNumber: number = 1,
  pageSize: number = 20,
  inReverseOrder: boolean = false,
): Promise<ICommentsData> => {
  const { data, error } = await client
    .from("comments")
    .select(`*, users!comments_author_id_fkey(*, genders(name)), reactions(*)`)
    .eq("post_id", post_id)
    .order("path", { ascending: !inReverseOrder })
    .range(pageNumber * pageSize - pageSize, pageNumber * pageSize - 1);

  error && console.log(error);
  if (!Array.isArray(data) || data.length < 1) return [];

  return data
    .map((dataComment) => (dataComment ? toCommentData(dataComment) : null))
    .filter((comment) => comment !== null) as ICommentsData;
};

export const getCountComments = async (post_id: string): Promise<number> => {
  const { data, error } = await client.rpc("getCountComments", {
    post_id_prop: post_id,
  });

  if (error) return 0;
  return data;
};

export const getFirstChildrensComment = async (
  comment_id: number,
  pageNumber: number = 1,
  pageSize: number = 20,
  inReverseOrder: boolean = false,
): Promise<ICommentsData> => {
  const { data, error } = await client.rpc(inReverseOrder ? "get_reverse_childrens_comment" : "get_childrens_comment", {
    parent_id: comment_id,
    from: pageNumber * pageSize - pageSize,
    to: pageSize,
  });

  error && console.log(error);
  if (!Array.isArray(data) || data.length < 1) return [];

  const comments = data.map(async (dataComment) => {
    const { data, error } = await client
      .from("comments")
      .select("*, users!comments_author_id_fkey(*, genders(name)), reactions(*)")
      .eq("id", dataComment.id);
    
    error && console.log(error);
    if (!Array.isArray(data) || data.length < 1) return [];

    return data[0];
  });

  const value = await Promise.all(comments) as TableCommentsPars[];

  return value
    .map((dataComment) => (dataComment ? toCommentData(dataComment) : null))
    .filter((comment) => comment !== null) as ICommentsData;
};
