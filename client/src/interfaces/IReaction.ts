export interface IReaction {
  emoji: number;
  count: number;
}

export interface IReactions extends Array<IReaction> {}