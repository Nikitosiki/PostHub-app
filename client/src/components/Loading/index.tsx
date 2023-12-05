import { FC } from "react";
import { CircularProgress, CircularProgressProps } from "@nextui-org/react";

const Loading: FC<CircularProgressProps> = ({ ...props }) => {
  return (
    <div>
      <CircularProgress aria-label="Loading..." {...props} />
    </div>
  );
};

export default Loading;
