import { useState, useRef, useEffect } from "react";

import { Button, Card, CardHeader, CardBody } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { ITags } from "src/interfaces";
import Bigtag from "src/modules/Bigtag";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const bigTags: ITags = [
  {
    id: 1,
    title: "Games",
    description:
      "Welcome to the world of computer games! Here you will find captivating reviews, the latest gaming industry news, game walkthrough tips, announcements of upcoming releases, and much more.",
    imageUrl:
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGdhbWV8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 2,
    title: "Technology",
    description:
      "Explore the latest in technology trends, gadget reviews, software updates, and tech industry news. Stay informed about the ever-evolving world of technology.",
    imageUrl:
      "https://t4.ftcdn.net/jpg/03/08/69/75/360_F_308697506_9dsBYHXm9FwuW0qcEqimAEXUvzTwfzwe.jpg",
  },
  {
    id: 3,
    title: "Science",
    description:
      "Dive into the fascinating realm of science. Learn about breakthrough discoveries, space exploration, environmental research, and the wonders of the natural world.",
    imageUrl:
      "https://img.freepik.com/free-vector/hand-drawn-science-education-background_23-2148499325.jpg",
  },
  {
    id: 4,
    title: "Programming",
    description:
      "Become a coding pro! Find coding tutorials, programming language insights, and discussions on the latest trends and best practices in software development.",
    imageUrl:
      "https://thumbs.dreamstime.com/b/professional-development-programmer-working-programming-website-software-coding-technology-writing-codes-data-code-132331729.jpg",
  },
  {
    id: 5,
    title: "Movies and TV Shows",
    description:
      "Discover the world of entertainment. Read reviews, catch up on the latest movie and TV show releases, and get behind-the-scenes insights into the film industry.",
    imageUrl:
      "https://wp.inews.co.uk/wp-content/uploads/2023/02/SEI_142615498.jpg?crop=4px%2C0px%2C1912px%2C1080px&resize=1200%2C675",
  },
  {
    id: 6,
    title: "Health and Wellness",
    description:
      "Find tips for a healthy lifestyle, wellness advice, fitness routines, mental health discussions, and nutritional information for a balanced life.",
    imageUrl:
      "https://images.ctfassets.net/17o2epk8ivh7/2ZQTdBKFxvkLYhrtyeWOdg/5906eef24264641dc0d61974adfd9bfb/3840X2160_Health_and_wellness.jpg?h=1215&q=90&w=2160",
  },
  {
    id: 7,
    title: "Travel",
    description:
      "Embark on a journey around the world! Get travel guides, tips for adventurous trips, destination reviews, and cultural insights.",
    imageUrl:
      "https://img.freepik.com/free-photo/travel-concept-with-landmarks_23-2149153256.jpg",
  },
  {
    id: 8,
    title: "Art and Design",
    description:
      "Immerse yourself in the world of art and design. Explore creative inspirations, design trends, artist showcases, and discussions on various art forms.",
    imageUrl:
      "https://www.modernsculptureartists.com/wp-content/uploads/2019/08/what-is-design.jpg",
  },
  {
    id: 9,
    title: "Business and Finance",
    description:
      "Stay updated on the world of business and finance. Get insights, investment tips, market trends, and advice for entrepreneurs and professionals.",
    imageUrl:
      "https://d1whtlypfis84e.cloudfront.net/guides/wp-content/uploads/2018/03/02020623/business-finance.jpg",
  },
  {
    id: 10,
    title: "Food and Cooking",
    description:
      "Satisfy your culinary cravings! Find recipes, cooking techniques, food trends, and discussions on all things related to gastronomy.",
    imageUrl:
      "https://i0.wp.com/blog.frontiersin.org/wp-content/uploads/2017/07/frontiers-in-ict-food-bridging.jpg?fit=1000%2C665&ssl=1",
  },
];

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

function Tagspage() {
  const navigate = useNavigate();

  const handleTagClick = (tagId: number) => {
    navigate(`/tag/${tagId}`);
  };

  return (
    <>
      <div className="container mx-auto p-2">
        <div className="flex flex-col gap-6">
          <Card
            className="border-none bg-background drop-shadow-lg hover:drop-shadow-xl"
            shadow="none"
          >
            <CardBody className="p-0">
              <Carousel responsive={responsive} infinite={true}>
                {bigTags.map((tag) => (
                  <div className="m-2">
                    <Bigtag
                      key={tag.id}
                      tag={tag}
                      onClick={() => handleTagClick(tag.id)}
                    />
                  </div>
                ))}
              </Carousel>
            </CardBody>
          </Card>

          <Card
            className="border-none bg-background drop-shadow-lg hover:drop-shadow-xl"
            shadow="none"
          >
            dsadasdas
          </Card>
        </div>
      </div>
    </>
  );
}

export default Tagspage;
