import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/mainAssets/logo.png";
import footerLogo from "../images/mainAssets/footer-logo.png";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { BsCart4 } from "react-icons/bs";
import { IoMoon, IoSunny, IoMenu, IoClose } from "react-icons/io5";

const MainNavbar = ({
  loggedFlag,
  setLoggedFlag,
  currentName,
  role,
  gender,
  cartNum,
  setCartItems,
}) => {
  const navigate = useNavigate();

  const [mode, setMode] = useState(() => {
    return localStorage.theme === "dark" ? "dark" : "light";
  });

  const setDark = () => {
    localStorage.theme = "dark";
    setMode("dark");
  };
  const setLight = () => {
    localStorage.theme = "light";
    setMode("light");
  };

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  return (
    <div className="flex flex-wrap items-center justify-between bg-white dark:bg-[#0F172A] p-4">
      <div>
        <img
          src={mode === "dark" ? footerLogo : logo}
          alt="Logo"
          className="py-5 md:p-0"
        />
      </div>
      <div className="lg:block hidden">
        <div className="flex gap-3 ">
          <Link
            to="/"
            className="block antialiased font-sans text-xl leading-relaxed text-black dark:text-white p-1 font-medium hover:border-b-4 hover:border-red-700 transition-all"
          >
            Home
          </Link>
          <Link
            to="/shop"
            className="block antialiased font-sans text-xl leading-relaxed text-black dark:text-white p-1 font-medium hover:border-b-4 hover:border-red-700 transition-all"
          >
            Shop
          </Link>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="relative inline-flex">
          <button
            className="bg-[#014026] font-sans font-bold text-center px-6 rounded-lg text-white active:opacity-[0.85] py-2"
            type="button"
            onClick={() => navigate("/cart")}
          >
            <BsCart4 />
          </button>
          <span className="absolute rounded-full p-1 text-xs content-[''] grid place-items-center top-[4%] right-[2%] translate-x-2/4 -translate-y-2/4  min-w-[24px] min-h-[24px] bg-red-400 text-white font-bold">
            {cartNum}
          </span>
        </div>
        <Link to="/Login" className={`${loggedFlag ? "hidden" : "block"}`}>
          <Button className="bg-[#014026] ">Login</Button>
        </Link>

        <div
          className={`${loggedFlag ? "block dropdown dropdown-end" : "hidden"}`}
        >
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar "
          >
            <div className="w-10 rounded-full border-2 border-black dark:border-white">
              <img
                alt="Tailwind CSS Navbar component"
                src={`${
                  gender === "Female"
                    ? "https://docs.material-tailwind.com/img/team-3.jpg"
                    : "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                }`}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow "
          >
            <li>
              <Link
                to="/UserInfo"
                className="justify-between"
              >{`Welcome ${currentName}`}</Link>
            </li>
            <li>
              <Link
                to="/admin"
                className={`${
                  role === "admin" ? "block justify-between" : "hidden"
                }`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  localStorage.clear();
                  setLoggedFlag(false);
                  setCartItems([]);
                }}
                to="/"
              >
                Signout
              </Link>
            </li>
          </ul>
        </div>

        <Button
          className="bg-[#0F172A] dark:bg-[#000000] relative flex items-center justify-center w-10 h-10 rounded-lg shadow-md hover:shadow-lg focus:opacity-[0.85] active:opacity-[0.85]"
          onClick={mode === "light" ? setDark : setLight}
        >
          <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {mode === "light" ? (
              <IoMoon className="text-white h-5 w-5" />
            ) : (
              <IoSunny className="text-gray h-5 w-5" />
            )}
          </span>
        </Button>
        <div className="lg:hidden block bg-[#757575]">
          <Menu>
            <MenuHandler>
              <Button>
                <IoMenu />
              </Button>
            </MenuHandler>
            <MenuList>
              <MenuItem>
                <Link to="/">Home</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/shop">Shop</Link>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default MainNavbar;
