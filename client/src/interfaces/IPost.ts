import { ITags, IUser, IReactions } from ".";

interface IRating {
  age: number;
  name: string;
}

export interface IPost {
  id: number;
  title: string;
  content: string;
  image_url: string | null;
  author: IUser;
  age_rating: IRating | null;
  tags: ITags;
  reactions: IReactions;
  views: number;
  published_at: Date;
  updated_at: Date | null;
}
