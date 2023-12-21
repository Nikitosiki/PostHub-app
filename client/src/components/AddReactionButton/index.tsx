import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { FC, useEffect, useState } from "react";
import { Tables } from "src/interfaces";
import { getAllReactions } from "src/services/supabase/reactions";

type AddReactionProps = {
  add(reactionId: number): void;
};

const AddReactionButton: FC<AddReactionProps> = ({ add }) => {
  const [reactions, setReactions] = useState<Tables<"reactions">[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<
    Iterable<React.Key> | undefined
  >();

  useEffect(() => {
    getAllReactions().then(setReactions);
  }, []);

  return (
    <>
      <Dropdown placement="top">
        <DropdownTrigger>
          <Button size="sm" className="h-7 w-7 min-w-0 rounded-full">
            +
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Link Actions"
          selectionMode="single"
          hideSelectedIcon
          disallowEmptySelection={false}
          defaultSelectedKeys={undefined}
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
          classNames={{
            list: "flex-row flex-wrap",
            base: "max-w-[188px]",
          }}
          items={reactions}
        >
          {(reaction) => (
            <DropdownItem
              key={reaction.id}
              className="w-auto"
              onClick={() => add(reaction.id)}
            >
              <span className="text-xl">{reaction.emoji}</span>
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default AddReactionButton;
