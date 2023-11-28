import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@nextui-org/react";

import { createPost } from "src/api/supabase/post";
import { useAuth } from "src/contexts";
import { ITag, ITags } from "src/interfaces";
import Editor from "src/components/Editor";
import AddTag from "src/components/AddTag";
import TagPrev from "src/components/TagPrev";
import Tag from "src/components/Tag";

const CreatePost = () => {
  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<ITags>([]);
  const [newTags, setNewTags] = useState<string[]>([]);

  const addTag = (value: ITag | string) => {
    // Type checking and duplication elimination
    if (typeof value === "string") {
      !newTags.includes(value) && setNewTags([...newTags, value]);
    } else
      !tags.some((tag) => tag.id === value.id) && setTags([...tags, value]);
  };

  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="sm:p-2">
      <Card
        className="w-full rounded-t-none border-none bg-background drop-shadow-lg hover:drop-shadow-xl sm:rounded-t-large sm:p-1"
        shadow="none"
      >
        <CardHeader className="flex flex-col">
          <h1 className="w-full text-left text-lg">Create post</h1>
        </CardHeader>

        {/* ------- Input Title  ------- */}
        <CardBody>
          <Input
            variant="bordered"
            placeholder="Title"
            classNames={{
              input: "text-lg",
              inputWrapper: "shadow-none", //border-default-200/75 group-data-[focus=true]:border-default-200/75
            }}
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-small text-default-400">
                  {title.length}/300
                </span>
              </div>
            }
            value={title}
            onValueChange={setTitle}
          />
        </CardBody>

        {/* ------ Edit Description  ------ */}
        <CardBody>
          <Editor
            value={description}
            onEditorChange={(value: string) => {
              setDescription(value);
            }}
          />
        </CardBody>

        {/* ---------- Tags ---------- */}
        <CardBody>
          <div className="flex flex-row flex-wrap items-center justify-start gap-2">
            {tags.map((value) => (
              <Tag key={value.title} tag={value} />
            ))}
            {newTags.map((value) => (
              <TagPrev key={value} tagName={value} />
            ))}
            <AddTag add={addTag} />
          </div>
        </CardBody>

        {/* ---------- Footer ---------- */}
        <CardFooter className="justify-end">
          <div className="flex flex-row gap-4">
            <Button onClick={() => history.back()}>Cancel</Button>
            <Button
              color="primary"
              onClick={() => {
                createPost({
                  author_id: user ? user.id : "",
                  title: title,
                  content: description,
                }).then(({ error }) => {
                  if (!error) navigate("/news");
                  else console.log(error);
                });
              }}
            >
              Public
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreatePost;
