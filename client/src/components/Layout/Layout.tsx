import React from "react";
import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <header>
        <Link to="/">home</Link>
        <Link to="/post">post</Link>
        <Link to="/nikita">nikita</Link>
      </header>
      <Outlet />
    </>
  );
}

export default Layout;
