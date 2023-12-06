import { FC, ReactNode } from "react";
import { Button, useDisclosure } from "@nextui-org/react";
import SearchModal from "src/modules/SearchModal";

const SearchButton: FC<{ children?: ReactNode }> = ({ children }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button className="min-w-unit-10 bg-inherit px-0" onClick={onOpen}>
        {children}
      </Button>
      <SearchModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default SearchButton;
