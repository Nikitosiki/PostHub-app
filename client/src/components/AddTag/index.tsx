import { FC, useRef, useState } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteProps,
  Button,
} from "@nextui-org/react";
import { motion } from "framer-motion";

import { useAsyncList } from "@react-stately/data";
import { searchTagsByTitle } from "src/services/supabase/tag";
import { ITag } from "src/interfaces";

type TypeAddTagProps = {
  add(tag: ITag | string): void;
} & Pick<AutocompleteProps, "isDisabled">;

const AddTag: FC<TypeAddTagProps> = ({ add, ...props }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const list = useAsyncList<ITag>({
    async load({ filterText }) {
      const tags = await searchTagsByTitle(filterText ?? "", 30);
      return {
        items: tags,
      };
    },
  });

  const handleSearch = (value: string) => {
    if (timeout.current) clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      const text = value.toLowerCase().replace(/\s/g, "-");
      list.setFilterText(text);
      setInputValue(text);
    }, 500);
  };

  return (
    <div className="flex w-[186px] flex-row">
      <Autocomplete
        size="sm"
        radius="full"
        className="z-10 w-[150px]"
        labelPlacement="outside-left"
        placeholder="Search an tag"
        inputValue={list.filterText}
        isLoading={list.isLoading}
        items={list.items}
        allowsCustomValue={true}
        onInputChange={handleSearch}
        scrollShadowProps={{
          isEnabled: false,
        }}
        isClearable={false}
        maxLength={30}
        {...props}
      >
        {(item) => (
          <AutocompleteItem key={item.id}>{item.title}</AutocompleteItem>
        )}
      </Autocomplete>
      {inputValue.length > 1 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="z-0 -ml-7"
        >
          <Button
            size="sm"
            radius="full"
            className="h-full w-full justify-end"
            onClick={() => {
              const val =
                list.items.find((tag) => (tag.title = inputValue)) ??
                inputValue;
              setInputValue("");
              list.setFilterText("");
              add(val);
            }}
          >
            <span className="material-symbols-rounded justify-end">done</span>
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default AddTag;
