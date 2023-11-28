import { ITags, IUser, IReactions } from ".";

interface IRating {
  age: number;
  name: string;
}

export interface IPost {
  id: string;
  title: string;
  content: string;
  author: IUser;
  image_url: string | null;
  age_rating: IRating | null;
  tags: ITags;
  reactions: IReactions;
  views: number;
  published_at: Date;
  updated_at: Date | null;
}

export interface ICreatePost {
  title: string;
  content: string;
  author_id: string;
}

export interface IPosts extends Array<IPost> {}