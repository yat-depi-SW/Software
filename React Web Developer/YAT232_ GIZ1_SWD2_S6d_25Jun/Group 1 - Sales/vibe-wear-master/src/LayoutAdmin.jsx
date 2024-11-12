import React from "react";
import { Route, Routes } from "react-router-dom";
import DashBoard from "./pages/admin/DashBoard";
import SideBar from "./components/admin/SideBar";
import AdminHeader from "./components/admin/AdminHeader";
import AdminProduct from "./adminproduct/Page";
import AddProduct from "./adminproduct/pages/AddProduct";
import EditProduct from "./adminproduct/pages/EditProduct";
import ViewProduct from "./adminproduct/pages/ViewProduct";

const LayoutAdmin = ({ users, userDetails, setLogged }) => {
  return (
    <div>
      <SideBar />
      <div className="pl-52">
        <AdminHeader userDetails={userDetails} setLogged={setLogged} />
      </div>

      <Routes>
        <Route path="/" element={<DashBoard users={users} />} />
        <Route path="/admin-product/*" element={<AdminProduct />} />
        <Route path="/admin-product/add-product" element={<AddProduct />} />
        <Route
          path="/admin-product/edit-product/:id"
          element={<EditProduct />}
        />
        <Route
          path="/admin-product/view-product/:id"
          element={<ViewProduct />}
        />
      </Routes>
    </div>
  );
};

export default LayoutAdmin;
