import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Modal, ModalBody, ModalContent } from "@nextui-org/react";
import { useMediaQuery } from "react-responsive";
import { UseDisclosureReturn } from "@nextui-org/use-disclosure";

import EditorComment from "src/components/EditorComment";
import { NavigateAuthorPage } from "src/paths";
import { IComment, IUser } from "src/interfaces";
import { CommentSchema, CommentSchemaType } from "src/validations";
import ErrorMessage from "src/components/ErrorMessage";
import {
  createComment,
  updateCommentById,
} from "src/services/supabase/comments";

interface ICreateNewComment {
  postId: string;
  responseToComment?: IComment | null;
}

interface IEditYourComment {
  editCommentId: number;
  content: string;
}

type SendCommentProps = {
  user: IUser | null;
  action: ICreateNewComment | IEditYourComment;
} & Pick<UseDisclosureReturn, "isOpen" | "onOpenChange">;

const SendCommentModal: FC<SendCommentProps> = ({
  user,
  action,
  isOpen,
  onOpenChange,
}) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 640px)" });
  const [isLoading, setLoading] = useState(false);
  const defaultContent = "content" in action ? action.content : undefined;
  const [content, setContent] = useState<string | undefined>(defaultContent);

  const closeAuthModal = () => {
    isOpen && onOpenChange();
  };

  // console.log("123", defaultContent, "das", content)

  const form = useForm<CommentSchemaType>(
    defaultContent === ""
    ? {
        resolver: yupResolver(CommentSchema),
      }
    : {
        defaultValues: { content: defaultContent },
        resolver: yupResolver(CommentSchema),
      },
  );

  const onSubmit = async (submitData: CommentSchemaType) => {
    setLoading(true);
    if (!user) {
      form.setError("content", {
        message: "Only authorized users can leave comments",
      });
      return;
    }

    if ("editCommentId" in action) {
      if (await updateCommentById(action.editCommentId, submitData.content)) {
        setContent(undefined);
        closeAuthModal();
        setLoading(false);
        location.reload();
      } else
        form.setError("content", {
          message: "Failed to edit comment",
        });
    } else {
      const { error } = await createComment({
        content: submitData.content,
        author_id: user?.id,
        post_id: action.postId,
        parent_comment_id: action.responseToComment?.id,
      });

      if (error) {
        form.setError("content", {
          message: error?.message,
        });
      } else {
        setContent(undefined);
        closeAuthModal();
        setLoading(false);
        location.reload();
      }
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        backdrop="opaque"
        hideCloseButton
        isDismissable={false}
        className="bg-background"
        size={isDesktop ? "3xl" : "full"}
      >
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <ModalContent>
            <ModalBody className="flex-none px-6 py-4">
              {"editCommentId" in action ? (
                <p className="text-sm">
                  Edit as{" "}
                  <Link
                    className="text-primary"
                    to={NavigateAuthorPage(user?.id ?? "")}
                  >
                    {user?.name}
                  </Link>
                </p>
              ) : (
                <p className="text-sm">
                  Comment as{" "}
                  <Link
                    className="text-primary"
                    to={NavigateAuthorPage(user?.id ?? "")}
                  >
                    {user?.name}
                  </Link>
                  {action.responseToComment && (
                    <span className="text-sm">
                      , responding to{" "}
                      <Link
                        className="text-primary"
                        to={NavigateAuthorPage(
                          action.responseToComment.author?.id ?? "",
                        )}
                      >
                        {action.responseToComment.author?.name}
                      </Link>
                    </span>
                  )}
                </p>
              )}
              <Controller
                name="content"
                control={form.control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <EditorComment
                    value={content ?? value ?? ""} // content ?? ...
                    initialValue={defaultContent}
                    onEditorChange={(value) => {
                      setContent(value);
                      onChange(value);
                    }}
                    onBlur={onBlur}
                    disabled={isLoading}
                  />
                )}
              />
              <ErrorMessage message={form.formState.errors.content?.message} />
            </ModalBody>
            <ModalBody className="pb-4">
              <div className="flex flex-row justify-end gap-4">
                <Button onClick={() => closeAuthModal()}>Cancel</Button>
                {/* isDisabled={defaultContent === content} */}
                <Button color="primary" type="submit" isLoading={isLoading}>
                  Public
                </Button>
              </div>
            </ModalBody>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default SendCommentModal;
