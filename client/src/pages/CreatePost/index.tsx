import { Card, CardBody, CardHeader, Divider, Input } from "@nextui-org/react";
import Editor from "src/components/Editor";

const CreatePost = () => {
  return (
    <>
      <Card
        className="w-full border-none bg-background p-1 drop-shadow-lg hover:drop-shadow-xl"
        shadow="none"
      >
        <CardHeader className="flex flex-col">
          <h1 className="w-full text-left text-lg">Create post</h1>
          <Divider className="my-2" />
        </CardHeader>
        <CardBody>
          <Input variant="bordered" label="Title" classNames={"input"} />
        </CardBody>
        <CardBody>
          <Editor />
        </CardBody>
      </Card>
    </>
  );
};

export default CreatePost;
