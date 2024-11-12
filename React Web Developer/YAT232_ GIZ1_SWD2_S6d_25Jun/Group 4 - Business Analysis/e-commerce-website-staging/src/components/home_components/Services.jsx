import React from "react";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="w-full flex justify-center items-center gap-4 md:justify-evenly flex-col md:flex-row">
        <div className="text-[2rem] flex flex-col justify-center dark:text-white">
          <h1 className="text-center">Clothing</h1>
          <h1>Collections 2024</h1>
          <Link className="text-base underline text-center mt-2" to={"/shop"}>
            Shop now
          </Link>
        </div>
        <div className=" flex justify-center items-center bg-blue-gray-50 dark:bg-gray-900 w-[250px] md:w-[400px]">
          <img src="./src/img/hero2/banner-1.png" alt="" />
        </div>
      </div>

      <div className="w-full flex justify-center items-center gap-4 md:justify-evenly flex-col-reverse md:flex-row">
        <div className=" flex justify-center items-center bg-blue-gray-50 dark:bg-gray-900 w-[250px] md:w-[400px]">
          <img src="./src/img/hero2/banner-2.png" alt="" />
        </div>
        <div className="text-[2rem] flex flex-col justify-center text-right  dark:text-white">
          <h1>Accessories</h1>
          <Link className="text-base underline text-center mt-2" to={"/shop"}>
            Shop now
          </Link>
        </div>
      </div>

      <div className="w-full flex justify-center items-center gap-4 md:justify-evenly flex-col md:flex-row">
        <div className="text-[2rem] flex flex-col justify-center  dark:text-white">
          <h1 className="text-center">Shoes</h1>
          <h1>Spring 2024</h1>
          <Link className="text-base underline text-center mt-2" to={"/shop"}>
            Shop now
          </Link>
        </div>
        <div className=" flex justify-center items-center bg-blue-gray-50 dark:bg-gray-900 w-[250px] md:w-[400px]">
          <img src="./src/img/hero2/banner-3.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Services;
