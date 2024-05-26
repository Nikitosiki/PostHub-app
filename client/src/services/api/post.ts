import axios from "axios";
import { TablesInsert } from "src/interfaces";

export const createPost = async (post: TablesInsert<"posts">) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_V1_URL}/posts`,
      post,
    );
    return { data: response.data };
  } catch (error) {
    console.error("Error creating post:", error);
    return { data: null, error };
  }
};

export const getSortedPosts = async (
  pageNumber: number,
  pageSize: number = 10,
  sortBy: string = "new",
) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_V1_URL}/posts`,
      {
        params: {
          pageNumber,
          pageSize,
          sortBy,
        },
      },
    );
    return { data: response.data };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { data: [], error };
  }
};

export const getSortedPostsByTag = async (
  pageNumber: number,
  pageSize: number = 10,
  sortBy: string = "new",
  tagId: string,
) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_V1_URL}/posts/tags/${tagId}`,
      {
        params: {
          pageNumber,
          pageSize,
          sortBy,
        },
      },
    );
    return { data: response.data };
  } catch (error) {
    console.error("Error fetching posts by tag:", error);
    return { data: [], error };
  }
};

export const searchPostsByTitle = async (text: string, limit?: number) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_V1_URL}/posts/search`,
      {
        params: {
          title: text,
          limit,
        },
      },
    );
    return { data: response.data };
  } catch (error) {
    console.error("Error searching posts by title:", error);
    return { data: [], error };
  }
};

export const getPostById = async (id: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_V1_URL}/posts/${id}`,
    );
    return { data: response.data };
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    return { data: null, error };
  }
};

export const incrementViewPost = async (
  postId: string,
  identifier: string | { id: string },
) => {
  try {
    if (typeof identifier === "string") {
      await axios.post(
        `${import.meta.env.VITE_API_V1_URL}/posts/${postId}/views`,
        { fingerprint_id: identifier },
      );
    } else {
      await axios.post(
        `${import.meta.env.VITE_API_V1_URL}/posts/${postId}/views`,
        { user_id: identifier.id },
      );
    }
  } catch (error) {
    console.error("Error incrementing post view:", error);
  }
};

export const getCountPosts = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_V1_URL}/posts/count`,
    );
    return { data: response.data };
  } catch (error) {
    console.error("Error getting post count:", error);
    return { data: 0, error };
  }
};

export const getCountPostsByTag = async (tagId: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_V1_URL}/posts/tags/${tagId}/count`,
    );
    return { data: response.data };
  } catch (error) {
    console.error("Error getting post count by tag:", error);
    return { data: 0, error };
  }
};

export const getCountPostsByAuthor = async (userId: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_V1_URL}/posts/authors/${userId}/count`,
    );
    return { data: response.data };
  } catch (error) {
    console.error("Error getting post count by author:", error);
    return { data: 0, error };
  }
};
