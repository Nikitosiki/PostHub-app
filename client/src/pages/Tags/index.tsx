import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useEffect, useState } from "react";
// import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// import Bigtag from "src/modules/Bigtag";
import Tag from "src/components/Tag";
import { ITags } from "src/interfaces";
import { getNewTags } from "src/services/supabase/tags";

// const responsive = {
//   superLargeDesktop: {
//     // the naming can be any, depends on you.
//     breakpoint: { max: 4000, min: 3000 },
//     items: 5,
//   },
//   desktop: {
//     breakpoint: { max: 3000, min: 1024 },
//     items: 4,
//   },
//   tablet: {
//     breakpoint: { max: 1024, min: 464 },
//     items: 3,
//   },
//   mobile: {
//     breakpoint: { max: 464, min: 0 },
//     items: 2,
//   },
// };

const Tags = () => {
  const [newTags, setNewTags] = useState<ITags>([])

  useEffect(() => {
    getNewTags(1, 50).then(tags => setNewTags(tags))
  }, [])
  

  return (
    <>
      <div className="flex w-full flex-col gap-4 p-2">
        {/* <Card
          className="border-none bg-background drop-shadow-lg hover:drop-shadow-xl"
          shadow="none"
        >
          <CardBody className="p-0">
            <Carousel responsive={responsive} infinite={true}>
              {getBigTags().map((tag) => (
                <div key={tag.id} className="m-2">
                  <Bigtag tag={tag} />
                </div>
              ))}
            </Carousel>
          </CardBody>
        </Card> */}

        <Card
          className="border-none bg-background drop-shadow-lg hover:drop-shadow-xl"
          shadow="none"
        >
          <CardHeader>
            <p>All tags</p>
          </CardHeader>
          <CardBody className="flex-row flex-wrap gap-2">
            {newTags.map((tag) => (
                <Tag key={tag.id} tag={tag} />
            ))}
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Tags;
