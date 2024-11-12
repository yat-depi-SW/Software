import React from "react";
import UsersDashboard from "../pages/UsersDashboard";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import NavbarDark from "../components/NavbarDark";
import EditProduct from "../pages/EditProduct";
import AddProduct from "../pages/AddProduct";
import Productsinfo from "../pages/Productsinfo";
import ShowUser from "../pages/ShowUser";
import EditUser from "../pages/EditUser";
import AddUser from "../pages/AddUser";

const AdminLayout = ({
  users,
  getUsers,
  postUser,
  newUser,
  setnewUser,
  userData,
  errors,
  validate,
}) => {
  return (
    <div>
      {/* <<<<<<< HEAD
      admin layout
      <br />
      <Link to="UsersDashboard" className="bg-blue-800">
        Users Dashboard
      </Link>
      <br />
      {/* <Link to="AddUser" className="bg-blue-800">
        add Users 
      </Link>
      <Routes>
      <Route path="/AddUser" element={<AddUser/>} />
      </Routes> */}
      <NavbarDark />
      {/* <Dashboard /> */}
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/UsersDashboard"
          element={<UsersDashboard users={users} getUsers={getUsers} />}
        />
        <Route
          path="/UsersDashboard/EditUser/:userID"
          element={<EditUser getUsers={getUsers} users={users} />}
        />
        <Route
          path="/UsersDashboard/AddUser"
          element={
            <AddUser
              postUser={postUser}
              newUser={newUser}
              setnewUser={setnewUser}
              userData={userData}
              errors={errors}
              validate={validate}
            />
          }
        />
        <Route path="/UsersDashboard/ShowUser/:userID" element={<ShowUser />} />
        <Route path="/Productsinfo" element={<Productsinfo />} />
        <Route path="/Productsinfo/addProduct" element={<AddProduct />} />
        <Route
          path="/Productsinfo/editProduct/:productID"
          element={<EditProduct />}
        />
      </Routes>
    </div>
  );
};

export default AdminLayout;
