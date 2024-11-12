import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
  Collapse,
  Badge,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
  Bars2Icon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import { MdOutlineWbSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/reducers/usersSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosHome } from "react-icons/io";
import { IoCart, IoLogIn } from "react-icons/io5";
import lightLogo from "../../img/mainAssets/logo.png";
import darkLogo from "../../img/mainAssets/footer-logo.png";

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const closeMenu = () => setIsMenuOpen(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.users);

  const userProfileMenuItems = [
    {
      label: "My Profile",
      icon: UserCircleIcon,
      onclick: () => {
        console.log("My Profile Clicked");
        navigate("/profile");
      },
    },

    {
      label: "Sign Out",
      icon: PowerIcon,
      onclick: () => {
        dispatch(logout());
        navigate("/");
        closeMenu();
      },
    },
  ];
  const adminProfileMenuItems = [
    {
      label: "My Profile",
      icon: UserCircleIcon,
      onclick: () => {
        console.log("My Profile Clicked");
        navigate("/profile");
      },
    },
    {
      label: "Dashboard",
      icon: Cog6ToothIcon,
      onclick: () => {
        navigate("admin");
      },
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
      onclick: () => {
        dispatch(logout());
        navigate("/");
        closeMenu();
      },
    },
  ];

  const profileMenuItems =
    currentUser?.role === "admin"
      ? adminProfileMenuItems
      : userProfileMenuItems;

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center rounded-full py-0.5 pr-0 pl-0.5  dark:text-gray-200"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="Profile Picture"
            className="border border-gray-900 p-0.5 dark:border-gray-200"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80"
          />
        </Button>
      </MenuHandler>

      <MenuList className="p-1 dark:bg-gray-800">
        {profileMenuItems.map(({ label, icon, onclick }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={onclick}
              className={`flex items-center gap-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${
                  isLastItem
                    ? "text-red-500"
                    : "text-gray-600 dark:text-gray-400"
                }`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal dark:text-gray-200"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

// nav list component
const navListItems = [
  {
    label: "Home",
    icon: IoIosHome,
    to: "/",
  },
  {
    label: "Shop",
    icon: FaShoppingCart,
    to: "shop",
  },
];

function NavList() {
  const { logged } = useSelector((state) => state.users);
  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navListItems.map(({ label, icon, to }) => (
        <Link to={to} key={label}>
          <Typography
            variant="small"
            color="gray"
            className="font-medium text-blue-gray-500 dark:text-gray-400"
          >
            <MenuItem className="flex items-center gap-2 lg:rounded-full dark:hover:bg-gray-700">
              {React.createElement(icon, {
                className: "h-[18px] w-[18px] dark:text-gray-400",
              })}{" "}
              <span className="text-gray-900 dark:text-gray-200"> {label}</span>
            </MenuItem>
          </Typography>
        </Link>
      ))}
      {!logged && (
        <Link to="login" className="lg:hidden">
          <Typography
            variant="small"
            color="gray"
            className="font-medium text-blue-gray-500 dark:text-gray-400"
          >
            <MenuItem className="flex items-center gap-2 lg:rounded-full dark:hover:bg-gray-700">
              {React.createElement(IoLogIn, {
                className: "h-[18px] w-[18px] dark:text-gray-400",
              })}{" "}
              <span className="text-gray-900 dark:text-gray-200"> Login </span>
            </MenuItem>
          </Typography>
        </Link>
      )}
    </ul>
  );
}

export function UserNavbar() {
  const { logged, currentUser } = useSelector((state) => state.users);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [mode, setMode] = useState(localStorage.getItem("theme") || "light");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("theme", mode);
    document.documentElement.classList.remove("light");
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add(mode);
  }, [mode]);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
  const toggleMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
  };

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <nav className="py-2 lg:px-6 dark:bg-gray-800">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900 dark:text-gray-200 py-3">
        <section className="flex">
          <Link
            to="/"
            className="mr-4 ml-2 cursor-pointer py-1.5 font-medium text-gray-800 dark:text-gray-200"
          >
            <img src={mode === "dark" ? darkLogo : lightLogo} alt="Logo img" />
          </Link>

          <div className="hidden lg:block">
            <NavList />
          </div>
        </section>

        <section className="flex items-center gap-7">
          <IconButton
            size="sm"
            color="blue-gray"
            variant="text"
            onClick={toggleIsNavOpen}
            className="ml-auto mr-2 lg:hidden"
          >
            <Bars2Icon className="h-6 w-6 text-gray-800 dark:text-gray-200" />
          </IconButton>

          {logged && (
            <Badge content={currentUser?.cart?.length}>
              <IconButton
                variant="text"
                onClick={() => navigate("/shopping-cart")}
              >
                <IoCart className=" text-2xl dark:text-white" />
              </IconButton>
            </Badge>
          )}

          <button onClick={toggleMode}>
            {mode === "light" ? <FaMoon /> : <MdOutlineWbSunny />}
          </button>

          <div className="hidden lg:flex md:gap-5">
            {!logged && (
              <>
                <Link to="/signup">
                  <Button
                    size="sm"
                    variant="text"
                    className="rounded-md px-4 py-2bg-blue-500 text-white bg-[#2563EB] hover:bg-[#2563EB]"
                  >
                    <span>Sign Up</span>
                  </Button>
                </Link>
                <Link to="/login">
                  <Button
                    size="sm"
                    variant="text"
                    className={` hidden md:block transition duration-300 ease-in-out rounded-md px-4 py-2 
      bg-gray-100 text-blue-500 hover:bg-gray-200 hover:text-blue-600
      dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white`}
                  >
                    <span>Log In</span>
                  </Button>
                </Link>
              </>
            )}
          </div>

          {logged && <ProfileMenu />}
        </section>
      </div>
      <Collapse open={isNavOpen}>
        <NavList />
      </Collapse>
    </nav>
  );
}
