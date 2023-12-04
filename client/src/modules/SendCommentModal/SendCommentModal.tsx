import { FC } from "react";

import { IUser } from "src/interfaces";

type SendCommentProps = {
  user: IUser | null;
};

const SendCommentModal: FC<SendCommentProps> = ({ user }) => {
  // const [isCommentFormVisible, setCommentFormVisibility] = useState(false);

  return (
    <>
      {user}
      {/* ---------- Comment editor ---------- */}
      {/* {isCommentFormVisible && (
            <CardBody>
              <p className="text-sm">
                Comment as{" "}
                <Link
                  className="text-primary"
                  to={NavigateAuthorPage(user?.id ?? "")}
                >
                  {user?.name}
                </Link>
              </p>
              <EditorComment />
            </CardBody>
          )} */}
    </>
  );
};

export default SendCommentModal;
