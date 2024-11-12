import React from "react";
import Header from "../component/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./Users/Home";
import Products from "./Users/Products";
import Login from "./Users/Login";
import Signup from "./User/SignUp";
import Collection from './Collection'
import Cart from './Cart'
import Placeorder from './PlaceOrder'
import Product from './Product'
import SearchBar from '../component/SearchBar'


const LayoutUser = ({ users, SetLogged, logged, userDetails }) => {
  return (
    <div>
      <Header logged={logged} SetLogged={SetLogged} userDetails={userDetails} />
      <SearchBar/>
      <Routes>
        <Route path="/" element={<Home logged={logged} />} />
        <Route path="/Products" element={<Products />} />
        <Route path='/collection' element={<Collection/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup SetLogged={SetLogged}/>} />
        <Route path='/placeOrder' element={<Placeorder/>} />
        <Route path='/product/:productId' element={<Product/>} />
        <Route
          path="/Login"
          element={<Login users={users} SetLogged={SetLogged} />}
        />
      </Routes>
    </div>
  );
};
export default LayoutUser;
