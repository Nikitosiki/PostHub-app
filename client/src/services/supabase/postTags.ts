import { client } from "./config/supabase";
import { TablesInsert } from "src/interfaces";
import { getTagsByPostId } from "./tag";

export const addTagOnPost = async (post_tag: TablesInsert<"post_tags">) => {
  const { data, error } = await client
    .from("post_tags")
    .insert(post_tag)
    .select();

  error && console.log(error);
  return { data, error };
};

export const removeTagOnPost = async (tagId: string, postId: string) => {
  const { data, error } = await client
    .from("post_tags")
    .delete()
    .eq("post_id", postId)
    .eq("tag_id", tagId);

  error && console.log(error);
  return { data, error };
};

export const addTagsOnPost = async (tagsId: string[], postId: string) => {
  return await Promise.all(
    tagsId.map(async (tagId) => {
      return await addTagOnPost({
        post_id: postId,
        tag_id: tagId,
      });
    }),
  );
};

export const changeTagsOnPost = async (tagsId: string[], postId: string) => {
  const currentPostTags = await getTagsByPostId(postId);
  const removeTags = currentPostTags.filter((tag) => !tagsId.includes(tag.id));
  const addTags = tagsId;

  await Promise.all(
    removeTags.map(async (tag) => {
      await removeTagOnPost(tag.id, postId);
    }),
  );

  return await Promise.all(
    addTags.map(async (tagId) => {
      return await addTagOnPost({
        post_id: postId,
        tag_id: tagId,
      });
    }),
  );
};

// export const removeTagOnPost = async (post_tag: TablesInsert<"post_tags">) => {
//   const { data, error } = await client
//     .from("post_tags")
//     .delete()
//     .eq("id", post_tag.tag_id)

//   error && console.log(error);
//   return { data, error };
// };

// export const removeTagsOnPost = async (tagsId: string[], postId: string) => {
//   return await Promise.all(
//     tagsId.map(async (tagId) => {
//       return await removeTagOnPost({
//         post_id: postId,
//         tag_id: tagId,
//       });
//     }),
//   );
// };
