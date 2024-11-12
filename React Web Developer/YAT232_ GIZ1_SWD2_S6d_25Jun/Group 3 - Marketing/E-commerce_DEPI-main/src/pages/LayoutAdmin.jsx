import React from "react";
import Header from "../component/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./Users/Home";
import Products from "./Users/Products";
import Login from "./Users/Login";
import DashBoard from "./Admin/DashBoard";
import AdminHeader from "../component/AdminHeader";

import Productss from "./Admin/Productss";
import View from "./Admin/View";
import AddProduct from "./Admin/Addproduct";
import EditProduct from "./Admin/Editproduct";
import Users from "./Admin/Users";
import Edituser from "./Admin/Edituser";

const LayoutAdmin = ({ users, products, deleted, SetDeleted }) => {




  return (
    <div>
      <AdminHeader />
      <Routes>

        <Route path="/" element={<DashBoard users={users} products={products} deleted={deleted} SetDeleted={SetDeleted} />} />
        <Route path="/productss" element={<Productss products={products} deleted={deleted} SetDeleted={SetDeleted}/>}/>
        <Route path="/view/:productId" element={<View/>}/>
        <Route path="/add" element={<AddProduct deleted={deleted} SetDeleted={SetDeleted}/>}/>
        <Route path="/edit/:productId" element={<EditProduct deleted={deleted} SetDeleted={SetDeleted}/>}/>
        <Route path="/users"element={<Users users={users} deleted={deleted} SetDeleted={SetDeleted} />}/>
        <Route path="/edituser/:userId"element={<Edituser users={users} deleted={deleted} SetDeleted={SetDeleted} />}/>

        

      </Routes>
    </div>
  );
};

export default LayoutAdmin;
