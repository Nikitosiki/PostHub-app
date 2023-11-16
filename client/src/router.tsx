import { createBrowserRouter, Navigate } from "react-router-dom";

// Pages
import Layout from "src/components/Layout";
import Post from "src/pages/Post";
import Notfound from "src/pages/Notfound";
import News from "src/pages/News";
import Tags from "src/pages/Tags";
import Hots from "src/pages/Hots";
import CreatePost from "src/pages/CreatePost";

// api functions
import { getPostById } from "src/api/preview";
import { IPost } from "./interfaces";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Notfound />,
    children: [
      {
        index: true,
        element: <Navigate to="/news" />,
      },
      {
        index: true,
        path: "/news",
        element: <News />,
      },
      {
        path: "/hots",
        element: <Hots />,
      },
      {
        path: "/tags",
        element: <Tags />,
      },
      {
        path: "/post/create",
        element: <CreatePost />,
      },
      {
        path: "/post/:id",
        element: <Post />,
        errorElement: <Notfound value="Post is not found" />,
        loader: ({ params }): IPost => {
          const data = getPostById(Number(params.id));
          if (!data) throw new Response("Not Found", { status: 404 });
          return data;
        },
      },
      {
        path: "*",
        element: <Notfound />,
      },
    ],
  },
]);

export default router;
