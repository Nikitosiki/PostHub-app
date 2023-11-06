import { Routes, Route } from "react-router-dom";

// Pages
import Layout from "../Layout/Layout";
import Postpage from "src/pages/Postpage";
import Notfoundpage from "src/pages/Notfoundpage";
import Newspage from "src/pages/Newspage";
import Tagspage from "src/pages/Tagspage";
import Hotspage from "../../pages/Hotspage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="news" element={<Newspage />} />
          <Route path="hots" element={<Hotspage />} />
          <Route path="tags" element={<Tagspage />} />
          <Route path="post" element={<Postpage />} />
          <Route path="*" element={<Notfoundpage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
