import { useLoaderData } from "react-router-dom";
import { Card, CardHeader, Image, Tooltip } from "@nextui-org/react";

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
          className="mx-auto w-60 rounded-t-large border-none bg-background p-4 drop-shadow-lg"
          shadow="none"
        >
          <CardHeader className="flex flex-col justify-center gap-2">
            <div className="absolute right-3 top-2 cursor-default">
              <Tooltip
                closeDelay={100}
                content="Only active users receive it"
                classNames={{ content: "text-xs" }}
              >
                <span className="material-symbols-rounded text-base text-primary">
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
        </Card>
      </div>
    </>
  );
};

export default Author;
