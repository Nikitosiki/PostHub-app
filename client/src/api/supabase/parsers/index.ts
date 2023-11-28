import { ITag, IUser, IReactions, IPost } from "src/interfaces";

export const toPost = (object): IPost => {
  return {
    id: object.id,
    title: object.title,
    content: object.content,
    author: toUser(object.users),
    image_url: null,
    age_rating: null,
    tags: object.tags.map((tag) => toTag(tag)),
    reactions: toReactions(object.reactions),
    views: object.count_view,
    published_at: object.created_at,
    updated_at: object.updated_at,
  };
};

export const toTag = (object): ITag => {
  return {
    id: object.id,
    title: object.title,
    description: object.description ?? "",
    image_path: object.image_path,
    created_at: object.created_at,
    updated_at: object.updated_at,
    author: toUser(object.users),
  };
};

export const toUser = (object): IUser => {
  return {
    id: object.id,
    name: object.name ?? "",
    email: object.email,
    image_url: object.avatar_url,
    reg_date: object.created_at,
    gender: object.genders.name,
    role: "",
  };
};

export const toReactions = (object): IReactions => {
  const reactions: IReactions = [];

  object.map((userReaction) => {
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

  return reactions;
};
