import { IComments, ITags, IUser } from ".";

interface IRating {
  age: number;
  name: string;
}

interface IReaction {
  grade: number;
  count: number;
}

interface IReactions extends Array<IReaction> {}

export interface IPost {
  id: number;
  title: string;
  content: string;
  image_url: string | null;
  author: IUser;
  age_rating: IRating | null;
  tags: ITags;
  reaction: IReactions;
  comments: IComments | null;
  views: number;
  published_at: Date;
  updated_at: Date | null;
}
