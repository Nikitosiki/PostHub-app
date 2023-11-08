import { FC } from "react";
import {
  Card,
  CardFooter,
  Avatar,
  Image,
} from "@nextui-org/react";
import { ITag } from "src/interfaces";

export interface ITagProps {
  tag: ITag;
  onClick: () => void;
}

const Bigtag: FC<ITagProps> = ({ tag, onClick }) => {
  return (
    <>
      <Card
        className="col-span-12 h-[180px] border-none drop-shadow-lg hover:drop-shadow-xl sm:col-span-4"
        shadow="none"
        key={tag.id}
        isPressable
        onPress={onClick}
      >
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 h-full w-full object-cover"
          src={tag.image_url}
        />
        <div className="absolute inset-x-0 -bottom-[1px] h-24 bg-gradient-to-b from-transparent to-background-500 to-95%"></div>
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
            <p className="text-tiny text-white">Nikita Savenko</p>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default Bigtag;
