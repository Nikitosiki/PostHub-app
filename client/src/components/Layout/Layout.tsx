import { Outlet } from "react-router-dom";
import Footer from "src/modules/Footer";
import Header from "src/modules/Header";

function Layout() {
  return (
    <>
      <Header />
      <div className="bg-background-100">
        <div className="container mx-auto max-w-[1024px]">
          <Outlet />
          <Footer />
        </div>
      </div>
    </>
  );
}

// function Layout() {
//   return (
//     <>
//       <div className="max-h-screen overflow-hidden">
//         <Header />
//         <div className="h-full bg-background-100">
//           <div className="container mx-auto max-w-[1024px]">
//             <Outlet />
//             <Footer />
//           </div>
//           <div className="h-full overflow-hidden">
//             <div className="h-screen"></div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

export default Layout;
