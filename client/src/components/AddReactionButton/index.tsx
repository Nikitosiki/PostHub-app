import {
  Button,
  ButtonProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { FC, useEffect, useState } from "react";
import { Tables } from "src/interfaces";
import { getAllReactions } from "src/services/supabase/reactions";

type AddReactionProps = {
  onClick(reactionId: number): void;
  buttonProps?: ButtonProps;
};

const AddReactionButton: FC<AddReactionProps> = ({ onClick, buttonProps }) => {
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
          <Button
            size="sm"
            className={
              buttonProps?.className ??
              "h-7 w-7 min-w-0 rounded-full bg-default-200 text-sm"
            }
            {...buttonProps}
          >
            {buttonProps?.content ?? "+"}
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
            list: "flex-row flex-wrap justify-between",
            base: "max-w-[188px]",
          }}
          items={reactions}
        >
          {(reaction) => (
            <DropdownItem
              key={reaction.id}
              className="w-auto"
              onClick={() => onClick(reaction.id)}
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
