import ListPosts from "src/modules/ListPosts";

const Hots = () => {
  return (
    <>
      <div className="w-full p-2">
        <ListPosts sortBy="hot" />
      </div>
    </>
  );
};

export default Hots;
