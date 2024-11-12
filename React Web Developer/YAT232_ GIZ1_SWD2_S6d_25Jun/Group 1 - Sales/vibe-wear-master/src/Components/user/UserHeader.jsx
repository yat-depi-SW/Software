import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import React from "react";
import { ModeToggle } from "@/components/mode-toggle";
import UserMenu from "./UserMenu";
import { Link } from "react-router-dom";
import { ArrowRight, Navigation } from "lucide-react";

const UserHeader = ({ logged, setLogged, userDetails }) => {
  return (
    <header className="mx-auto max-w-7xl border-b px-5 py-5">
      <div className="flex items-center justify-between">
        <Link to="/">
          <div className="logo flex select-none items-baseline gap-x-1 text-4xl font-bold">
            Vibe Wear <div className="rounded-full bg-[#e86f51] p-[3px]" />
          </div>
        </Link>
        <nav>
          <ul className="flex space-x-5">
            {ROUTES.map((route, index) => (
              <li
                key={index}
                className="transition-all duration-300 hover:-translate-y-0.5"
              >
                <Link to={route.route}>{route.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center space-x-7">
          <ModeToggle />

          <Button className="relative rounded-lg">
            <Icons.cart className="size-[22px]" />
            <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary bg-red-600">
              <p className="text-xs text-white">2</p>
            </div>
          </Button>
          {logged ? (
            <UserMenu setLogged={setLogged} userDetails={userDetails} />
          ) : (
            <Link to="/login">
              <Button className="group gap-x-1.5 rounded-lg px-5">
                Login
                <ArrowRight className="size-3.5 transition-all duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default UserHeader;

const ROUTES = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Shop",
    route: "/shop",
  },
];
