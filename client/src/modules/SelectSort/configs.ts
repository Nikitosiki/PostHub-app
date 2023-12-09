import { SelectConfig } from ".";

export const CommentSortConfig: SelectConfig = {
  searchParamName: "sort-c",
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
  searchParamName: "sort-t",
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
  searchParamName: "sort-p",
  defaultKey: "new",
  items: [
    {
      key: "new",
      value: "New",
    },
  ],
};
