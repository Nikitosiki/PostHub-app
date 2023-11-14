import { Input } from "@nextui-org/react";

const Search = () => {
  return (
    <>
      <Input
        isClearable
        radius="lg"
        color="primary"
        placeholder="Type to search..."
        startContent={<span className="material-symbols-rounded">search</span>}
      />
    </>
  );
};

export default Search;
