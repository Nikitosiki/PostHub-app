import { users } from "./data/users";

export const getUserById = (id: string) => {
  return users.find((user) => user.id === id) || null;
};

export const getFirstUser = () => {
  return users[0];
};
