import { FC } from "react";
import { default as NotfoundUI } from "src/components/Notfound";

const Notfound: FC<{ value?: string }> = ({ value }) => {
  return (
    <>
      <div className="flex h-[calc(100vh-170px)] items-center justify-center p-2">
        <NotfoundUI value={value} />
      </div>
    </>
  );
};

export default Notfound;
