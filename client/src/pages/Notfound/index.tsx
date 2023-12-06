import { FC } from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

import { default as NotfoundUI } from "src/components/Notfound";

const Notfound: FC<{ errorCode?: number; value?: string }> = ({
  errorCode,
  value,
}) => {
  const error = useRouteError();

  return (
    <>
      <div className="flex h-[calc(100vh-170px)] items-center justify-center p-2">
        {isRouteErrorResponse(error) ? (
          <NotfoundUI
            code={errorCode ?? error.status}
            value={value ?? error.data}
          />
        ) : (
          <NotfoundUI code={errorCode} value={value} />
        )}
      </div>
    </>
  );
};

export default Notfound;
