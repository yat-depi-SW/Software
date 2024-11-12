import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import LayoutUser from "./LayoutUser";
import LayoutAdmin from "./LayoutAdmin";
import axios from "axios";
import NotFound from "./pages/404";

const App = () => {
  const [users, setUsers] = useState([]);
  const [logged, setLogged] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

 const [CartArray, setCartArray] = useState(
    JSON.parse(localStorage.getItem("CartArray")) || [],
  );
  
  const getUsers = () => {
    axios({
      method: "get",
      url: process.env.VITE_USERS_API,
    }).then(({ data }) => setUsers(data));
  };
  

  const getUserDetails = () => {
    axios({
      method: "get",
      url: process.env.VITE_USERS_API + `/${localStorage.ck}`,
    }).then(({ data }) => setUserDetails(data));
  };

  useEffect(() => {
    if (logged) {
      getUserDetails();
    } else {
      localStorage.ck && setLogged(true);
    }
  }, [logged]);

  useEffect(() => {
    getUsers();
  });

  return (
    <div>
      <Routes>
        <Route
          path="/*"
          element={
            <LayoutUser
              users={users}
              userDetails={userDetails}
              logged={logged}
              setLogged={setLogged}
              setUserDetails={setUserDetails}
              CartArray={CartArray} 
              setCartArray={setCartArray}
            />
          }
        />
        <Route
          path="/admin/*"
          element={
            userDetails?.role == "admin" ? (
              <LayoutAdmin users={users} userDetails={userDetails} setLogged={setLogged} />
            ) : (
              <NotFound />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
