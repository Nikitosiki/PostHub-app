import { ICommentsData, IComment } from "src/interfaces";

export const buildCommentTree = (
  commentData: ICommentsData,
  parentId: number | null = null,
): IComment[] => {
  const comments: IComment[] = [];

  commentData
    .filter((comment) => comment.parent_comment_id === parentId)
    .forEach((comment) => {
      const childComments = buildCommentTree(commentData, comment.id);

      const newComment: IComment = {
        id: comment.id,
        content: comment.content,
        author: comment.author,
        child_comments: childComments,
        reactions: comment.reactions,
        created_at: comment.created_at,
        updated_at: comment.updated_at,
      };

      comments.push(newComment);
    });

    console.log(comments)
  return comments;
};
