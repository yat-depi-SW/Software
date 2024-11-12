import React, { useEffect, useState } from "react";
import UserHeader from "./components/user/UserHeader";
import UserProfile from "./pages/UserProfile";
import Home from "./Components/Home/Home";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import Shop from "./Components/Shop/Shop";
import SignUp from "./components/SignUp";
import Cart from "./Components/Cart/Cart";
import { Route, Routes, Outlet } from "react-router-dom";

import Login from "./pages/Login";

const LayoutUser = ({
  users,
  logged,
  setLogged,
  userDetails,
  setUserDetails,
  CartArray,
  setCartArray,
}) => {
  const [cards, setCards] = useState([]);
  async function GETAPI() {
    let myCards = await fetch("/db.json");
    myCards = await myCards.json();
    myCards = myCards.products;
    setCards(myCards);
    console.log(cards);
  }
  useEffect(() => {
    GETAPI();
  }, []);
  return (
    <div>
      <Navbar logged={logged} setLogged={setLogged} userDetails={userDetails} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/profile"
          element={
            logged && (
              <UserProfile
                userDetails={userDetails}
                setUserDetails={setUserDetails}
              />
            )
          }
        />
        <Route
          path="/shop"
          element={
            <Shop
              cards={cards}
              CartArray={CartArray}
              setCartArray={setCartArray}
            />
          }
        />
        <Route
          path="/cart"
          element={<Cart CartArray={CartArray} setCartArray={setCartArray} />}
        />
        <Route
          path="/login"
          element={<Login users={users} setLogged={setLogged} />}
        />
        <Route
          path="/signup"
          element={<SignUp users={users} setLogged={setLogged} />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default LayoutUser;
