import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    rating,
  } from "@material-tailwind/react";
const Edituser = ({deleted,SetDeleted}) => {
    const {userId}=useParams();
    const navigate=useNavigate();
    const[user,SetUser]=useState({
        name: "",
      email: "",
      role: ""
    })
    const getuser=()=>{
        axios({
            method:"get",
            url:`https://blush-warp-bathroom.glitch.me/mazenz/${userId}`
        }).then(({data})=>{
            SetUser(data)
        })
    }
    const handleform=(e)=>{
        e.preventDefault();
        axios({
            method:"put",
            url:`https://blush-warp-bathroom.glitch.me/mazenz/${userId}`,
            data:user
        }).then(()=>{
            SetDeleted(!deleted);
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
              }).then(()=>{
                navigate("/admin")
              });
        })
    }
    useEffect(()=>{
        getuser();
    },[])
  return (
    <div className="items-center flex justify-center p-5">
        <Card color="transparent"  shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Add
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Nice to meet you! Enter your details to register.
      </Typography>
      <form  className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 " onSubmit={handleform} >
        <div className="mb-1 flex flex-col gap-6">
        <Input 
              size="lg" 
              placeholder="Enter product title" 
              label="Name" 
              value={user.name} 
              onChange={(e) => SetUser(
                {
                    ...user,
                    name:e.target.value
                }
              )} 
            />
            <Input 
              size="lg" 
              
              placeholder="Enter price" 
              label="Email" 
              value={user.email} 
              onChange={(e) => SetUser(
                {
                    ...user,
                    email:e.target.value
                }
              )} 
            />
            <Input 
              size="lg" 
              placeholder="Enter description" 
              label="Role" 
              value={user.role} 
              onChange={(e) => SetUser(
                {
                    ...user,
                    role:e.target.value
                }
              )} 
            />
            
          
        </div>
        
        <Button className="mt-6" fullWidth type='submit'>
          Add
        </Button>
        
      </form>
    </Card>
    </div>
  )
}

export default Edituser