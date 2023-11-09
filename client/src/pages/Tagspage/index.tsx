import { Card, CardBody } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import Bigtag from "src/modules/Bigtag";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { getBigTags } from "src/api/preview";

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
                {getBigTags().map((tag) => (
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
