import { FC, ReactNode, useEffect, useLayoutEffect } from "react";
import InfiniteScroll, { Props } from "react-infinite-scroll-component";

type InfiniteScrollWrapperProps = {
  children?: ReactNode;
} & Props;

let bodyHeight: number;

const InfiniteScrollWrapper: FC<InfiniteScrollWrapperProps> = ({
  children,
  ...props
}) => {
  const { next, ...rest } = props;

  useLayoutEffect(() => {
    bodyHeight = document.body.clientHeight;
  }, []);

  useEffect(() => {
    if (!props.hasMore) return;
    if (bodyHeight !== document.body.clientHeight) return;

    props.next();
  }, [props.dataLength]);

  const getNext = async () => {
    await props.next();
  };

  return (
    <>
      <InfiniteScroll next={getNext} {...rest}>
        {children}
      </InfiniteScroll>
    </>
  );
};

export default InfiniteScrollWrapper;
