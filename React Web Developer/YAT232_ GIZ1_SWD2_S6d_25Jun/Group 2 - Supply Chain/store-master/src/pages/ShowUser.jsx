import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import axios from "axios";

const ShowUser = () => {
  const navigate = useNavigate();
  const { userID } = useParams();
  const [member, setMember] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    role: "",
    id: "",
  });

  const getMember = () => {
    axios({
      method: "get",
      url: `${import.meta.env.VITE_API}/users/${userID}`,
    }).then(({ data }) => {
      setMember(data);
    });
  };
  useEffect(() => {
    getMember();
  });

  return (
    <div className="py-5 bg-white dark:bg-[#0F172A]">
      <Link to="/admin/UsersDashboard/ShowUser/:"></Link>
      <Card className="w-96 mx-auto bg-gray-300">
        <CardHeader floated={false} className="h-80">
          <img
            src={`${
              member.gender === "Female"
                ? "https://docs.material-tailwind.com/img/team-3.jpg"
                : "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            }`}
            alt="profile-picture"
          />
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h4" color="blue-gray" className="mb-2">
            {member.username}
          </Typography>
          <Typography color="blue-gray" className="font-medium" textGradient>
            {member.email}
          </Typography>
        </CardBody>
        <CardFooter className="flex justify-center gap-7 pt-2">
          <ul className="">
            <li>gender: {member.gender}</li>
            <li>password: {member.password} </li>
            <li>role: {member.role} </li>
            <li>ID: {member.id}</li>
          </ul>
        </CardFooter>
      </Card>
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

export default ShowUser;
