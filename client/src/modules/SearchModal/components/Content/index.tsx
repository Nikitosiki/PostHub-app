import { FC } from "react";
import { ModalBody } from "@nextui-org/react";

import { IPosts, ITags, IUsers } from "src/interfaces";
import Post from "src/modules/Post";
import Tag from "src/components/Tag";
import Author from "src/components/Author";

type ContentProps = {
  tags: ITags;
  users: IUsers;
  posts: IPosts;
};

const Content: FC<ContentProps> = ({ tags, users, posts }) => {
  return (
    <>
      <ModalBody className={`flex-none ${tags.length < 1 ? "hidden" : ""}`}>
        <p>Tags</p>
        <div className="flex flex-row gap-2">
          {tags.map((tag) => (
            <Tag tag={tag} />
          ))}
        </div>
      </ModalBody>
      <ModalBody className={`flex-none ${users.length < 1 ? "hidden" : ""}`}>
        <p>Users</p>
        <div className="flex flex-row gap-2">
          {users.map((user) => (
            <div className="rounded-full bg-background px-1 pr-3">
              {/* <div className="rounded-full bg-background px-2 py-1 pr-3"> */}
              <Author author={user} />
            </div>
          ))}
        </div>
      </ModalBody>
      <ModalBody className={`flex-none ${posts.length < 1 ? "hidden" : ""}`}>
        <p>Posts</p>
        <div className="flex flex-col gap-2">
          {posts.map((post) => (
            <Post
              contentHeight={50}
              tagsVisible={false}
              reactionVisible={false}
              post={post}
            />
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-20 w-full bg-gradient-to-b from-transparent to-background to-95%" />
      </ModalBody>
    </>
  );
};

export default Content;
