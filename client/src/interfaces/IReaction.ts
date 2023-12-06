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
  emoji: string;
  count: number;
}

export interface IReactions extends Array<IReaction> {}
export interface IReactionViews extends Array<IReactionView> {}