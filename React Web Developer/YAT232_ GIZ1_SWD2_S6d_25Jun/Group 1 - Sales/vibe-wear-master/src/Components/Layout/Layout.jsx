import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <div className="h-100">
        <Navbar />

        <Outlet />

        <Footer />
      </div>
    </>
  );
}
export default Layout;
