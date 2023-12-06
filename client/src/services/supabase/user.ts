import { client } from "./config/supabase";
import { IUser, IUsers } from "src/interfaces";
import { toUser } from "./parsers";

export const searchUsersByName = async (name: string, limit?: number): Promise<IUsers> => {
  const { data, error } = await client
    .from("users")
    .select("*, genders(name)")
    .filter("name", "ilike", `%${name}%`)
    .limit(limit ?? 50);
    
  error && console.log(error);
  if (!Array.isArray(data) || data.length < 1) return [];

  return data.map((user) => toUser(user)).filter((user) => user !== null) as IUsers;
};

export const getUserByUid = async (uid: string): Promise<IUser | null> => {
  const { data, error } = await client
    .from("users")
    .select("*, genders(name)")
    .eq("uid", uid);
    
  error && console.log(error);
  if (!Array.isArray(data) || data.length < 1) return null;

  return toUser(data[0]);
};
