import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import banner1 from "../images/hero2/banner-1.jpg";
import banner2 from "../images/hero2/banner-2.jpg";
import banner3 from "../images/hero2/banner-3.jpg";

const HeroHome1 = ({ allProducts }) => {
  return (
    <div>
      <div className=" flex items-center flex-col bg-white dark:bg-[#0F172A] text-black dark:text-white">
        <div className="bg-[url('images/hero/hero-1.jpg')] bg-cover font-sans w-full h-screen">
          <div className="flex flex-col justify-center h-full w p-10 lg:w-1/3">
            <p className="text-red-600 font-bold py-3">SUMMER COLLECTION</p>
            <p className="text-[#37474F] text-[3rem]">
              Fall - Winter <br /> Collections 2024
            </p>
            <p className="text-[#37474F] text-[.9rem] font-light py-3 text-sm leading-normal opacity-90">
              A specialist label creating luxury essentials. Ethically crafted
              with an unwavering commitment to exceptional quality
            </p>
            <Button className="bg-red-600 btn-wide ">Shop Now</Button>
          </div>
        </div>

        <div className="text-sans p-14 lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:items-center lg:gap-48">
          <div className="lg:row-start-1 lg:row-end-3">
            <img src={banner2} alt="" />
            <p className="text-[3rem]">Accessories</p>
            <button className="btn btn-link p-0 text-black dark:text-white font-normal">
              SHOP NOW
            </button>
          </div>
          <div>
            <img src={banner1} alt="" />
            <p className="text-[3rem]">
              Clothing Collections <br /> 2024
            </p>
            <button className="btn btn-link p-0 text-black dark:text-white font-normal">
              SHOP NOW
            </button>
          </div>
          <div>
            <img src={banner3} alt="" />
            <p className="text-[3rem]">
              Shoes Spring <br /> 2024
            </p>
            <button className="btn btn-link p-0 text-black dark:text-white font-normal">
              SHOP NOW
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[url('images/seperator/3.jpg')] w-full">
        <p className="text-[2.3rem] text-white p-3 text-center">
          Free shipping, 30-day return or refund guarantee
        </p>
      </div>

      <div>
        <div className="flex flex-row flex-wrap p-12 justify-center items-center bg-white dark:bg-[#0F172A]">
          {allProducts.map(
            (product) =>
              product.category == "jewelery" && (
                <div
                  key={product.id}
                  className="border-solid  mx-4 p-4 shadow-lg text-center bg-white dark:bg-gray-800 text-[#0F172A] dark:text-white "
                >
                  <img src={product.image} alt="" className="w-52 h-60" />
                  <p>
                    {product.title.split(" ").slice(0, 3).join(" ")}
                    <span className="pl-5 ">${product.price}</span>
                  </p>

                  <span className="font-bold">{product.rating.rate}</span>
                  <p>Based on {product.rating.count} Reviews</p>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroHome1;
