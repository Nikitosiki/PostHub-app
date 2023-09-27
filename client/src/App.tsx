import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages
import Homepage from "src/pages/Homepage";
import Postpage from "src/pages/Postpage";
import Notfoundpage from "src/pages/Notfoundpage";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="post" element={<Postpage />} />
          <Route path="*" element={<Notfoundpage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
