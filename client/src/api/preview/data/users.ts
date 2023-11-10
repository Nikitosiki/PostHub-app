import { IUsers } from "src/interfaces";

export const users: IUsers = [
  {
    id: 1,
    name: "Nikita Savenko",
    role: "user",
    age: 20,
    email: "nikita@gmail.com",
    gender: "male",
    image_url:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    reg_date: new Date(2023, 8, 1),
  },
  {
    id: 2,
    name: "Satoshi Yamamoto",
    role: "Anime Critic",
    age: 32,
    email: "satoshi@example.com",
    gender: "male",
    image_url: null,
    reg_date: new Date("2018-09-10"),
  },
  {
    id: 3,
    name: "Yuki Tanaka",
    role: "Manga Artist",
    age: 25,
    email: "yuki@example.com",
    gender: "female",
    image_url: null,
    reg_date: new Date("2019-11-25"),
  },
  {
    id: 4,
    name: "Hiroshi Sato",
    role: "Anime Enthusiast",
    age: 27,
    email: "hiroshi@example.com",
    gender: "male",
    image_url: null,
    reg_date: new Date("2020-04-30"),
  },
  {
    id: 5,
    name: "Aya Nakamura",
    role: "Anime Blogger",
    age: 29,
    email: "aya@example.com",
    gender: null,
    image_url: null,
    reg_date: new Date("2021-08-15"),
  },
  {
    id: 6,
    name: "Takumi Ishikawa",
    role: "Anime Illustrator",
    age: 26,
    email: "takumi@example.com",
    gender: null,
    image_url: null,
    reg_date: new Date("2022-02-20"),
  },
  {
    id: 7,
    name: "Haruka Nakamura",
    role: "Anime Psychologist",
    age: 35,
    email: "haruka@example.com",
    gender: "Female",
    image_url: null,
    reg_date: new Date("2017-06-12"),
  },
  {
    id: 8,
    name: "Takashi Suzuki",
    role: "Horror Enthusiast",
    age: 30,
    email: "takashi@example.com",
    gender: "male",
    image_url: null,
    reg_date: new Date("2019-02-18"),
  },
  {
    id: 9,
    name: "Riko Tanaka",
    role: "Anime Explorer",
    age: 28,
    email: "riko@example.com",
    gender: null,
    image_url: null,
    reg_date: new Date("2020-11-09"),
  },
  {
    id: 10,
    name: "Kenji Sato",
    role: "Comic Relief Expert",
    age: 31,
    email: "kenji@example.com",
    gender: null,
    image_url: null,
    reg_date: new Date("2021-04-25"),
  },
  {
    id: 11,
    name: "Ayumi Honda",
    role: "Sports Enthusiast",
    age: 27,
    email: "ayumi@example.com",
    gender: null,
    image_url: null,
    reg_date: new Date("2022-09-30"),
  },
];
