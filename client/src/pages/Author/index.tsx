import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { MdOutlineEdit } from "react-icons/md";

import { useAuth } from "src/contexts";
import { IUser } from "src/interfaces";
import { getCountPostsByAuthor } from "src/services/supabase/post";
import { getCountTagsByAuthor } from "src/services/supabase/tags";
import { getCountCommentsByAuthor } from "src/services/supabase/comments";
import ProfileEditModal from "src/modules/ProfileEditModal";
import { motion } from "framer-motion";

const Author = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [countPosts, setCountPosts] = useState(0);
  const [countTags, setCountTags] = useState(0);
  const [countComments, setCountComments] = useState(0);

  const author = useLoaderData() as IUser;
  const { user } = useAuth();

  useEffect(() => {
    getCountPostsByAuthor(author.id).then(setCountPosts);
    getCountTagsByAuthor(author.id).then(setCountTags);
    getCountCommentsByAuthor(author.id).then(setCountComments);
  }, []);

  const subject = "Greetings from PostHub!";
  const body =
    `Hi, ${author.name}!\n\n` +
    (user ? `My name is ${user?.name}, and ` : "") +
    `I came across your profile on PostHub. ` +
    (user
      ? `I wanted to reach out and connect. ` +
        `Let's chat!\n\nBest regards,\n${user?.name}`
      : "");

  const mailtoLink = `mailto:${author.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;

  return (
    <>
      <div className="p-2">
        <Card
          className={`z-10 mx-auto w-60 rounded-t-large border-none bg-background p-4 drop-shadow-lg ${
            author.id === user?.id && "rounded-b-none"
          }`}
          shadow="none"
        >
          <CardHeader className="flex flex-col justify-center gap-2">
            <div className="absolute right-3 top-2 cursor-default">
              <Tooltip
                closeDelay={100}
                content="Only active users receive it"
                classNames={{ content: "text-xs" }}
              >
                <span className="material-symbols-rounded text-lg text-primary">
                  verified
                </span>
              </Tooltip>
            </div>
            <Image
              isZoomed
              isBlurred
              width={96}
              radius="full"
              src={author.image_url ?? ""}
              alt={(author.name ?? "Author's") + " avatar"}
              classNames={{ blurredImg: "m-5" }}
            />
            <b>{author.name}</b>
            {false && (
              <span
                className="-mt-1 cursor-pointer font-mono text-[0.5rem]"
                onClick={() => {
                  window.location.href = mailtoLink;
                }}
              >
                {author.email}
              </span>
            )}
            {/* <span className="pr-full w-full text-[0.66rem] text-default-foreground/50">
              hot post 🔥
            </span>
            <span className="-mt-2 text-xs">
              Doggo has to be comfy too. Doggo has to be comfy too. Doggo has to
              be comfy too.
            </span> */}
          </CardHeader>

          <CardBody className="text-xs">
            <div className="flex justify-evenly">
              <div className="flex flex-col items-center">
                <span className="material-symbols-rounded text-xl">news</span>
                <span>{countPosts}</span>
                {/* <span className="text-default-500">posts</span> */}
              </div>
              <div className="flex flex-col items-center">
                <span className="material-symbols-rounded text-xl">
                  chat_bubble
                </span>
                <span>{countComments}</span>
                {/* <span className="text-default-500">comments</span> */}
              </div>
              <div className="flex flex-col items-center ">
                <span className="material-symbols-rounded text-xl">style</span>
                <span>{countTags}</span>
                {/* <span className="text-default-500">tags</span> */}
              </div>
            </div>
          </CardBody>
        </Card>

        {author.id === user?.id && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "tween", stiffness: 100 }} //"spring"
            className="z-0"
          >
            <Card
              className="mx-auto w-60 rounded-t-none border-none bg-primary drop-shadow-lg"
              shadow="none"
            >
              <Button
                className="flex cursor-pointer flex-row items-center justify-center gap-2 rounded-none bg-primary text-primary-foreground"
                onClick={onOpen}
              >
                <MdOutlineEdit />
                <span>Edit</span>
              </Button>
              <ProfileEditModal isOpen={isOpen} onOpenChange={onOpenChange} />
            </Card>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Author;
