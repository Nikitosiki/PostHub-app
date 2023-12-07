import {
  Card,
  CardBody,
  CardHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import Loading from "src/components/Loading";

import Tag from "src/components/Tag";
import { ITags } from "src/interfaces";
import { getSortedTags } from "src/services/supabase/tags";

const Tags = () => {
  const [sortTagsBy, setSortTags] = useState<"Latest" | "First" | "Ascending" | "Descending">("Latest");

  const [tags, setTags] = useState<ITags>([]);
  const [loading, setLoading] = useState(false);
  const [hasMoreTags, setHasMoreTags] = useState<boolean>(true);
  const [numberPage, setNumberPage] = useState<number>(1);
  const tagsOnPage = 10;

  const getNextTags = async () => {
    setLoading(true);
    const nextTags = await getSortedTags(numberPage, tagsOnPage, sortTagsBy);
    setHasMoreTags(nextTags.length !== 0);
    setTags(tags.concat(nextTags));
    setNumberPage(numberPage + 1);
    setLoading(false);
  };

  const reloadInfiniteScroll = async () => {
    setLoading(true);
    tags.length = 0;
    setHasMoreTags(true);
    setNumberPage(1);
    setLoading(false);
  };

  const [sentryRef] = useInfiniteScroll({
    loading: loading,
    hasNextPage: hasMoreTags,
    onLoadMore: getNextTags,
  });

  return (
    <>
      <div className="flex w-full flex-col sm:gap-4 sm:p-2">
        <Card
          className="w-full rounded-t-none border-none bg-background p-1 drop-shadow-lg hover:drop-shadow-xl sm:rounded-t-large"
          shadow="none"
        >
          <CardHeader className="flex flex-row items-center justify-between">
            <p>All tags</p>
            <Select
              size="sm"
              className="max-w-[10rem]"
              selectedKeys={[sortTagsBy]}
              disallowEmptySelection
              onChange={(select) => {
                setSortTags(select.target.value as typeof sortTagsBy ?? "Latest");
                reloadInfiniteScroll();
              }}
              startContent={
                <span className="material-symbols-rounded">sort</span>
              }
              classNames={{
                popoverContent: "bg-background",
                trigger: "shadow-none py-0 min-h-10 h-8",
                value: "pl-1",
              }}
            >
              <SelectItem key={"Latest"}>Latest</SelectItem>
              <SelectItem key={"First"}>First</SelectItem>
              <SelectItem key={"Ascending"}>Ascending</SelectItem>
              <SelectItem key={"Descending"}>Descending</SelectItem>
            </Select>
          </CardHeader>

          <CardBody className="flex-row flex-wrap gap-2">
            {tags.map((tag) => (
              <Tag key={tag.id} tag={tag} />
            ))}
          </CardBody>

          {(loading || hasMoreTags) && (
            <CardBody>
              <div ref={sentryRef}>
                <Loading className="mx-auto mt-2" />
              </div>
            </CardBody>
          )}
        </Card>
      </div>
    </>
  );
};

export default Tags;
