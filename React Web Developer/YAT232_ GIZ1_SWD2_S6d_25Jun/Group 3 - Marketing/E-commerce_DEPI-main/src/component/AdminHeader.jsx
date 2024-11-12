import React, { useState } from "react";
import { FaBookOpen, FaFolderOpen } from "react-icons/fa";

import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import {
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { Link, NavLink } from "react-router-dom";
  // da mogarad methal ba aked feeh en el admin page sh8ala fel route  msh aktar
  //how how el Header el 3ady
  
function NavList({ logged }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);
  const profileMenuItems = [
    {
      label: "My Profile",
      icon: UserCircleIcon,
    },

    {
      label: "Sign Out",
      icon: PowerIcon,
    },
  ];
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as={NavLink}
        to="/"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        Home
      </Typography>
      <Typography
        as={NavLink}
        to="/Products"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        Products
      </Typography>

      {logged ? (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
          <MenuHandler>
            <Button
              variant="text"
              color="blue-gray"
              className="flex items-center rounded-full p-0"
            >
              <Avatar
                variant="circular"
                size="md"
                alt="tania andrew"
                withBorder={true}
                color="blue-gray"
                className=" p-0.5"
                src="https://docs.material-tailwind.com/img/face-2.jpg"
              />
            </Button>
          </MenuHandler>
          <MenuList className="p-1">
            {profileMenuItems.map(({ label, icon }, key) => {
              const isLastItem = key === profileMenuItems.length - 1;
              return (
                <MenuItem
                  key={label}
                  onClick={closeMenu}
                  className={`flex items-center gap-2 rounded ${
                    isLastItem
                      ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                      : ""
                  }`}
                >
                  {React.createElement(icon, {
                    className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                    strokeWidth: 2,
                  })}
                  <Typography
                    as="span"
                    onClick={label == "Sign Out" && console.log("sign out")}
                    variant="small"
                    className="font-normal"
                    color={isLastItem ? "red" : "inherit"}
                  >
                    {label}
                  </Typography>
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
      ) : (
        <Typography
          as={NavLink}
          to="/Login"
          variant="small"
          color="blue-gray"
          className="p-1 font-medium"
        >
          login
        </Typography>
      )}
    </ul>
  );
}
const AdminHeader = (logged) => {
  const [openNav, setOpenNav] = useState(false);
  return (
    <Navbar className="mx-auto max-w-screen-3xl bg-blue-gray-80 px-6 py-3">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as={NavLink}
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5"
        >
          Admin
        </Typography>
        <div className="hidden lg:block">
          <NavList logged={logged} />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <FaBookOpen className="h-6 w-6" strokeWidth={2} />
          ) : (
            <FaFolderOpen className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList logged={logged} />
      </Collapse>
    </Navbar>
  );
};

export default AdminHeader;
