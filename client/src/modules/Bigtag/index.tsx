import { FC } from "react";
import { Card, CardFooter, Avatar, Image } from "@nextui-org/react";
import { Link } from "react-router-dom";

import { ITag } from "src/interfaces";

const Bigtag: FC<{ tag: ITag }> = ({ tag }) => {
  return (
    <>
      <Card
        className="col-span-12 h-[180px] w-full border-none drop-shadow-lg hover:drop-shadow-xl sm:col-span-4"
        shadow="none"
        key={tag.id}
        isPressable
      >
        <Link to={`/tag/${tag.id}`} className="h-full w-full">
          {tag.image_path !== null ? (
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 h-full w-full object-cover"
              src={tag.image_path}
            />
          ) : (
            <div className="z-0 h-full w-full bg-primary object-cover" />
          )}
          <div className="absolute inset-x-0 -bottom-[1px] h-24 bg-gradient-to-b from-transparent to-background-500 to-95%" />
          <CardFooter className="absolute bottom-0 z-10 flex-col !items-start">
            <p className="text-tiny font-bold uppercase text-white ">
              {tag.title}
            </p>
            <h4 className="w-full truncate text-large font-medium text-white">
              {tag.description}
            </h4>
            <div className="flex items-center gap-2">
              <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                className="h-6 w-6 text-tiny"
              />
              <p className="text-tiny text-white">{tag.author?.name}</p>
            </div>
          </CardFooter>
        </Link>
      </Card>
    </>
  );
};

export default Bigtag;
