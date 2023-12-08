import {
  createBrowserRouter,
  Navigate,
  ScrollRestoration,
} from "react-router-dom";

// Paths
import {
  AuthorPagePath,
  CreatePostPagePath,
  HotsPagePath,
  NewsPagePath,
  PostCommentsPagePath,
  PostPagePath,
  ProfilePagePath,
  TagPagePath,
  TagsPagePath,
} from "./paths";

// Pages
import Layout from "src/components/Layout";
import Post from "src/pages/Post";
import Notfound from "src/pages/Notfound";
import News from "src/pages/News";
import Tags from "src/pages/Tags";
import Hots from "src/pages/Hots";
import CreatePost from "src/pages/CreatePost";
import Profile from "src/pages/Profile";
import PostComments from "./pages/PostComments";
import Tag from "./pages/Tag";  

// api functions
import PrivateRoute from "./components/PrivateRoute";
import { getPostById } from "./services/supabase/post";
import { tagById } from "./services/supabase/tags";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Layout />
        <ScrollRestoration />
      </>
    ),
    // errorElement: <Notfound />,
    children: [
      {
        index: true,
        element: <Navigate to={NewsPagePath} />,
      },
      {
        index: true,
        path: NewsPagePath,
        element: <News />,
      },
      {
        path: HotsPagePath,
        element: <Hots />,
      },
      {
        path: TagsPagePath,
        element: <Tags />,
      },
      {
        path: CreatePostPagePath,
        element: <PrivateRoute element={<CreatePost />} />,
      },
      {
        path: ProfilePagePath,
        element: <PrivateRoute element={<Profile />} />,
      },
      // {
      //   path: "/profile/settings",
      //   element: <PrivateRoute element={<div />} />,
      // },
      {
        path: PostPagePath,
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
        path: PostCommentsPagePath,
        element: <PostComments />,
        errorElement: <Notfound value="Comment is not found" />,
      },
      {
        path: TagPagePath,
        element: <Tag/>,
        errorElement: <Notfound value="Tag is not found" />,
        loader: ({ params }) => {
          if (!params.id)
            throw new Response("Tag is not found", { status: 404 });

          const data = tagById(params.id);
          if (!data) throw new Response("Tag is not found", { status: 404 });

          return data;
        },
      },
      {
        path: AuthorPagePath,
        element: <div />,
        errorElement: <Notfound value="User is not found" />,
      },
      {
        path: "*",
        element: <Notfound />,
      },
    ],
  },
]);

export default router;
