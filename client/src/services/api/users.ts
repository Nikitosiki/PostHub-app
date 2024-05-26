import axios from "axios";

export const searchUsersByName = async (name: string, limit?: number) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_V1_URL}/users/search`,
      {
        params: {
          name,
          limit,
        },
      },
    );
    return { data: response.data };
  } catch (error) {
    console.error("Error searching users by name:", error);
    return { data: [], error };
  }
};

export const getUserById = async (id: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_V1_URL}/users/${id}`,
    );
    return { data: response.data };
  } catch (error) {
    console.error("Error getting user by ID:", error);
    return { data: null, error };
  }
};

export const getUserByUid = async (uid: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_V1_URL}/users/uid/${uid}`,
    );
    return { data: response.data };
  } catch (error) {
    console.error("Error getting user by UID:", error);
    return { data: null, error };
  }
};

export const updateUserById = async (
  id: string,
  name?: string,
  imageUrl?: string,
) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_V1_URL}/users/${id}`,
      {
        name,
        avatar_url: imageUrl,
      },
    );
    return { data: response.status === 200 };
  } catch (error) {
    console.error("Error updating user by ID:", error);
    return { data: false, error };
  }
};
