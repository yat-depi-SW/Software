import React, { useEffect, useState } from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Input,
} from "@material-tailwind/react";
import { BellIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom"; // Import Link from React Router
import { IoMoon, IoSunny } from "react-icons/io5";

const NavbarDark = () => {
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
    <div className="w-full flex justify-center bg-white dark:bg-[#0F172A]">
      <Navbar
        variant="gradient"
        className="w-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white border border-white/0"
      >
        <div className="w-full flex flex-wrap items-center justify-between gap-y-4 px-4">
          <div className="flex space-x-4">
            <Typography
              as={Link}
              to="/admin/dashboard"
              variant="h6"
              className="mr-4 ml-2 cursor-pointer py-1.5"
            >
              Dashboard
            </Typography>
            <Typography
              as={Link}
              to="/admin/UsersDashboard"
              variant="h6"
              className="cursor-pointer py-1.5"
            >
              Users
            </Typography>
            <Typography
              as={Link}
              to="/admin/Productsinfo"
              variant="h6"
              className="cursor-pointer py-1.5"
            >
              Products
            </Typography>
            <Typography
              as={Link}
              to="/"
              variant="h6"
              className="cursor-pointer py-1.5"
            >
              Home
            </Typography>
          </div>

          {/* Search bar and Icons */}
          <div className="ml-auto flex gap-1 md:mr-4">
            <IconButton variant="text" color="white">
              <Cog6ToothIcon className="h-4 w-4 text-black dark:text-white" />
            </IconButton>
            <IconButton variant="text" color="white">
              <BellIcon className="h-4 w-4 text-black dark:text-white" />
            </IconButton>

            {/* Dark Mode Toggle Button */}
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
          </div>

          <div className="relative flex w-full gap-2 md:w-max">
            <Input
              type="search"
              label="Type here..."
              className="pr-20 text-black dark:text-white"
              containerProps={{
                className: "min-w-[288px]",
              }}
            />
            <Button
              size="sm"
              color="white"
              className="!absolute right-1 top-1 rounded"
            >
              Search
            </Button>
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default NavbarDark;
