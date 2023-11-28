import { FC, useState } from "react";
import { Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";
import { motion } from "framer-motion";

import { useAsyncList } from "@react-stately/data";
import { getTagsByTitle } from "src/api/supabase/tags";
import { ITag } from "src/interfaces";

type TypeAddTagProps = {
  add(tag: ITag | string): void;
};

const AddTag: FC<TypeAddTagProps> = ({ add }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const list = useAsyncList<ITag>({
    async load({ filterText }) {
      const tags = await getTagsByTitle(filterText ?? "");
      return {
        items: tags,
      };
    },
  });

  return (
    <div className="flex flex-row">
      <Autocomplete
        size={"sm"}
        radius="full"
        className="z-10 w-[150px]"
        labelPlacement="outside-left"
        placeholder="Search an tag"
        inputValue={list.filterText}
        isLoading={list.isLoading}
        items={list.items}
        allowsCustomValue={true}
        onInputChange={(val) => {
          val = val.toLowerCase();
          list.setFilterText(val);
          setInputValue(val);
        }}
        onFocusChange={(isFocused) => console.log(isFocused)}
        scrollShadowProps={{
          isEnabled: false,
        }}
        label=" "
        isClearable={false}
      >
        {(item) => (
          <AutocompleteItem key={item.title}>{item.title}</AutocompleteItem>
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
