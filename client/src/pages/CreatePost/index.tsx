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
  const [inputLength, setInputLength] = useState<number>(0);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputLength(event.currentTarget.value.length);
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
            onChange={handleInputChange}
            variant="bordered"
            label="Title"
            classNames={{
              input: "",
              inputWrapper: "shadow-none border-default-200/75",
            }}
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-small text-default-400">
                  {inputLength}/300
                </span>
              </div>
            }
          />
        </CardBody>
        <CardBody>
          <Editor />
        </CardBody>
        <CardFooter className="justify-end">
          <div className="flex flex-row gap-4">
            <Button>Cancel</Button>
            <Button color="primary">Public</Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default CreatePost;
