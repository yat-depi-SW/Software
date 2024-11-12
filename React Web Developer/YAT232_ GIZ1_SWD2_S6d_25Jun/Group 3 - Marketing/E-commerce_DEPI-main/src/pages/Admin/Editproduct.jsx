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
const EditProduct = ({deleted,SetDeleted}) => {
    const {productId}=useParams();
    const navigate=useNavigate();
    const[product,SetProduct]=useState({
        title:"",
        price:"",
        description:"",
        category:"",
        image:"",
        rating:{
            rate:"",
            count:""
        }
    })
    const getproduct=()=>{
        axios({
            method:"get",
            url:`https://blush-warp-bathroom.glitch.me/products/${productId}`
        }).then(({data})=>{
            SetProduct(data)
        })
    }
    const handleform=(e)=>{
        e.preventDefault();
        axios({
            method:"put",
            url:`https://blush-warp-bathroom.glitch.me/products/${productId}`,
            data:product
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
        getproduct();
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
              label="Title" 
              value={product.title} 
              onChange={(e) => SetProduct(
                {
                    ...product,
                    title:e.target.value
                }
              )} 
            />
            <Input 
              size="lg" 
              type="number" 
              placeholder="Enter price" 
              label="Price" 
              value={product.price} 
              onChange={(e) => SetProduct(
                {
                    ...product,
                    price:parseFloat(e.target.value)
                }
              )} 
            />
            <Input 
              size="lg" 
              placeholder="Enter description" 
              label="Description" 
              value={product.description} 
              onChange={(e) => SetProduct(
                {
                    ...product,
                    description:e.target.value
                }
              )} 
            />
            <Input 
              size="lg" 
              placeholder="Enter category" 
              label="Category" 
              value={product.category} 
              onChange={(e) => SetProduct(
                {
                    ...product,
                    category:e.target.value
                }
              )} 
            />
            <Input
                size="lg"
                placeholder="Enter image URL"
                label="Image URL"
                value={product.image}
                onChange={(e) => SetProduct({
                    ...product, 
                    image: e.target.value })}
            />
            {/* Choose file to upload a new image
            <Input
                            size="lg"
                            label="Choose Image File"
                            type="file"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    SetProduct({
                                        ...product,
                                        image: URL.createObjectURL(file)  // Preview the new file
                                    });
                                }
                            }}
                        /> */}
            {/* <Input 
              size="lg" 
              placeholder="Enter image URL" 
              label="Image URL" 
              type="file"
              value={product.image} 
              onChange={(e) => {
                const file = e.target.files[0];
                SetProduct({
                  ...product,
                  image: file // store the file object in your state
                });
              }} 
            /> */}
            <Input 
              size="lg" 
              type="number" 
              placeholder="Enter rating" 
              label="Rating" 
              value={product.rating.rate} 
              onChange={(e) => SetProduct(
                {
                    ...product,
                    rating:{
                        ...product.rating,
                        rate:e.target.value
                    }
                }
              )} 
            />
            <Input 
              size="lg" 
              type="number" 
              placeholder="Enter rating count" 
              label="Rating Count" 
              value={product.rating.count} 
              onChange={(e) => SetProduct(
                {
                    ...product,
                    rating:{
                        ...product.rating,
                        count:e.target.value
                    }
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

export default EditProduct