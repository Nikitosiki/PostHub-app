import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages
import Layout from "./components/Layout/Layout";
import Homepage from "src/pages/Homepage";
import Postpage from "src/pages/Postpage";
import Notfoundpage from "src/pages/Notfoundpage";
import Newspage from "src/pages/News";
import Topspage from "src/pages/Tops";
import Tagspage from "src/pages/Tags";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="news" element={<Newspage />} />
          <Route path="tops" element={<Topspage />} />
          <Route path="tags" element={<Tagspage />} />
          <Route path="post" element={<Postpage />} />
          <Route path="*" element={<Notfoundpage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
