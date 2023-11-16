import { ITags } from "src/interfaces";
import { users } from "./users";

export const tags: ITags = [
  {
    id: 1,
    title: "Games",
    description:
      "Welcome to the world of computer games! Here you will find captivating reviews, the latest gaming industry news, game walkthrough tips, announcements of upcoming releases, and much more.",
    author: users[1],
    image_url:
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGdhbWV8ZW58MHx8MHx8fDA%3D",
    created_at: new Date(2023, 8, 11),
  },
  {
    id: 2,
    title: "Technology",
    description:
      "Explore the latest in technology trends, gadget reviews, software updates, and tech industry news. Stay informed about the ever-evolving world of technology.",
    author: users[2],
    image_url:
      "https://t4.ftcdn.net/jpg/03/08/69/75/360_F_308697506_9dsBYHXm9FwuW0qcEqimAEXUvzTwfzwe.jpg",
    created_at: new Date(2023, 8, 11),
  },
  {
    id: 3,
    title: "Science",
    description:
      "Dive into the fascinating realm of science. Learn about breakthrough discoveries, space exploration, environmental research, and the wonders of the natural world.",
    author: users[3],
    image_url:
      "https://img.freepik.com/free-vector/hand-drawn-science-education-background_23-2148499325.jpg",
    created_at: new Date(2023, 8, 11),
  },
  {
    id: 4,
    title: "Programming",
    description:
      "Become a coding pro! Find coding tutorials, programming language insights, and discussions on the latest trends and best practices in software development.",
    author: users[2],
    image_url:
      "https://thumbs.dreamstime.com/b/professional-development-programmer-working-programming-website-software-coding-technology-writing-codes-data-code-132331729.jpg",
    created_at: new Date(2023, 8, 11),
  },
  {
    id: 5,
    title: "Movies and TV Shows",
    description:
      "Discover the world of entertainment. Read reviews, catch up on the latest movie and TV show releases, and get behind-the-scenes insights into the film industry.",
    author: users[3],
    image_url:
      "https://wp.inews.co.uk/wp-content/uploads/2023/02/SEI_142615498.jpg?crop=4px%2C0px%2C1912px%2C1080px&resize=1200%2C675",
    created_at: new Date(2023, 8, 11),
  },
  {
    id: 6,
    title: "Health and Wellness",
    description:
      "Find tips for a healthy lifestyle, wellness advice, fitness routines, mental health discussions, and nutritional information for a balanced life.",
    author: users[6],
    image_url:
      "https://images.ctfassets.net/17o2epk8ivh7/2ZQTdBKFxvkLYhrtyeWOdg/5906eef24264641dc0d61974adfd9bfb/3840X2160_Health_and_wellness.jpg?h=1215&q=90&w=2160",
    created_at: new Date(2023, 8, 11),
  },
  {
    id: 7,
    title: "Travel",
    description:
      "Embark on a journey around the world! Get travel guides, tips for adventurous trips, destination reviews, and cultural insights.",
    author: users[4],
    image_url:
      "https://img.freepik.com/free-photo/travel-concept-with-landmarks_23-2149153256.jpg",
    created_at: new Date(2023, 8, 11),
  },
  {
    id: 8,
    title: "Art and Design",
    description:
      "Immerse yourself in the world of art and design. Explore creative inspirations, design trends, artist showcases, and discussions on various art forms.",
    author: users[8],
    image_url:
      "https://www.modernsculptureartists.com/wp-content/uploads/2019/08/what-is-design.jpg",
    created_at: new Date(2023, 8, 11),
  },
  {
    id: 9,
    title: "Business and Finance",
    description:
      "Stay updated on the world of business and finance. Get insights, investment tips, market trends, and advice for entrepreneurs and professionals.",
    author: users[5],
    image_url:
      "https://d1whtlypfis84e.cloudfront.net/guides/wp-content/uploads/2018/03/02020623/business-finance.jpg",
    created_at: new Date(2023, 8, 11),
  },
  {
    id: 10,
    title: "Food and Cooking",
    description:
      "Satisfy your culinary cravings! Find recipes, cooking techniques, food trends, and discussions on all things related to gastronomy.",
    author: users[9],
    image_url:
      "https://i0.wp.com/blog.frontiersin.org/wp-content/uploads/2017/07/frontiers-in-ict-food-bridging.jpg?fit=1000%2C665&ssl=1",
    created_at: new Date(2023, 8, 11),
  },
  {
    id: 11,
    title: "Shounen",
    description:
      "A tag for anime targeted towards young male audiences, typically featuring action-packed storylines.",
    author: users[2],
    image_url: null,
    created_at: new Date(),
  },
  {
    id: 12,
    title: "Shoujo",
    description:
      "A tag for anime primarily aimed at young female viewers, often focusing on romance and relationships.",
    author: users[1],
    image_url: null,
    created_at: new Date(),
  },
  {
    id: 13,
    title: "Mecha",
    description:
      "A tag for anime featuring giant robots and mechanical suits as a central theme.",
    author: users[11],
    image_url: null,
    created_at: new Date(),
  },
  {
    id: 14,
    title: "Slice of Life",
    description:
      "A tag for anime focusing on mundane, everyday experiences, often with a touch of realism.",
    author: users[7],
    image_url: null,
    created_at: new Date(),
  },
  {
    id: 15,
    title: "Fantasy",
    description:
      "A tag for anime featuring magical and fantastical elements in their storylines.",
    author: users[5],
    image_url: null,
    created_at: new Date(),
  },
  {
    id: 16,
    title: "Psychological",
    description:
      "A tag for anime focusing on the human psyche, often delving into complex mental and emotional themes.",
    author: users[9],
    image_url: null,
    created_at: new Date(),
  },
  {
    id: 17,
    title: "Horror",
    description:
      "A tag for anime designed to evoke feelings of fear and suspense through terrifying storylines.",
    author: users[1],
    image_url: null,
    created_at: new Date(),
  },
  {
    id: 18,
    title: "Adventure",
    description:
      "A tag for anime featuring thrilling journeys and expeditions in search of excitement and discovery.",
    author: users[2],
    image_url: null,
    created_at: new Date(),
  },
  {
    id: 19,
    title: "Comedy",
    description:
      "A tag for anime intended to amuse and entertain through humor and lighthearted storytelling.",
    author: users[5],
    image_url: null,
    created_at: new Date(),
  },
  {
    id: 20,
    title: "Sports",
    description:
      "A tag for anime centered around various sports, showcasing competitions and athletic endeavors.",
    author: users[10],
    image_url: null,
    created_at: new Date(),
  },
  {
    id: 21,
    title: "Bio",
    description:
      "This is your bio.",
    author: users[0],
    image_url: null,
    created_at: new Date(),
  },
];