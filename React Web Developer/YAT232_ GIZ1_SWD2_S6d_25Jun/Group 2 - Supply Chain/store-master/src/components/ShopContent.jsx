import React from "react";
import { BsCart4 } from "react-icons/bs";
import { Button } from "@material-tailwind/react";

const ShopContent = ({ allProducts, addToCart }) => {
  return (
    <div className="p-10 bg-white dark:bg-[#0F172A]">
      <div className="text-[#1565C0] font-bold m-10 text-center underline underline-offset-4 leading-9 text-[1.875rem] p-10 ">
        P R O D U C T S
      </div>

      <div className="flex flex-col md:flex-row flex-wrap gap-10 mt-16 px-10 justify-evenly ">
        {allProducts.map((product) => (
          <div
            key={product.id}
            className="bg-[#B0BEC5] dark:bg-gray-700 text-black dark:text-white p-10 w-72 transition-transform transform hover:scale-105 hover:z-10 
                        rounded-xl shadow-lg flex justify-center items-center font-sans gap-2 flex-col"
          >
            <img src={product.image} alt="" className="h-[10em] w-[10em]" />
            <div className="text-center">
              <p className="text-[.75rem]">{product.category}</p>
              <p className="font-bold text-[1.12rem]">
                {product.title.split(" ").slice(0, 3).join(" ")}
              </p>
              <div>
                <div className="flex justify-between items-center">
                  <span>${product.price}</span>
                  <Button
                    className="bg-[#2632381A] dark:bg-white"
                    onClick={() => addToCart(product)}
                  >
                    <BsCart4 className="text-black" />
                  </Button>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="border-solid border-b-2 border-blue-gray-500">
                  {product.rating.rate}
                </span>
                <p>Based on {product.rating.count} Reviews</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopContent;
