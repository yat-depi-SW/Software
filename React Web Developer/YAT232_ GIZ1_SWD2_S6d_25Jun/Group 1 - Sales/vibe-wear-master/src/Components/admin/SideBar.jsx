import React from "react";
import { Separator } from "../ui/separator";
import { Icons } from "../ui/icons";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();
  return (
    <aside className="fixed left-0 z-20 h-full w-52 bg-black px-4 py-4 dark:bg-[#111827]">
      <div className="flex flex-col space-y-5">
        <div className="logo flex items-baseline gap-x-1 text-3xl font-bold text-white">
          Vibe Wear <div className="rounded-full bg-[#e86f51] p-[3px]" />
        </div>
        <Separator className="w-full bg-gray-700" />
        <div className="text-[#d4d4d4]">Menu</div>
        <div className="flex flex-col space-y-4">
          {sideBarLinks.map((link, index) => (
            <Link to={link.route} key={index}>
              <div
                className={`flex items-center gap-x-3 ${
                  location.pathname === link.route
                    ? "text-white translate-x-1 transition-all duration-300"
                    : "text-[#d4d4d4]"
                }`}
              >
                {link.icon}
                {link.label}
              </div>
            </Link>
          ))}
        </div>
        <Separator className="w-full bg-gray-700" />
        <div className="flex items-center gap-x-3 text-[#d4d4d4]">
          <Icons.settings className="size-[22px]" />
          Settings
        </div>
      </div>
    </aside>
  );
};

export default SideBar;

const sideBarLinks = [
  {
    label: "Home",
    route: "/",
    icon: <Icons.home className="size-[22px]" />,
  },
  {
    label: "Dashboard",
    route: "/admin",
    icon: <Icons.dashboard className="size-[22px]" />,
  },
  {
    label: "Members",
    route: "/admin/members",
    icon: <Icons.users className="size-[22px]" />,
  },
  {
    label: "Products",
    route: "/admin/admin-product",
    icon: <Icons.shop className="size-[22px]" />,
  },
];
