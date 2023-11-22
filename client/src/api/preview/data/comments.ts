import { IComments } from "src/interfaces";
import { users } from "./users";

export const comments: IComments = [
  {
    id: 1,
    content: "Great post! I really enjoyed reading it.",
    author: users[10],
    child_comments: null,
    created_at: new Date("2023-01-01T10:00:00Z"),
    updated_at: null,
  },
  {
    id: 2,
    content: "Interesting insights. Looking forward to more!",
    author: users[6],
    child_comments: null,
    created_at: new Date("2023-01-02T12:30:00Z"),
    updated_at: null,
  },
  {
    id: 3,
    content: "I have a question about the topic. Can you elaborate?",
    author: users[0],
    child_comments: [
      {
        id: 6,
        content:
          "This topic is fascinating! Would love to see more articles like this. I have a question about the topic. Can you elaborate?",
        author: users[2],
        child_comments: null,
        created_at: new Date("2023-01-06T08:45:00Z"),
        updated_at: null,
      },
      {
        id: 7,
        content: "I appreciate the depth of your analysis. Well done!",
        author: users[8],
        child_comments: [
          {
            id: 8,
            content:
              "Can't agree more with the points discussed. Insightful read!",
            author: users[0],
            child_comments: null,
            created_at: new Date("2023-01-08T14:15:00Z"),
            updated_at: null,
          },
        ],
        created_at: new Date("2023-01-07T11:20:00Z"),
        updated_at: null,
      },
    ],
    created_at: new Date("2023-01-03T15:45:00Z"),
    updated_at: null,
  },
  {
    id: 4,
    content: "Nice work! Keep it up.",
    author: users[5],
    child_comments: null,
    created_at: new Date("2023-01-04T18:20:00Z"),
    updated_at: new Date("2023-01-09T17:30:00Z"),
  },
  {
    id: 5,
    content: "I disagree with some points, but it's a well-written piece.",
    author: users[9],
    child_comments: [
      {
        id: 9,
        content:
          "I found a small typo in paragraph two. Otherwise, great article!",
        author: users[2],
        child_comments: null,
        created_at: new Date("2023-01-09T17:30:00Z"),
        updated_at: null,
      },
    ],
    created_at: new Date("2023-01-05T21:10:00Z"),
    updated_at: null,
  },
];
