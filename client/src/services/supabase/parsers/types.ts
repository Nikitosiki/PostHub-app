import { Tables } from "src/interfaces";

export type TablePostPars = Tables<"posts"> & {
  users: TableUsersPars | null;
  tags: TableTagsPars[];
  reactions: Tables<"reactions">[];
};

export type TableTagsPars = Tables<"tags"> & {
  users: TableUsersPars | null;
};

export type TableUsersPars = Tables<"users"> & {
  genders: {
    name: string;
  } | null;
};

export type TableCommentsPars = Tables<"comments"> & {
  users: TableUsersPars | null;
};
