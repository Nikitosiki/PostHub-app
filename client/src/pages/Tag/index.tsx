import { Button, Card, CardBody } from "@nextui-org/react";
import { useLoaderData, useNavigate } from "react-router-dom";
// import { default as TagComponent } from "src/components/Tag";
import InnerHTML from "src/components/InnerHTML";

import { ITag } from "src/interfaces";
import { shortFormatted } from "src/utils";
import { useEffect, useState } from "react";
import { NavigateCreatePostPage } from "src/paths";
import { getCountPosts, getCountPostsByTag } from "src/services/supabase/post";
import SelectSort from "src/modules/SelectSort";
import { PostSortConfig } from "src/modules/SelectSort/configs";
import ListPosts from "src/modules/ListPosts";

const sortConfig = PostSortConfig;

const Tag = () => {
  const tag = useLoaderData() as ITag;
  const navigate = useNavigate();
  const [pageData, setPageData] = useState({
    createPostsCount: 0,
    rankedBySize: 100,
  });

  useEffect(() => {
    const loadData = async () => {
      const createPostsCount = await getCountPostsByTag(tag.id);
      const rankedBySize = await getCountPosts();
      setPageData({
        ...pageData,
        createPostsCount: createPostsCount,
        rankedBySize: Math.ceil(100 - (createPostsCount / rankedBySize) * 100),
      });
    };
    loadData();
  }, []);

  return (
    <>
      <Card className="sticky top-0 z-50 h-14 w-full rounded-none border-none bg-background drop-shadow-lg sm:static sm:z-auto sm:rounded-t-large">
        <h2 className="flex h-full items-center justify-center bg-primary-300 text-2xl text-white">
          {tag.title}
        </h2>
      </Card>

      <Card
        className="z-40 w-full rounded-none border-none bg-background p-1 drop-shadow-lg sm:z-auto sm:mb-4 sm:rounded-b-large"
        shadow="none"
      >
        {tag.description && (
          <CardBody>
            <InnerHTML content={tag.description} />
          </CardBody>
        )}

        <CardBody>
          <div className="flex justify-evenly">
            <div className="flex flex-col items-center ">
              <span className="material-symbols-rounded pb-1">cake</span>
              <span>{shortFormatted(tag.created_at)}</span>
              <span className="text-sm text-default-500">Created</span>
              {/* <span>Updated {shortFormatted(tag.created_at)}</span> */}
            </div>
            <div className="flex flex-col items-center">
              <span className="material-symbols-rounded pb-1">monitoring</span>
              <span>{pageData.createPostsCount}</span>
              <span className="text-sm text-default-500">Created posts</span>
            </div>
            <div className="flex flex-col items-center ">
              <span className="material-symbols-rounded pb-1">trending_up</span>
              <span>{`Top ${pageData.rankedBySize}%`}</span>
              <span className="text-sm text-default-500">Ranked by Size</span>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Sticky: button & sort */}
      <div className="sticky top-14 z-50 sm:static sm:z-auto">
        <Card
          className="w-full rounded-t-none border-none bg-background p-1 drop-shadow-lg sm:rounded-t-large"
          shadow="none"
        >
          <CardBody>
            <div className="flex justify-between gap-4">
              <Button
                className="w-full"
                onClick={() => navigate(NavigateCreatePostPage())}
              >
                Create a new Post
              </Button>
              <SelectSort
                size="sm"
                radius="md"
                sortConfig={sortConfig}
                className="max-w-[12rem]"
                classNames={{
                  popoverContent: "bg-background",
                  trigger: "shadow-none py-0 min-h-10 h-10",
                  value: "pl-1",
                }}
              />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* List Posts */}
      <div className="flex w-full flex-col gap-4 p-2 pt-4">
        <ListPosts />
      </div>
    </>
  );
};

export default Tag;
