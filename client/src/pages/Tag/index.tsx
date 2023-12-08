import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { default as TagComponent } from "src/components/Tag";
import InnerHTML from "src/components/InnerHTML";

import { ITag } from "src/interfaces";
import { shortFormatted } from "src/utils";
import { useEffect, useState } from "react";
import { NavigateCreatePostPage } from "src/paths";
import { getCountPosts, getCountPostsByTag } from "src/services/supabase/post";

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
      <div className="flex w-full flex-col sm:gap-4 sm:p-2">
        <Card
          className="w-full rounded-none border-none bg-background p-1 drop-shadow-lg hover:drop-shadow-xl sm:rounded-large"
          shadow="none"
        >
          <CardHeader className="justify-center pb-0">
            <TagComponent
              size="lg"
              className="bg-primary-100 text-2xl text-primary"
              tag={tag}
              disableLink
            />
            {/* <h2 className="text-3xl text-primary">{tag.title}</h2> */}
          </CardHeader>

          {tag.description && (
            <CardBody>
              {/* <p className="pb-1 text-sm font-bold text-default-500">About Tag</p> */}
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
                <span className="material-symbols-rounded pb-1">
                  monitoring
                </span>
                <span>{pageData.createPostsCount}</span>
                <span className="text-sm text-default-500">Created posts</span>
              </div>
              <div className="flex flex-col items-center ">
                <span className="material-symbols-rounded pb-1">
                  trending_up
                </span>
                <span>{`Top ${pageData.rankedBySize}%`}</span>
                <span className="text-sm text-default-500">Ranked by Size</span>
              </div>
            </div>
          </CardBody>

          {/* <CardBody>
            <p className="pb-1 text-sm font-bold text-default-500">Author</p>
            <Author className="pt-2" author={tag.author} />
          </CardBody> */}

          {/* <CardBody>
            <Divider />
          </CardBody> */}
        </Card>

        <Card
          className="w-full rounded-t-none border-none bg-background p-1 drop-shadow-lg hover:drop-shadow-xl sm:rounded-t-large"
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
              <Select
                size="sm"
                radius="md"
                className="max-w-[12rem]"
                selectedKeys={["First"]}
                // disabledKeys={["First", "Latest"]}
                disallowEmptySelection
                // onChange={(select) => {
                //   setSortComments(select.target.value);
                //   reloadInfiniteScroll();
                // }}
                startContent={
                  <span className="material-symbols-rounded">sort</span>
                }
                classNames={{
                  popoverContent: "bg-background",
                  trigger: "shadow-none py-0 min-h-10 h-10",
                  value: "pl-1",
                }}
              >
                <SelectItem key={"First"}>First</SelectItem>
                <SelectItem key={"Latest"}>Latest</SelectItem>
              </Select>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Tag;
