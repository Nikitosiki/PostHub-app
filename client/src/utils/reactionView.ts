import { IReactionViews, IReactions } from "src/interfaces";

export const toReactionViews = (value: IReactions): IReactionViews => {
  const reactions: IReactionViews = [];

  value.map((userReaction) => {
    const existingIndex = reactions.findIndex(
      (obj) => obj.emoji === userReaction.emoji,
    );

    if (existingIndex === -1) {
      reactions.push({
        emoji: userReaction.emoji,
        count: 1,
      });
    } else {
      reactions[existingIndex].count += 1;
    }
  });
  
  return reactions.sort((a, b) => { return b.count - a.count });
};
