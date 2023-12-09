import { SelectConfig } from ".";

export const CommentSortConfig: SelectConfig = {
  searchParamName: "sort",
  defaultKey: "first",
  items: [
    {
      key: "first",
      value: "First",
    },
    {
      key: "latest",
      value: "Latest",
    },
  ],
};

export const TagSortConfig: SelectConfig = {
  searchParamName: "sort",
  defaultKey: "latest",
  items: [
    {
      key: "latest",
      value: "Latest",
    },
    {
      key: "first",
      value: "First",
    },
    {
      key: "ascending",
      value: "Ascending",
    },
    {
      key: "descending",
      value: "Descending",
    },
  ],
};

export const PostSortConfig: SelectConfig = {
  searchParamName: "sort",
  defaultKey: "new",
  items: [
    {
      key: "new",
      value: "New",
    },
  ],
};
