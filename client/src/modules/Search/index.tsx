import { Input } from "@nextui-org/react";

const Search = () => {
  return (
    <>
      <div className="w-full cursor-pointer rounded-2xl bg-background drop-shadow-lg hover:drop-shadow-xl">
        <Input
          isClearable
          radius="lg"
          color="primary"
          placeholder="Type to search..."
          startContent={
            // <SearchIcon className="pointer-events-none flex-shrink-0 text-black/50 text-slate-400 dark:text-white/90" />
            <span className="material-symbols-rounded">search</span>
          }
        />
      </div>
    </>
  );
};

export default Search;
