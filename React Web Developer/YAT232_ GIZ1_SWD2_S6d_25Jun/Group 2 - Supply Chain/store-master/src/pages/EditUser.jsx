import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  Input,
  Select,
  Option,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";

const EditUser = ({ getUsers, users }) => {
  const navigate = useNavigate();
  const { userID } = useParams();
  const [disable, setDisable] = useState(true);
  const [member, setMember] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    role: "",
    id: "",
  });
  const [editErrors, seteditErrors] = useState({});

  const getMember = () => {
    axios({
      method: "get",
      url: `${import.meta.env.VITE_API}/users/${userID}`,
    }).then(({ data }) => {
      setMember(data);
    });
  };

  const editUser = (id) => {
    axios({
      method: "patch",
      url: `${import.meta.env.VITE_API}/users/${id}`,
      data: member,
    }).then(() => getUsers());
  };

  const validate = () => {
    const neweditErrors = {};
    if (!member.username) {
      neweditErrors.username = "Username is required.";
    }
    if (!member.email) {
      neweditErrors.email = "Email is required.";
    }
    if (!member.password) {
      neweditErrors.password = "Password is required.";
    }
    if (!member.gender) {
      neweditErrors.gender = "Gender is required.";
    }
    if (!member.role) {
      neweditErrors.role = "Gender is required.";
    }
    const checkUser = users.find(({ email, id }) => {
      email === member.email;
      id === member.id;
    });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (checkUser) {
      neweditErrors.email = "Email is already exist";
    }
    if (member.email && !emailRegex.test(member.email)) {
      neweditErrors.email = "Invalid email format.";
    }

    if (member.password && member.password.length < 6) {
      neweditErrors.password = "Password must be at least 6 characters long.";
    }
    seteditErrors(neweditErrors);
    return Object.keys(neweditErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      editUser(userID);
      getUsers();
    }
  };

  useEffect(() => {
    getMember();
  }, [userID]);

  return (
    <div className="py-4 c">
      <div className="flex justify-center ">
        <Card color="transparent" className="p-10 bg-gray-300">
          <Typography variant="h4" color="blue-gray">
            Edit User Information
          </Typography>
          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={handleSubmit}
          >
            <div className="mb-1 flex flex-col gap-6">
              <label variant="small" color="blue-gray" className=" font-medium">
                Username
              </label>
              <Input
                className="appearance-none !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                value={member.username}
                onChange={(e) =>
                  setMember({ ...member, username: e.target.value })
                }
                disabled={disable}
                error={!!editErrors.username}
              />
              {editErrors.username && (
                <p className="text-red-500">{editErrors.username}</p>
              )}
              <label variant="small" color="blue-gray" className=" font-medium">
                Email
              </label>
              <Input
                className="appearance-none !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                value={member.email}
                onChange={(e) =>
                  setMember({ ...member, email: e.target.value })
                }
                disabled={disable}
                error={!!editErrors.email}
              />
              {editErrors.email && (
                <p className="text-red-500">{editErrors.email}</p>
              )}
              <label variant="small" color="blue-gray" className=" font-medium">
                Password
              </label>
              <Input
                className="appearance-none !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                value={member.password}
                onChange={(e) =>
                  setMember({ ...member, password: e.target.value })
                }
                disabled={disable}
                error={!!editErrors.password}
              />
              {editErrors.password && (
                <p className="text-red-500">{editErrors.password}</p>
              )}
              <label variant="small" color="blue-gray" className=" font-medium">
                Gender
              </label>
              <Select
                name="gender"
                disabled={disable}
                value={member.gender}
                onChange={(value) => setMember({ ...member, gender: value })}
                error={!!editErrors.gender}
              >
                <Option value="Female">Female</Option>
                <Option value="Male">Male</Option>
              </Select>
              {editErrors.gender && (
                <p className="text-red-500">{editErrors.gender}</p>
              )}
              <label variant="small" color="blue-gray" className=" font-medium">
                Role
              </label>
              <Select
                name="role"
                disabled={disable}
                value={member.role}
                onChange={(value) => setMember({ ...member, role: value })}
                error={!!editErrors.role}
              >
                <Option value="user">User</Option>
                <Option value="admin">Admin</Option>
              </Select>
              {editErrors.role && (
                <p className="text-red-500">{editErrors.role}</p>
              )}
            </div>
            <div className="flex justify-evenly">
              <Button
                color="red"
                className="mt-6"
                onClick={() => setDisable(false)}
              >
                edit
              </Button>
              <Button color="green" className="mt-6" type="submit">
                save
              </Button>
            </div>
          </form>
        </Card>
      </div>
      <div className="flex justify-center my-5">
        <Button
          color="yellow"
          onClick={() => navigate("/admin/UsersDashboard")}
        >
          Back
        </Button>
      </div>
    </div>
  );
};
export default EditUser;
