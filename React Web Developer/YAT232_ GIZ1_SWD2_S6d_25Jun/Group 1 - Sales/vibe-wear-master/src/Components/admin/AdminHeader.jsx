import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ChevronDown } from "lucide-react";
import { ModeToggle } from "../mode-toggle";
import UserMenu from "../user/UserMenu";

const AdminHeader = ({ userDetails, setLogged }) => {
  return (
    <header className="top-0 w-full px-5 py-4">
      <div className="flex items-center justify-between">
        <div className="logo text-3xl font-bold">Dashboard</div>
        <div className="flex space-x-6">
          <ModeToggle />
          <div className="flex items-center space-x-3">
            <UserMenu setLogged={setLogged} userDetails={userDetails} />

            <div className="flex flex-col space-y-0.5">
              <h2 className="text-sm">{userDetails?.name}</h2>
              <p className="text-neutral-500 text-xs">{userDetails?.email}</p>
            </div>
            <ChevronDown className="text-neutral-500 h-4 w-4" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
