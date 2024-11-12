import React, { useState } from 'react'
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    CardHeader,
  } from "@material-tailwind/react";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from "axios";
const View = () => {
    const navigate=useNavigate();
    const {productId}=useParams();
    const[product,SetProduct]=useState();
    const [productError,SetProductError]=useState('');
    const getproducts=()=>{
        axios({
          method:"get",
          url:`https://blush-warp-bathroom.glitch.me/products/${productId}`,
        }).then(({data})=>{
            if(data.id){
                console.log("Fetched product: ", data); // Add logging
          SetProduct(data);  // Set the fetched user details
            }else{
                throw Error("");
            }
          
        }).catch((e)=>{
            SetProductError("Not Found Unvalid Product Number")
        })
      }
      useEffect(()=>{
        getproducts();
      },[]);
  return (
    <div className='flex justify-center items-center flex-row gap-3'>
        
        <Card className="mt-6 w-96">
        {productError&&productError}
        <CardHeader color="blue-gray" className="relative h-56">
        <img
          src={product?.image}
          alt="card-image"
        />
      </CardHeader>
      <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
                {product?.title}
            </Typography>
            <Typography>
                <strong>Description:</strong> {product?.description}
            </Typography>
            <Typography>
                <strong>Category:</strong> {product?.category}
            </Typography>
            <Typography>
                <strong>Price:</strong> {product?.price}
            </Typography>
            <Typography>
                <strong>Rating:</strong> {product?.rating?.rate}
            </Typography>
            <Typography>
                <strong>Rating Count:</strong> {product?.rating?.count}
            </Typography>
        </CardBody>
      <CardFooter className="pt-0">
        <Button onClick={()=>{navigate(-1)}}>Back</Button>
      </CardFooter>
    </Card>
    </div>
  )
}

export default View