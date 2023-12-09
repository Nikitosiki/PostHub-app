import ListPosts from "src/modules/ListPosts";

const News = () => {
  return (
    <>
      <div className="w-full p-2">
        <ListPosts sortBy="new" />
      </div>
    </>
  );
};

export default News;
