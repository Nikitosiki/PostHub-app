import { FC, ReactNode, useEffect, useState } from "react";

import { IComment, IPost, IReactions, IUser } from "src/interfaces";
import {
  addReactionToPost,
  removeMyReactionToPost,
  getMyReactionIdToPost,
  getReactionsToPost,
} from "src/services/supabase/postReactions";
import {
  addReactionToComment,
  removeMyReactionToComment,
  getMyReactionIdToComment,
  getReactionsToComment,
} from "src/services/supabase/commentReactions";
import { toReactionViews } from "src/utils";
import AddReactionButton from "src/components/AddReactionButton";
import Reaction from "src/components/Reaction";
import ShortReactions from "src/components/ShortReactions";

type ReactionsProps = {
  user: IUser | null;
  dependence: IPost | IComment;
  variant: "full" | "short" | "comment";
  children?: ReactNode;
};

const Reactions: FC<ReactionsProps> = ({
  user,
  dependence,
  variant = "full",
  children,
}) => {
  const [reaction, setReaction] = useState<IReactions>(dependence.reactions);
  const [selectReaction, setSelectReaction] = useState<number | null>(null);

  useEffect(() => {
    if (!user) return;

    if ("title" in dependence)
      // this is IPost
      getMyReactionIdToPost(user.id, dependence.id).then(setSelectReaction);

    if ("path" in dependence)
      // this is IComment
      getMyReactionIdToComment(user.id, dependence.id).then(setSelectReaction);
  }, [user, reaction]);

  const handlerReaction = async (reactionId: number) => {
    if ("title" in dependence)
      // this is IPost
      await servicePostReaction(reactionId, dependence);

    if ("path" in dependence)
      // this is IComment
      await serviceCommentReaction(reactionId, dependence);
  };

  async function servicePostReaction(reactionId: number, post: IPost) {
    if (!user) return;

    if (reactionId === selectReaction) {
      setSelectReaction(null);
      await removeMyReactionToPost({
        post_id: post.id,
        user_id: user?.id,
      });
    } else {
      setSelectReaction(reactionId);
      await addReactionToPost({
        post_id: post.id,
        user_id: user?.id,
        reaction_id: reactionId,
      });
    }

    await getReactionsToPost(post.id).then((react) => {
      setReaction(react);
    });
  }

  async function serviceCommentReaction(reactionId: number, comment: IComment) {
    if (!user) return;

    if (reactionId === selectReaction) {
      setSelectReaction(null);
      await removeMyReactionToComment({
        comment_id: comment.id,
        user_id: user?.id,
      });
    } else {
      setSelectReaction(reactionId);
      await addReactionToComment({
        comment_id: comment.id,
        user_id: user?.id,
        reaction_id: reactionId,
      });
    }

    await getReactionsToComment(comment.id).then((react) => {
      setReaction(react);
    });
  }

  const fullView = (
    <div className="flex flex-row gap-2">
      {toReactionViews(reaction).map((reaction) => (
        <Reaction
          reaction={reaction}
          isSelected={selectReaction === reaction.id}
          onClick={handlerReaction}
        />
      ))}

      {user && <AddReactionButton onClick={handlerReaction} />}
      {children}
    </div>
  );

  const commentView = (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        {toReactionViews(reaction).map((reaction) => (
          <Reaction
            reaction={reaction}
            isSelected={selectReaction === reaction.id}
            onClick={handlerReaction}
            className="h-6 gap-1 pl-1 text-sm"
          />
        ))}
      </div>

      <div className="flex flex-row gap-2">
      {user && (
        <AddReactionButton
          onClick={handlerReaction}
          classNameButton="h-6 w-6"
        />
      )}
      {children}
      </div>
    </div>
  );

  const shortView = (
    <div className="flex flex-row gap-2">
    <AddReactionButton
      onClick={handlerReaction}
      // contentTrigger={<ShortReactions reactions={reaction} />}
    />
    {children}
    </div>
  );

  return variant === "full"
    ? fullView
    : variant === "short"
    ? shortView
    : commentView;
};

export default Reactions;
