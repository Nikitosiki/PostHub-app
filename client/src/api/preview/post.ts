import { posts } from "./data/posts";

export const getPosts = () => {
  return posts.sort((a, b) => {
    return a.id < b.id ? 1 : -1;
  });
};

export const getHotPosts = () => {
  return posts.sort((a, b) => {
    return a.views < b.views ? 1 : -1;
  });
};
