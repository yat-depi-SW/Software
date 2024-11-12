import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const User = ({
  member: { id, username, role },
  makeAdmin,
  deleteUser,
}) => {
  const navigate = useNavigate();
  const [isCurrentUserAdmin, setCureentUSerAdmin] = useState(false);
  useEffect(() => {
    setCureentUSerAdmin(role === "admin" && id == window.localStorage.gi);
  }, [id]);
  return (
    <tr className="bg-blue-gray-50/50 text-blue-gray-700 border-b border-[#999999]">
      <td>{username}</td>
      <td>{role}</td>
      <td className="flex gap-8 justify-center">
        <Link to={`/admin/UsersDashboard/ShowUser/${id}`}>
        <Button
          type="button"
          size="sm"
        >
          View
        </Button></Link>

        <Link to={`/admin/UsersDashboard/EditUser/${id}`}>
        <Button
          type="button"
          size="sm"
        >
          Edit
        </Button></Link>
        <Button
          className="bg-red-500"
          type="button"
          size="sm"
          disabled={isCurrentUserAdmin}
          onClick={() => deleteUser(id)}
        >
          Delete
        </Button>
        <Button
          size="sm"
          disabled={isCurrentUserAdmin}
          onClick={() => 
            makeAdmin(id)}
          color={`${
            role === "admin" && !isCurrentUserAdmin ? "green" : "black"
          }`}
        >
          {`${
            role === "admin" && !isCurrentUserAdmin ? "Make User" : "Make Admin"
          }`}
        </Button>
      </td>
    </tr>
  );
};

export default User;
