import { FC, useEffect, useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { UseDisclosureReturn } from "@nextui-org/use-disclosure";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";

import Content from "./components/Content";
import { IPosts, ITags, IUsers } from "src/interfaces";
import { searchPostsByTitle } from "src/services/supabase/post";
import { searchTagsByTitle } from "src/services/supabase/tags";
import { searchUsersByName } from "src/services/supabase/user";

type SearchModalProps = Pick<UseDisclosureReturn, "isOpen" | "onOpenChange">;
type ContentStateType = "noContent" | "content" | "notFound";

const SearchModal: FC<SearchModalProps> = ({ isOpen, onOpenChange }) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 640px)" });
  const location = useLocation();

  useEffect(() => {
    isOpen && onOpenChange();
  }, [location]);

  const [tags, setTags] = useState<ITags>([]);
  const [users, setUsers] = useState<IUsers>([]);
  const [posts, setPosts] = useState<IPosts>([]);

  const [isContentState, setContentState] =
    useState<ContentStateType>("noContent");
  const [isSearchQuery, setSearchQuery] = useState("");
  const [isSearchTimer, setSearchTimer] = useState<number | null>(null);

  const handleInputChange = (value: string) => {
    setSearchQuery(value);
    if (isSearchTimer) {
      clearTimeout(isSearchTimer);
    }
  };

  const handleSearch = () => {
    if (isSearchQuery) {
      searchPostsByTitle(isSearchQuery, 6).then((posts) => setPosts(posts));
      searchTagsByTitle(isSearchQuery, 10).then((tags) => setTags(tags));
      searchUsersByName(isSearchQuery, 10).then((users) => setUsers(users));
    } else setContentState("noContent");
  };

  useEffect(() => {
    if (isSearchQuery) {
      if (posts.length < 1 && tags.length < 1 && users.length < 1)
        setContentState("notFound");
      else setContentState("content");
    } else setContentState("noContent");
  }, [posts, tags, users]);

  useEffect(() => {
    const newTimer = window.setTimeout(() => {
      handleSearch();
    }, 500);
    setSearchTimer(newTimer);

    return () => {
      if (isSearchTimer) {
        clearTimeout(isSearchTimer);
      }
    };
  }, [isSearchQuery]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        backdrop="opaque"
        hideCloseButton
        content="inside"
        className="bg-background-100 sm:h-[90%]"
        size={isDesktop ? "3xl" : "full"}
      >
        <ModalContent>
          <ModalHeader className="flex flex-row items-center justify-between gap-3">
            <Input
              isClearable
              radius="full"
              placeholder="Type to search..."
              value={isSearchQuery}
              onValueChange={handleInputChange}
              classNames={{
                inputWrapper:
                  "py-0 h-10 bg-background group-data-[focus=true]:bg-background",
              }}
            />
            <Button
              color="primary"
              radius="full"
              variant="flat"
              className="bg-inherit"
              onClick={() => {
                isOpen && onOpenChange();
              }}
            >
              Cancel
            </Button>
          </ModalHeader>
          {isContentState === "content" ? (
            <Content tags={tags} users={users} posts={posts} />
          ) : isContentState === "noContent" ? (
            <ModalBody className="pt-[8%] text-center text-base text-default-400">
              <p>Start typing, and we'll take it from there</p>
              <p>╰(*°▽°*)╯</p>
            </ModalBody>
          ) : (
            <ModalBody className="pt-[8%] text-center text-base text-default-400">
              <p>{`No results for "${isSearchQuery}"`}</p>
              <p>ㄟ( ▔, ▔ )ㄏ</p>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchModal;
