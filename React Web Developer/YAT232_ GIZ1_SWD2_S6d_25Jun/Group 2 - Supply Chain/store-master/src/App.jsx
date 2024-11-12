import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

const App = () => {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartNum, setCartNum] = useState(cartItems.length);
  const [isAddedLocal, setIsAddedLocal] = useState(false);
  const [users, setUsers] = useState([]);
  const [loggedFlag, setLoggedFlag] = useState(false);
  const [currentName, setName] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [newUser, setnewUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    role: "user",
  });
  const { username, email, password, role, gender } = newUser;
  const [userData, setUserData] = useState({});
  const [errors, setErrors] = useState({});
  const addedLocalCart = () => {
    if (cartItems.length != 0) {
      localStorage.it = JSON.stringify(cartItems);
    }
  };

  const getAllProducts = () => {
    axios({
      method: "get",
      url: `${import.meta.env.VITE_API}/products`,
    }).then((info) => {
      setAllProducts(info.data);
    });
  };

  const addToCart = (product) => {
    const existsInCart = cartItems.some((item) => item.id === product.id);
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );
    setIsAddedLocal(false);

    if (loggedFlag) {
      if (!existsInCart) {
        setCartItems((prevItems) => [...prevItems, { ...product, counter: 1 }]);
      } else {
        setCartItems((prevItems) =>
          prevItems.map((item, index) =>
            index === existingItemIndex
              ? { ...item, counter: item.counter + 1 }
              : item
          )
        );
      }
      setIsAddedLocal(true);
    } else {
      navigate("/login");
    }
  };

  const deleteProduct = (product) => {
    const deletedIndex = cartItems.findIndex((item) => item.id === product.id);
    setCartItems((prevItems) =>
      prevItems.filter((item, indx) => deletedIndex != indx)
    );
  };

  const getUsers = () => {
    axios({
      method: "get",
      url: `${import.meta.env.VITE_API}/users`,
    }).then((res) => {
      setUsers(res.data);
    });
  };

  const getCurrentUser = () => {
    axios({
      method: "get",
      url: `${import.meta.env.VITE_API}/users/${localStorage.gi}`,
    }).then((res) => {
      setCurrentUser(res.data);
      setName(res.data.username);
    });
  };

  const postUser = (d) => {
    axios({
      method: "post",
      url: `${import.meta.env.VITE_API}/users`,
      data: d,
    }).then((res) => {
      getUsers();
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!newUser.username) {
      newErrors.username = "Username is required.";
    }
    if (!newUser.email) {
      newErrors.email = "Email is required.";
    }
    if (!newUser.password) {
      newErrors.password = "Password is required.";
    }
    if (!newUser.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required.";
    }
    if (!newUser.gender) {
      newErrors.gender = "Gender is required.";
    }
    const checkUser = users.find(({ email }) => email === newUser.email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (checkUser) {
      newErrors.email = "Email is already exist";
    }
    if (newUser.email && !emailRegex.test(newUser.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (newUser.password && newUser.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }
    if (
      newUser.password &&
      newUser.confirmPassword &&
      newUser.password !== newUser.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    getAllProducts();
    getUsers();
  }, []);

  useEffect(() => {
    addedLocalCart();
  }, [addToCart]);

  useEffect(() => {
    setCartNum(cartItems.length);
  }, [cartItems]);

  useEffect(() => {
    const savedCartItems = localStorage.it;
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
      setCartNum(cartItems.length);
    }
  }, []);

  useEffect(() => {
    loggedFlag ? getCurrentUser() : localStorage.gi && setLoggedFlag(true);
  }, [loggedFlag]);

  useEffect(() => {
    setUserData({ username, email, password, role, gender });
  }, [newUser]);

  return (
    <div>
      <Routes>
        <Route
          path="/*"
          element={
            <UserLayout
              allProducts={allProducts}
              cartNum={cartNum}
              setCartNum={setCartNum}
              addToCart={addToCart}
              cartItems={cartItems}
              setCartItems={setCartItems}
              deleteProduct={deleteProduct}
              addedLocalCart={addedLocalCart}
              users={users}
              loggedFlag={loggedFlag}
              setLoggedFlag={setLoggedFlag}
              currentName={currentName}
              role={currentUser.role}
              gender={currentUser.gender}
              postUser={postUser}
              newUser={newUser}
              setnewUser={setnewUser}
              userData={userData}
              errors={errors}
              setErrors={setErrors}
              validate={validate}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path="/admin/*"
          element={
            currentUser?.role === "admin" ? (
              <AdminLayout
                users={users}
                getUsers={getUsers}
                postUser={postUser}
                newUser={newUser}
                setnewUser={setnewUser}
                userData={userData}
                errors={errors}
                validate={validate}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* <Route
          path="/admin/UsersDashboard"
          element={<UsersDashboard users={users} getUsers={getUsers} />}
        /> */}
        {/* <Route
          path="/admin/*"
          element={
            <AdminLayout
              users={users}
              postUser={postUser}
              newUser={newUser}
              setnewUser={setnewUser}
              userData={userData}
              errors={errors}
              validate={validate}
            />
          }
        /> */}
        {/* <Route
          path="/admin/UsersDashboard/ShowUser/:userID"
          element={<ShowUser />}
        /> */}
        {/* <Route
          path="/admin/UsersDashboard/EditUser/:userID"
          element={<EditUser getUsers={getUsers} users={users} />}
        />
        <Route
          path="/admin/UsersDashboard/AddUser"
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
        /> */}
      </Routes>
    </div>
  );
};

export default App;
