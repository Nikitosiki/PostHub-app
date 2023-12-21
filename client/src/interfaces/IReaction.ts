// export interface IReaction {
//   emoji: string;
//   count: number;
// }

export interface IReaction {
  id: number;
  emoji: string;
  grade: number;
}

export interface IReactionView {
  id: number;
  emoji: string;
  count: number;
}

export interface IReactions extends Array<IReaction> {
  [x: string]: any;
}
export interface IReactionViews extends Array<IReactionView> {}