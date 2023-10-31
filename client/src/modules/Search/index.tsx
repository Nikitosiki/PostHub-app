import { Input } from "@nextui-org/react";

const Search = () => {
  return (
    <>
      {/* border border-background-200 */}
      <div className="mt-4 w-full cursor-pointer rounded-2xl bg-background p-4 drop-shadow-lg hover:drop-shadow-xl">
        <Input
          // label="Search"
          isClearable
          radius="lg"
          classNames={{
            label: "text-black/50 dark:text-white/90",
            // input: [
            //   "bg-transparent",
            //   "text-black/90 dark:text-white/90",
            //   "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            // ],
            // innerWrapper: "bg-transparent",
            // inputWrapper: [
            //   "shadow-xl",
            //   "bg-default-200/50",
            //   "dark:bg-default/60",
            //   "backdrop-blur-xl",
            //   "backdrop-saturate-200",
            //   "hover:bg-default-200/70",
            //   "dark:hover:bg-default/70",
            //   "group-data-[focused=true]:bg-default-200/50",
            //   "dark:group-data-[focused=true]:bg-default/60",
            //   "!cursor-text",
            // ],
          }}
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
