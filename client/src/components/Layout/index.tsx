import { Outlet } from "react-router-dom";
import Footer from "src/modules/Footer";
import Header from "src/modules/Header";

const Layout = () => {
  return (
    <>
      <div className="min-h-screen">
        <Header />
        <div className="bg-background-100">
          <div className="container mx-auto max-w-[1024px]">
            <div className="flex-grow p-2">
              <div className="min-h-[calc(100vh-186px)]"> 
                <Outlet />
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
