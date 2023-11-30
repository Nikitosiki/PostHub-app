import {
  createBrowserRouter,
  Navigate,
  ScrollRestoration,
} from "react-router-dom";

// Pages
import Layout from "src/components/Layout";
import Post from "src/pages/Post";
import Notfound from "src/pages/Notfound";
import News from "src/pages/News";
import Tags from "src/pages/Tags";
import Hots from "src/pages/Hots";
import CreatePost from "src/pages/CreatePost";
import Profile from "src/pages/Profile";

// api functions
import PrivateRoute from "./components/PrivateRoute";
import { getPostById } from "./api/supabase/post";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Layout />
        <ScrollRestoration />
      </>
    ),
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
        element: <PrivateRoute element={<CreatePost />} />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/profile/settings",
        element: <PrivateRoute element={<div />} />,
      },
      {
        path: "/post/:id",
        element: <Post />,
        errorElement: <Notfound value="Post is not found" />,
        loader: ({ params }) => {
          if (!params.id)
            throw new Response("Post is not found", { status: 404 });

          const data = getPostById(params.id);
          if (!data) throw new Response("Post is not found", { status: 404 });
          return data;
        },
      },
      {
        path: "/author/:id",
        element: <div />,
        errorElement: <Notfound value="User is not found" />,
      },
      {
        path: "/tag/:id",
        element: <div />,
        errorElement: <Notfound value="Tag is not found" />,
      },
      {
        path: "*",
        element: <Notfound />,
      },
    ],
  },
]);

export default router;
