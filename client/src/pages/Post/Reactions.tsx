import { FC, useEffect, useState } from "react";

import { IPost, IReactions, IUser } from "src/interfaces";
import {
  addReactionToPost,
  removeMyReactionToPost,
  getMyReactionIdToPost,
  getReactionsToPost,
} from "src/services/supabase/reactions";
import { toReactionViews } from "src/utils";
import AddReactionButton from "src/components/AddReactionButton";
import Reaction from "src/components/Reaction";

type ReactionsProps = {
  user: IUser | null;
  post: IPost;
};

const Reactions: FC<ReactionsProps> = ({ user, post }) => {
  const [reaction, setReaction] = useState<IReactions>(post.reactions);
  const [selectReaction, setSelectReaction] = useState<number | null>(null);

  useEffect(() => {
    if (!user) return;
    getMyReactionIdToPost(user.id, post.id).then(setSelectReaction);
  }, [user, reaction]);

  const handlerReaction = async (reactionId: number) => {
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
  };

  return (
    <div className="flex flex-row gap-2">
      {toReactionViews(reaction).map((reaction) => (
        <Reaction
          reaction={reaction}
          isSelected={selectReaction === reaction.id}
          onClick={handlerReaction}
        />
      ))}

      {user && <AddReactionButton onClick={handlerReaction} />}
    </div>
  );
};

export default Reactions;
