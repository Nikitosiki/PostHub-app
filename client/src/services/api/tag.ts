import axios from "axios";
import { TablesInsert } from "src/interfaces";

export const createTag = async (tag: TablesInsert<"tags">) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_V1_URL}/tags`,
      tag,
    );
    return { data: response.data };
  } catch (error) {
    console.error("Error creating tag:", error);
    return { data: null, error };
  }
};

export const getSortedTags = async (
  pageNumber: number,
  pageSize: number = 10,
  sortBy: string,
) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_V1_URL}/tags`,
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
    console.error("Error fetching sorted tags:", error);
    return { data: [], error };
  }
};

export const searchTagsByTitle = async (title: string, limit?: number) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_V1_URL}/tags/search`,
      {
        params: {
          title,
          limit,
        },
      },
    );
    return { data: response.data };
  } catch (error) {
    console.error("Error searching tags by title:", error);
    return { data: [], error };
  }
};

export const getTagIdByTitle = async (title: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_V1_URL}/tags/id`,
      {
        params: { title },
      },
    );
    return { data: response.data };
  } catch (error) {
    console.error("Error getting tag ID by title:", error);
    return { data: null, error };
  }
};

export const getTagById = async (id: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_V1_URL}/tags/${id}`,
    );
    return { data: response.data };
  } catch (error) {
    console.error("Error getting tag by ID:", error);
    return { data: null, error };
  }
};

export const getCountTagsByAuthor = async (userId: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_V1_URL}/tags/author/${userId}/count`,
    );
    return { data: response.data };
  } catch (error) {
    console.error("Error getting tag count by author:", error);
    return { data: 0, error };
  }
};

export const getTagsByPostId = async (postId: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_V1_URL}/posts/${postId}/tags`,
    );
    return { data: response.data };
  } catch (error) {
    console.error("Error getting tags by post ID:", error);
    return { data: [], error };
  }
};
