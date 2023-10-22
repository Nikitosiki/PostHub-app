import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "src/modules/Footer";
import Header from "src/modules/Header";

function Layout() {
  return (
    <>
      <Header />
      <div className="container mx-auto">
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default Layout;
