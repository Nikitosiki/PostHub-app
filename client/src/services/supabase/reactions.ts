import { client } from "./config/supabase";
import { Tables } from "src/interfaces";

export const getAllReactions = async (): Promise<Tables<"reactions">[]> => {
  const { data, error } = await client.from("reactions").select();

  error && console.log(error);
  if (!Array.isArray(data) || data.length < 1) return [];

  return data;
};
