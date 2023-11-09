import { useNavigate } from "react-router-dom";
import Post from "src/modules/Post";
import Search from "src/modules/Search";

import { getPost } from "src/api/preview";

function Newspage() {
  const navigate = useNavigate();

  const handlePostClick = (postId: number) => {
    navigate(`/post/${postId}`);
  };

  return (
    <>
      <div className="container mx-auto p-2">
        <div className="flex flex-col gap-6">
          <Search />
          {getPost().map((post) => (
            <Post post={post} onClick={() => handlePostClick(post.id)} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Newspage;
