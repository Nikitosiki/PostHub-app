import { FC } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "@nextui-org/react";

const Notfound: FC<{ value?: string }> = ({value}) => {
  return (
    <>
      <Card
        className="border-none bg-background drop-shadow-lg hover:drop-shadow-xl"
        shadow="none"
        isPressable
      >
        <Link to="/news">
          <CardBody className="px-8 py-4">
            <div className="flex flex-row flex-wrap justify-center gap-4">
              <div className="flex items-center">
                <div className="text-2xl font-bold text-primary">
                  <p>404</p>
                </div>
              </div>
              <div className="border-x border-default-500"></div>
              <div className="flex cursor-pointer flex-col">
                <p className="text-left">{value ?? "Not found"}</p>
                <p className="text-left text-xs text-default-500">
                  return home
                </p>
              </div>
            </div>
          </CardBody>
        </Link>
      </Card>
    </>
  );
};

export default Notfound;
