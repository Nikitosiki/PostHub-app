import { IReactions, IUser } from ".";

export interface IComment {
  id: number;
  content: string;
  author: IUser;
  child_comments: IComments;
  reactions: IReactions;
  path: Array<number>;
  created_at: Date;
  updated_at: Date | null;
}

export interface ICommentData {
  id: number;
  content: string;
  author: IUser;
  reactions: IReactions;
  parent_comment_id: number | null;
  path: Array<number>;
  created_at: Date;
  updated_at: Date | null;
}

export interface IComments extends Array<IComment> {}
export interface ICommentsData extends Array<ICommentData> {}
