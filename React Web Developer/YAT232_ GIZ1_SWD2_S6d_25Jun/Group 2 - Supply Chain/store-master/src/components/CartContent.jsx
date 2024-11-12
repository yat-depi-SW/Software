import React, { useEffect, useState } from "react";
import { BsCart4 } from "react-icons/bs";
import cartImg from "../images/cart/undraw_empty_cart_co35.svg";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";

const CartContent = ({
  cartItems,
  setCartItems,
  deleteProduct,
  loggedFlag,
  addedLocalCart,
}) => {
  const navigate = useNavigate();
  const [subTotal, setSubTotal] = useState(0);
  const [taxes, setTaxes] = useState(0);

  const minusOperation = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        id == item.id && item.counter > 1
          ? { ...item, counter: item.counter - 1 }
          : item
      )
    );
  };

  const plusOperation = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        id == item.id ? { ...item, counter: item.counter + 1 } : item
      )
    );
  };

  useEffect(() => {
    addedLocalCart();
  }, [minusOperation, plusOperation]);

  useEffect(() => {
    const { totalSubTotal, totalTaxes } = cartItems.reduce(
      (acc, currItem) => {
        const currSubTotal = currItem.price * currItem.counter;
        acc.totalSubTotal += currSubTotal;

        const currTaxes = (currItem.price / 5) * currItem.counter;
        acc.totalTaxes += currTaxes;

        return acc;
      },
      { totalSubTotal: 0, totalTaxes: 0 }
    );
    setSubTotal(totalSubTotal);
    setTaxes(totalTaxes);
  }, [cartItems]);

  return (
    <div className=" min-h-screen bg-white dark:bg-[#0F172A]">
      <div className="flex justify-center gap-4 mb-4">
        <span className="text-3xl text-red-500">
          <BsCart4 />
        </span>
        <p className="text-[1.5rem] font-bold text-black dark:text-white">
          Shopping Cart
        </p>
      </div>

      <div>
        {cartItems.length == 0 || !loggedFlag ? (
          <div className="flex justify-evenly md:flex-row flex-col gap-5">
            <div className="flex flex-col justify-center items-center gap-2 ">
              <img src={cartImg} alt="" className="w-52 h-52" />
              <h1 className="text-black dark:text-white text-[2.25rem] font-bold ">
                Cart's Feeling Light
              </h1>
              <p className="text-[#9E9E9E] text-[1.12rem] text-center ">
                Your cart is longing for some company. begin your <br />{" "}
                shopping adventure now!
              </p>
              <Button
                className="bg-red-700 w-max"
                onClick={() => navigate("/shop")}
              >
                EXPLORE OUR PRODUCTS
              </Button>
            </div>

            <div className="text-black dark:bg-gray-700 rounded-lg shadow-md p-6 w-64 h-max">
              <h2 className="text-lg font-semibold mb-4 text-center ">
                Summary
              </h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>$0</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Taxes</span>
                <span>$0</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>$0.00</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">$0</span>
              </div>
              <button
                disabled={true}
                className="align-middle select-none font-sans font-bold text-center disabled:opacity-50 text-xs py-3 px-6 rounded-lg text-white shadow-m hover:shadow-lg focus:opacity-[0.85] bg-red-700 mt-4 w-full"
                type="button"
              >
                CHECKOUT
              </button>
            </div>
          </div>
        ) : (
          loggedFlag && (
            <div className="flex justify-evenly md:flex-row flex-col gap-5 ">
              <div className="flex flex-col gap-5">
                {cartItems.map((item, indx) => (
                  <div
                    key={indx}
                    className="flex justify-around flex-col items-center md:flex-row "
                  >
                    <div className="flex flex-row bg-white gap-6 shadow-md p-6 justify-evenly mx-3 dark:bg-gray-700 text-black  ">
                      <div>
                        <p className="text-[1rem] font-bold">Product</p>
                        <div className="flex gap-2 py-4">
                          <img
                            src={item.image}
                            alt=""
                            className="h-16 w-16 mr-4"
                          />
                          <p className="text-[1rem] font-bold my-3">
                            {item.title.split(" ").slice(0, 3).join(" ")}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-[1rem] font-bold">Price</p>
                        <p className="py-4 my-3">${Math.round(item.price)}</p>
                      </div>
                      <div>
                        <p className="text-[1rem] font-bold">Quantity</p>
                        <div className="flex items-center py-4 my-3">
                          <button
                            className="btn btn-sm mr-1"
                            onClick={() => minusOperation(item.id)}
                          >
                            -
                          </button>
                          <span>{item.counter}</span>
                          <button
                            className="btn btn-sm ml-1"
                            onClick={() => plusOperation(item.id)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div>
                        <p className="text-[1rem] font-bold"> Total</p>
                        <p className="my-4 py-4">
                          {Math.round(item.counter * item.price)}
                        </p>
                      </div>
                    </div>
                    <button onClick={() => deleteProduct(item)}>
                      <AiFillDelete />
                    </button>
                  </div>
                ))}
              </div>
              <div className="rounded-lg shadow-md p-6 w-64 h-max text-black dark:bg-gray-700">
                <div>
                  <h2 className="text-lg font-semibold mb-4 text-center">
                    Summary
                  </h2>
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>${Math.round(subTotal)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Taxes</span>
                    <span>${Math.round(taxes)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Shipping</span>
                    <span>$0.00</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold">
                      ${Math.round(taxes + subTotal)}
                    </span>
                  </div>
                  <button
                    className="align-middle font-sans font-bold text-center text-xs py-3 px-6 rounded-lg text-white shadow-m hover:shadow-lg focus:opacity-[0.85] bg-red-700 mt-4 w-full"
                    type="button"
                  >
                    CHECKOUT
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default CartContent;
