import React from "react";
import { UserNavbar } from "../components/user_components/UserNavbar";
import { Footer } from "../components/user_components/Footer";

const UserLayout = ({ children }) => {
  return (
    <main className="flex flex-col min-h-screen">
      <UserNavbar />
      <div className="flex-grow">{children}</div>
      <Footer />
    </main>
  );
};

export default UserLayout;
