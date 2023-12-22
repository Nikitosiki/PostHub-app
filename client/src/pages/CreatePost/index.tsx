import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { BsStars } from "react-icons/bs";

import { createPost } from "src/services/supabase/post";
import { useAuth } from "src/contexts";
import { IPost, ITag, ITags } from "src/interfaces";
import Editor from "src/components/Editor";
import AddTag from "src/components/AddTag";
import TagPrev from "src/components/TagPrev";
import Tag from "src/components/Tag";

import { CreatePostSchema, CreatePostSchemaType } from "src/validations";
import InputTitle from "./components/InputTitle";
import ErrorMessage from "src/components/ErrorMessage";
import { createTag, getTagIdByTitle } from "src/services/supabase/tag";
import { changeTagsOnPost } from "src/services/supabase/postTags";
import { NavigatePostPage } from "src/paths";

const CreatePost: FC<{ editPostData?: IPost }> = ({ editPostData }) => {
  const [isLoading, setLoading] = useState(false);
  const [tags, setTags] = useState<ITags>([]);
  const [newTags, setNewTags] = useState<string[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  const addTag = (value: ITag | string) => {
    // Type checking and duplication elimination
    if (typeof value === "string") {
      !newTags.includes(value) && setNewTags([...newTags, value]);
    } else
      !tags.some((tag) => tag.id === value.id) && setTags([...tags, value]);
  };

  useEffect(() => {
    editPostData?.tags && setTags(editPostData?.tags);
  }, []);

  // -------- Validations -----------
  const form = useForm<CreatePostSchemaType>({
    resolver: yupResolver(CreatePostSchema),
    defaultValues: {
      title: editPostData?.title,
      content: editPostData?.content,
    },
  });

  const onSubmit = async (submitData: CreatePostSchemaType) => {
    setLoading(true);

    const idCreatedTags = await Promise.all(
      newTags.map(async (newTag) => {
        const { data } = await createTag({
          title: newTag,
          author_id: user?.id || "",
        });

        if (!data || data.length < 1) {
          return await getTagIdByTitle(newTag);
        }

        return data[0].id;
      }),
    );

    const IdTags = tags
      .map((tag) => tag.id)
      .concat(
        idCreatedTags.filter((item) => typeof item === "string") as string[],
      );

    const postResult = await createPost(
      editPostData
        ? {
            id: editPostData.id,
            title: submitData.title,
            content: submitData.content,
            author_id: user?.id || "",
          }
        : {
            title: submitData.title,
            content: submitData.content,
            author_id: user?.id || "",
          },
    );
    if (postResult.error || !postResult.data || postResult.data.length < 1) {
      form.setError("title", {
        message: "Failed to create post",
      });
      console.log(postResult.error?.code, postResult.error?.message);
      setLoading(false);
      return;
    }

    const postId = postResult.data[0].id;
    await changeTagsOnPost(IdTags, postId);

    navigate(NavigatePostPage(postId));
    setLoading(false);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <div className="sm:p-2">
        <Card
          className="w-full rounded-t-none border-none bg-background drop-shadow-lg hover:drop-shadow-xl sm:rounded-t-large sm:p-1"
          shadow="none"
        >
          <CardHeader className="flex flex-col">
            <h1 className="w-full text-left text-lg">
              {editPostData ? "Edit post" : "Create post"}
            </h1>
          </CardHeader>

          {/* ------- Input Title  ------- */}
          <CardBody>
            <Controller
              name="title"
              control={form.control}
              render={({ field }) => (
                <InputTitle
                  type="title"
                  defaultValue={editPostData?.title}
                  isDisabled={isLoading}
                  errorMessage={form.formState.errors.title?.message}
                  {...field}
                />
              )}
            />
          </CardBody>

          {/* ------ Edit Description  ------ */}
          <CardBody>
            <Controller
              name="content"
              control={form.control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Editor
                  value={value}
                  initialValue={editPostData?.content}
                  onEditorChange={onChange}
                  onBlur={onBlur}
                  disabled={isLoading}
                />
              )}
            />
            <ErrorMessage message={form.formState.errors.content?.message} />
          </CardBody>

          {/* ---------- Tags ---------- */}
          <CardBody>
            <div className="flex flex-row flex-wrap items-center justify-start gap-2">
              {tags.map((value) => (
                <Tag
                  key={value.title}
                  tag={value}
                  disableLink
                  isDisabled={isLoading}
                  onClose={() => {
                    tags.splice(tags.indexOf(value), 1);
                    setTags([...tags]);
                  }}
                />
              ))}
              {newTags.map((value) => (
                <TagPrev
                  key={value}
                  tagName={value}
                  isDisabled={isLoading}
                  onClose={() => {
                    newTags.splice(newTags.indexOf(value), 1);
                    setNewTags([...newTags]);
                  }}
                />
              ))}
              <AddTag add={addTag} isDisabled={isLoading} />
            </div>
          </CardBody>
          {newTags.length > 0 && (
            <CardBody>
              <div className="inline-flex items-center justify-end text-xs text-primary-400">
                <div className="pb-1">
                  <BsStars />
                </div>
                <span> - these tags will be created automatically *</span>
              </div>
            </CardBody>
          )}

          {/* ---------- Footer ---------- */}
          <CardFooter className="justify-end">
            <div className="flex flex-row gap-4">
              <Button onClick={() => history.back()}>Cancel</Button>
              <Button color="primary" type="submit" isLoading={isLoading}>
                Public
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
};

export default CreatePost;
