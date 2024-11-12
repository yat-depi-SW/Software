import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, updateUser } from "../../redux/reducers/usersSlice";
import { useNavigate } from "react-router-dom";
import { current } from "@reduxjs/toolkit";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import RegistrationErrorMsg from "../components/RegistrationErrorMsg";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
  const PWD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const { currentUser } = useSelector((state) => state.users);

  const [disabled, setDisabled] = useState(true);
  const [userHistory, setUserHistory] = useState([]);
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "",
    gender: "",
    password: "",
    id: "",
    role: "",
    cart: [],
  });
  const [errorMsg, setErrorMsg] = useState({
    email: "",
    password: "",
  });

  const validation = () => {
    setErrorMsg({ password: "", email: "" });

    if (!EMAIL_REGEX.test(updatedUser.email)) {
      setErrorMsg((prevError) => {
        return {
          ...prevError,
          email: "Please enter a valid email address (e.g., name@example.com).",
        };
      });
    }

    if (!PWD_REGEX.test(updatedUser.password)) {
      setErrorMsg((prevError) => {
        return {
          ...prevError,
          password:
            "Use at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.",
        };
      });
    }
  };

  const disableBtn = () => {
    if (!updatedUser.name || !updatedUser.email || !updatedUser.password)
      return true;

    if (errorMsg.email || errorMsg.password) return true;

    return false;
  };

  useEffect(() => {
    validation();
  }, [updatedUser]);

  useEffect(() => {
    if (currentUser) {
      setUpdatedUser({
        name: currentUser.name || "",
        email: currentUser.email || "",
        gender: currentUser.gender || "",
        password: currentUser.password || "",
        id: currentUser.id || "",
        role: currentUser.role || "",
        cart: currentUser.cart || "",
      });
    }
  }, [currentUser]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("userHistory")) || [];
    setUserHistory(history);
    const currentId = localStorage.id;
    currentId == null && navigate("/");
  }, []);

  const confirmEdit = (e) => {
    e.preventDefault();
    dispatch(updateUser(updatedUser));
    setDisabled(true);
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setUpdatedUser({
      ...updatedUser,
      [name]: value,
    });
  };

  const handleGenderChange = (value) => {
    setUpdatedUser({
      ...updatedUser,
      gender: value,
    });
  };

  return (
    <div className=" md:px-20">
      <div className="flex justify-center items-center">
        {updatedUser.gender == "male" ? (
          <img
            src="../src/img/userProfile/male-user.png"
            alt="male user icon"
          />
        ) : (
          <img
            src="../src/img/userProfile/female-user.png"
            alt="female user icon"
          />
        )}
      </div>

      <div className="p-6 text-left px-16">
        <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-800 mb-2">
          <span>{updatedUser.name}</span>
        </h4>
        <p className="block antialiased font-sans text-base leading-relaxed bg-clip-text undefined text-mainWhite dark:text-white font-medium">
          Username : {updatedUser.name}
        </p>
        <p className="block antialiased font-sans text-base leading-relaxed bg-clip-text undefined text-mainWhite dark:text-white font-medium">
          My name is {updatedUser.name}, I'm a {updatedUser.gender} and I'm a
          member here.
        </p>
        <p className="block antialiased font-sans text-base leading-relaxed bg-clip-text undefined text-mainWhite dark:text-white font-medium">
          Last Time Logged In:{" "}
          {userHistory.find((entry) => entry.action == "Logged In")
            ? userHistory.find((entry) => entry.action == "Logged In").date
            : " NA "}
        </p>
      </div>
      <hr />
      <div className="p-[4rem] flex flex-col gap-8 text-black dark:text-white">
        <div className="flex flex-col gap-4 ">
          <h6>Your User Name</h6>
          <Input
            className="text-black bg-white"
            name="name"
            disabled={disabled}
            value={updatedUser.name || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col gap-4">
          <h6>Your Email</h6>
          <Input
            className="text-black bg-white"
            name="email"
            disabled={disabled}
            value={updatedUser.email || ""}
            onChange={handleInputChange}
          />
          {updatedUser.email && errorMsg.email && (
            <RegistrationErrorMsg msg={errorMsg.email} />
          )}
        </div>
        <div className="flex flex-col gap-4">
          <h6>Your Gender</h6>
          <Select
            className="text-black bg-white"
            disabled={disabled}
            name="gender"
            value={updatedUser.gender || ""}
            onChange={handleGenderChange}
          >
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
        </div>
        <div className="flex flex-col gap-4">
          <h6>Your Password</h6>
          <Input
            className="text-black bg-white"
            name="password"
            disabled={disabled}
            type="password"
            value={updatedUser.password || ""}
            onChange={handleInputChange}
          />
          {updatedUser.password && errorMsg.password && (
            <RegistrationErrorMsg msg={errorMsg.password} />
          )}
        </div>
        <div className="flex justify-center items-center gap-4">
          <Button className="bg-blue-800" onClick={() => setDisabled(false)}>
            Edit
          </Button>
          <Button color="red" onClick={confirmEdit} disabled={disableBtn()}>
            Confirm Editing
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
