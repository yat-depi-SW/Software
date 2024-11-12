import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/user_components/Footer";
import AdminNavbar from "../components/admin/AdminNavbar";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.users);
  const id = localStorage.getItem("id");

  useEffect(() => {
    if (!id || (currentUser && currentUser.role !== "admin")) {
      navigate("/");
    }
  }, [currentUser]);
  return (
    <main className="flex flex-col min-h-screen">
      <AdminNavbar />
      <div className="flex-grow">{children}</div>
      <Footer />
    </main>
  );
};

export default AdminLayout;
