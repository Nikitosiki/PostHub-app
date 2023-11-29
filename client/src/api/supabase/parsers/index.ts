import { ITag, IUser, IReaction, IPost, Tables, ITags } from "src/interfaces";
import { TablePostPars, TableTagsPars, TableUsersPars } from "./types";

export const toPost = (object: TablePostPars): IPost | null => {
  if (object.users === null) return null;

  return {
    id: object.id,
    title: object.title ?? "",
    content: object.content ?? "",
    author: toUser(object.users),
    image_url: null,
    age_rating: null,
    tags: object.tags
      .map((tag) => toTag(tag))
      .filter((tag) => tag !== null) as ITags,
    reactions: object.reactions.map((react) => toReaction(react)),
    views: object.count_view,
    published_at: new Date(object.created_at),
    updated_at: object.updated_at ? new Date(object.updated_at) : null,
  };
};

export const toTag = (object: TableTagsPars): ITag | null => {
  if (object.users === null) return null;

  return {
    id: object.id,
    title: object.title,
    description: object.description ?? "",
    image_path: object.image_path,
    created_at: new Date(object.created_at),
    updated_at: object.updated_at ? new Date(object.updated_at) : null,
    author: toUser(object.users),
  };
};

export const toUser = (object: TableUsersPars): IUser => {
  return {
    id: object.id,
    name: object.name ?? "",
    email: object.email,
    image_url: object.avatar_url,
    reg_date: new Date(object.created_at),
    gender: object.genders?.name ?? null,
    role: "",
  };
};

export const toReaction = (object: Tables<"reactions">): IReaction => {
  return {
    id: object.id,
    emoji: object.emoji,
    grade: object.grade,
  };
};

// export const toReactions = (object): IReactions => {
//   const reactions: IReactions = [];
//   console.log(object)

//   object.map((userReaction) => {
//     const existingIndex = reactions.findIndex(
//       (obj) => obj.emoji === userReaction.emoji,
//     );

//     if (existingIndex === -1) {
//       reactions.push({
//         emoji: userReaction.emoji,
//         count: 1,
//       });
//     } else {
//       reactions[existingIndex].count += 1;
//     }
//   });

//   return reactions;
// };
