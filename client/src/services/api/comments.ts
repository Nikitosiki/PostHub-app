import axios from "axios";

export const createComment = async (comment: Omit<Comment, "id">) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_V1_URL}/comments`,
      comment,
    );
    return { data: response.data };
  } catch (error) {
    console.error("Error creating comment:", error);
    return { data: null, error };
  }
};

export const updateCommentById = async (
  id: number,
  content: string,
): Promise<boolean> => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_V1_URL}/comments/${id}`,
      { content },
    );
    return response.status === 200;
  } catch (error) {
    console.error("Error updating comment:", error);
    return false;
  }
};

export const getCommentById = async (id: number) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_V1_URL}/comments/${id}`,
    );
    return { data: response.data };
  } catch (error) {
    console.error("Error fetching comment by ID:", error);
    return { data: null, error };
  }
};

export const getFirstComments = async (
  post_id: string,
  pageNumber: number = 1,
  pageSize: number = 20,
  inReverseOrder: boolean = false,
) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_V1_URL}/comments`,
      {
        params: {
          post_id,
          pageNumber,
          pageSize,
          inReverseOrder,
        },
      },
    );
    return { data: response.data };
  } catch (error) {
    console.error("Error fetching comments:", error);
    return { data: [], error };
  }
};

export const getCountComments = async (post_id: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_V1_URL}/comments/count`,
      { params: { post_id } },
    );
    return { data: response.data };
  } catch (error) {
    console.error("Error getting comment count:", error);
    return { data: 0, error };
  }
};

export const getFirstChildrensComment = async (
  comment_id: number,
  pageNumber: number = 1,
  pageSize: number = 20,
  inReverseOrder: boolean = false,
) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_V1_URL}/comments/children`,
      {
        params: {
          comment_id,
          pageNumber,
          pageSize,
          inReverseOrder,
        },
      },
    );
    return { data: response.data };
  } catch (error) {
    console.error("Error fetching child comments:", error);
    return { data: [], error };
  }
};

export const getCountCommentsByAuthor = async (userId: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_V1_URL}/comments/authors/${userId}/count`,
    );
    return { data: response.data };
  } catch (error) {
    console.error("Error getting comment count by author:", error);
    return { data: 0, error };
  }
};

export const addReactionToComment = async (comment_react: {
  comment_id: number;
  user_id: string;
  reaction_id: number;
}) => {
  try {
    await axios.delete(`${import.meta.env.VITE_API_V1_URL}/comment_reactions`, {
      data: {
        comment_id: comment_react.comment_id,
        user_id: comment_react.user_id,
      },
    });

    const response = await axios.post(
      `${import.meta.env.VITE_API_V1_URL}/comment_reactions`,
      comment_react,
    );
    return { data: response.data };
  } catch (error) {
    console.error("Error adding reaction to comment:", error);
    return { data: null, error };
  }
};

export const removeMyReactionToComment = async (comment_react: {
  comment_id: number;
  user_id: string;
}) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_V1_URL}/comment_reactions`,
      {
        data: comment_react,
      },
    );
    return { data: response.data };
  } catch (error) {
    console.error("Error removing reaction to comment:", error);
    return { data: null, error };
  }
};

export const getReactionsToComment = async (commentId: number) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_V1_URL}/comments/${commentId}/reactions`,
    );
    return { data: response.data };
  } catch (error) {
    console.error("Error getting reactions to comment:", error);
    return { data: [], error };
  }
};

export const getMyReactionIdToComment = async (
  userId: string,
  commentId: number,
) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_V1_URL}/comment_reactions`,
      {
        params: {
          comment_id: commentId,
          user_id: userId,
        },
      },
    );
    return { data: response.data?.reaction_id ?? null };
  } catch (error) {
    console.error("Error getting reaction ID to comment:", error);
    return { data: null, error };
  }
};
