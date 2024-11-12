import { Button } from "@material-tailwind/react";
import React from "react";

const Intro = () => {
  return (
    <div className="bg-intro-bg bg-[#f3f2ee] dark:bg-[#242424] h-[100vh] bg-cover bg-center w-full">
      <div className="flex flex-col lg:w-1/3 p-16 justify-center h-full items-start text-left gap-8 border-black">
        <h6 className="text-sm text-red-600 font-bold">SUMMER COLLECTION</h6>
        <div className="text-4xl flex flex-col dark:text-white">
          <h1>Fall - Winter</h1>
          <h1>Collections 2023</h1>
        </div>
        <p className="text-sm text-gray-600">
          A specialist label creating luxury essentials. Ethically crafted with
          an unwavering commitment to exceptional quality.
        </p>
        <Button className="rounded-none" size="lg" color="red">
          SHOP NOW
        </Button>
      </div>
    </div>
  );
};

export default Intro;
