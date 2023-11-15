import { useState, ChangeEvent } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@nextui-org/react";

import Editor from "src/components/Editor";

const CreatePost = () => {
  const [titleLength, setTitleLength] = useState<number>(0);
  const [descriptionValue, setDescriptionValue] = useState<string>("");
  const [visiblePublic, setVisiblePublic] = useState<boolean>(false);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleLength(event.currentTarget.value.length);
  };

  const submitPost = (): void => {
    setVisiblePublic(true);
  };

  return (
    <>
      <Card
        className="w-full border-none bg-background p-1 drop-shadow-lg hover:drop-shadow-xl"
        shadow="none"
      >
        <CardHeader className="flex flex-col">
          <h1 className="w-full text-left text-lg">Create post</h1>
          {/* <Divider className="my-2" /> */}
        </CardHeader>
        <CardBody>
          <Input
            onChange={handleTitleChange}
            variant="bordered"
            label="Title"
            classNames={{
              input: "",
              inputWrapper: "shadow-none border-default-200/75",
            }}
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-small text-default-400">
                  {titleLength}/300
                </span>
              </div>
            }
          />
        </CardBody>
        <CardBody>
          <Editor
            value={descriptionValue}
            onEditorChange={(value: string) => {
              setDescriptionValue(value);
            }}
          />
        </CardBody>
        <CardFooter className="justify-end">
          <div className="flex flex-row gap-4">
            <Button>Cancel</Button>
            <Button
              color="primary"
              onClick={() => {
                submitPost();
              }}
            >
              Public
            </Button>
          </div>
        </CardFooter>
      </Card>

      {visiblePublic && (
        <Card
          className="mt-4 w-full border-none bg-background p-1 drop-shadow-lg hover:drop-shadow-xl"
          shadow="none"
        >
          <CardHeader>Public View:</CardHeader>
          <CardBody>
            <div dangerouslySetInnerHTML={{ __html: descriptionValue }} />
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default CreatePost;
