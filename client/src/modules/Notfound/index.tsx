import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <>
      <div className="rounded-2xl bg-background px-8 py-4 drop-shadow-lg">
        <div className="flex flex-row flex-wrap justify-center gap-4">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-primary-500">
              <p>404</p>
            </div>
          </div>
          <div className="border-x border-default-500"></div>
          <div className="flex cursor-pointer items-center">
            <Link to="/news">
              <p className="text-left">Not found</p>
              <p className="text-left text-xs text-default-500">return home</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notfound;
