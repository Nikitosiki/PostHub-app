import { client } from "src/contexts/Auth/AuthFunctions";
import { IUser } from "src/interfaces";
import { toUser } from "./parsers";

export const getUserByUid = async (uid: string): Promise<IUser | null> => {
  const { data, error } = await client
    .from("users")
    .select("*, genders(name)")
    .eq("uid", uid);
  error && console.log(error);
  if (!Array.isArray(data) || data.length < 1) return null;

  return toUser(data[0]);
};
