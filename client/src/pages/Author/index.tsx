import { useLoaderData } from "react-router-dom";
import { Card, CardHeader, Image } from "@nextui-org/react";

import { useAuth } from "src/contexts";
import { IUser } from "src/interfaces";

const Author = () => {
  const author = useLoaderData() as IUser;
  const { user } = useAuth();

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
          className="mx-auto w-72 rounded-t-large border-none bg-background p-1 drop-shadow-lg"
          shadow="none"
        >
          <CardHeader className="flex flex-col justify-center gap-2">
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
            <span
              className="-mt-1 cursor-pointer font-mono text-[0.5rem]"
              onClick={() => {
                window.location.href = mailtoLink;
              }}
            >
              {author.email}
            </span>
          </CardHeader>
        </Card>
      </div>
    </>
  );
};

export default Author;
