import { client } from "src/contexts/Auth/AuthFunctions";
import { TablesInsert } from "src/interfaces";

export const addTagToPost = async (post_tag: TablesInsert<"post_tags">) => {
  const { data, error } = await client
    .from("post_tags")
    .insert(post_tag)
    .select();

  error && console.log(error);
  return { data, error };
};

export const addTagsToPost = async (tagsId: string[], postId: string) => {
  return await Promise.all(
    tagsId.map(async (tagId) => {
      return await addTagToPost({
        post_id: postId,
        tag_id: tagId,
      });
    }),
  );
};
