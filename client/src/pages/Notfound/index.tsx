import { default as NotfoundUI } from "src/components/Notfound";

function Notfound() {
  return (
    <>
      <div className="flex h-[calc(100vh-170px)] items-center justify-center">
        <NotfoundUI />
      </div>
    </>
  );
}

export default Notfound;
