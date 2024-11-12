import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/ui/icons";
import { Link, useNavigate } from "react-router-dom";

const UserMenu = ({ setLogged, userDetails }) => {

  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src="/avatar.JPG" alt="@shadcn" />
          <AvatarFallback>
            {userDetails?.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Link to="/profile">
          <DropdownMenuItem>Welcome {userDetails?.name}</DropdownMenuItem>
        </Link>
        {userDetails?.role == "admin" && (
          <Link to="/admin">
            <DropdownMenuItem>Dashboard</DropdownMenuItem>
          </Link>
        )}
        <DropdownMenuItem
          className="gap-x-2 text-red-600"
          onClick={() => {
            localStorage.clear();
            setLogged(false);
            navigate("/");
          }}
        >
          Signout <Icons.logout className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
