import {
  Button,
  Card,
  Input,
  Select,
  Option,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddUser = ({
  postUser,
  newUser,
  setnewUser,
  userData,
  errors,
  validate,
}) => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      postUser(userData);
    }
  };
  return (
    <div className="bg-white dark:bg-[#0F172A] ">
      <Card color="transparent" shadow={false} className="flex items-center  ">
        <Typography variant="h4" className="dark:text-white">
          Add New User
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 "
          onSubmit={handleSubmit}
        >
          <div className="mb-1 flex flex-col gap-6 ">
            <Input
              label="Username"
              name="username"
              value={newUser.username}
              onChange={(e) =>
                setnewUser({ ...newUser, username: e.target.value })
              }
              error={!!errors.username}
            />
            {errors.username && (
              <p className="text-red-500">{errors.username}</p>
            )}
            <Input
              label="Email"
              name="email"
              value={newUser.email}
              onChange={(e) =>
                setnewUser({ ...newUser, email: e.target.value })
              }
              error={!!errors.email}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
            <Input
              label="Password"
              type="password"
              name="password"
              value={newUser.password}
              onChange={(e) =>
                setnewUser({ ...newUser, password: e.target.value })
              }
              error={!!errors.password}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={newUser.confirmPassword}
              onChange={(e) =>
                setnewUser({ ...newUser, confirmPassword: e.target.value })
              }
              error={!!errors.confirmPassword}
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword}</p>
            )}
            <Select
              label="Gender"
              name="gender"
              value={newUser.gender}
              onChange={(value) => setnewUser({ ...newUser, gender: value })}
              error={!!errors.gender}
            >
              <Option value="">Select Gender</Option>
              <Option value="Female">Female</Option>
              <Option value="Male">Male</Option>
            </Select>
            {errors.gender && <p className="text-red-500">{errors.gender}</p>}
          </div>
          <Button
            type="submit"
            className="mt-6 bg-[#014026]"
            fullWidth
            onClick={() => {
              validate() &&
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "User Added Successfully",
                  showConfirmButton: false,
                  timer: 1500,
                });
            }}
          >
            Add
          </Button>
        </form>
        <Button
          color="yellow"
          onClick={() => navigate("/admin/UsersDashboard")}
        >
          Back
        </Button>
      </Card>
    </div>
  );
};

export default AddUser;
