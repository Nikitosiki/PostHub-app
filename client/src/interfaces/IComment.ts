import { IComments, IUser } from ".";

export interface IComment {
  id: number;
  content: string;
  author: IUser;
  child_comments: IComments | null;
  created_at: Date;
  updated_at: Date | null;
}