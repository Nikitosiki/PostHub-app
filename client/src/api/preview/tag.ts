import { tags } from "./data/tags";

export const getTags = () => {
  return tags;
};

export const getBigTags = () => {
  return tags.filter((tag) => tag.image_url !== null);
};

export const getTagById = (id: number) => {
  return tags.find((tag) => tag.id === id) || null;
};

export const getFirstTag = () => {
  return tags[0];
};
