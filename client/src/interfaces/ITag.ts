import { IUser } from ".";

export interface ITag {
  id: string;
  title: string;
  description: string;
  author: IUser;
  image_path: string | null;
  created_at: Date;
  updated_at: Date | null;
}

// export interface ITagSimple {
//   id: number;
//   title: string;
//   created_at: Date | null;
//   updated_at: Date | null;
// }

export interface ITags extends Array<ITag> {}
// export interface ITagSimples extends Array<ITagSimple> {}