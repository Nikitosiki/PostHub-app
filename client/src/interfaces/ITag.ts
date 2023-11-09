import { IUser } from ".";

export interface ITag {
  id: number;
  title: string;
  description: string;
  author: IUser;
  image_url: string | null;
  created_at: Date;
}