import { Routes, Route } from "react-router-dom";

// Pages
import Layout from "../Layout/Layout";
import Post from "src/pages/Post";
import Notfound from "src/pages/Notfound";
import News from "src/pages/News";
import Tags from "src/pages/Tags";
import Hots from "src/pages/Hots";
import CreatePost from "src/pages/CreatePost";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="news" element={<News />} />
          <Route path="hots" element={<Hots />} />
          <Route path="tags" element={<Tags />} />
          <Route path="post/:id" element={<Post />} />
          <Route path="post/create" element={<CreatePost />} />
          <Route path="*" element={<Notfound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
