import ListPosts from "src/modules/ListPosts";

const Hots = () => {
  return (
    <>
      <div className="w-full p-2">
        <ListPosts sortBy="hot" postsProps={{fullContent: true}} />
      </div>
    </>
  );
};

export default Hots;
