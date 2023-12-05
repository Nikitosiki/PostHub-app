import { FC } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
} from "@nextui-org/react";
import { useMediaQuery } from "react-responsive";
import { UseDisclosureReturn } from "@nextui-org/use-disclosure";

import EditorComment from "src/components/EditorComment";
import { NavigateAuthorPage } from "src/paths";
import { IComment, IUser } from "src/interfaces";

type SendCommentProps = {
  user: IUser | null;
  postId: string;
  responseToComment?: IComment | null;
} & Pick<UseDisclosureReturn, "isOpen" | "onOpenChange">;

const SendCommentModal: FC<SendCommentProps> = ({
  user,
  // postId,
  responseToComment = null,
  isOpen,
  onOpenChange,
}) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 640px)" });
  // const [isLoading, setLoading] = useState(false);

  const closeAuthModal = () => {
    isOpen && onOpenChange();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        backdrop="opaque"
        hideCloseButton
        className="bg-background"
        size={isDesktop ? "3xl" : "full"}
      >
        <ModalContent>
          <ModalBody className="px-6 py-4">
            <p className="text-sm">
              Comment as{" "}
              <Link
                className="text-primary"
                to={NavigateAuthorPage(user?.id ?? "")}
              >
                {user?.name}
              </Link>
              {responseToComment && (
                <span className="text-sm">
                  , responding to{" "}
                  <Link
                    className="text-primary"
                    to={NavigateAuthorPage(
                      responseToComment.author?.id ?? "",
                    )}
                  >
                    {responseToComment.author?.name}
                  </Link>
                </span>
              )}
            </p>
            <EditorComment />
          </ModalBody>
          <ModalBody className="pb-4">
            <div className="flex flex-row justify-end gap-4">
              <Button onClick={() => closeAuthModal()}>Cancel</Button>
              <Button color="primary" type="submit" >
                Public
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SendCommentModal;
