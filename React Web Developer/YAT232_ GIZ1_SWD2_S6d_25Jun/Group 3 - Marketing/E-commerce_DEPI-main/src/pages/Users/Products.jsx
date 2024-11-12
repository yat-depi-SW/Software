import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";

const Products = () => {
  const path = useNavigate();
  const backhome = () => path("/", { state: { name: "mazen" } });
  {
  }
  return (
    <div className="text-center">
      <div>Products هنا</div>
      <Button className="text-blue-700 bg-white"  onClick={backhome}>Back</Button>
    </div>
  );
};

export default Products;
