import Post from "src/modules/Post";
import Search from "src/components/Search";

import {
  getFirstTag,
  getFirstUser,
  getPostById,
  getPosts,
} from "src/api/preview";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { getNews } from "src/api/preview/temp/newsapi";
import { useEffect, useState } from "react";

const News = () => {
  const [news, setNews] = useState<Array<unknown>>();

  useEffect(() => {
    async function get() {
      const response = await getNews();
      if (response.status === "ok") setNews(response.articles);
    }
    get();
  }, []);

  console.log(news);
  return (
    <>
      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-row gap-2">
          <Search />
          <Link to="/post/create" className="h-auto">
            <Button color="primary" className="h-full">
              <span className="material-symbols-rounded">add</span>
            </Button>
          </Link>
        </div>
        {news?.map((singleNews, index) => (
          <Post
            key={index}
            post={{
              id: index,
              title: "",
              content: singleNews.description,
              image_url: null,
              author: getFirstUser(),
              age_rating: null,
              tags: [getFirstTag()],
              reactions: getPosts()[0].reactions,
              comments: null,
              views: 5,
              published_at: singleNews.publishedAt,
              updated_at: null,
            }}
          />
        ))}
      </div>
    </>
  );
};

// id index
// title: string;
// content: string;
// image_url: string | null;
// author: IUser;
// age_rating: IRating | null;
// tags: ITags;
// reactions: IReactions;
// comments: IComments | null;
// views: number;
// published_at: Date;
// updated_at: Date | null;

export default News;
