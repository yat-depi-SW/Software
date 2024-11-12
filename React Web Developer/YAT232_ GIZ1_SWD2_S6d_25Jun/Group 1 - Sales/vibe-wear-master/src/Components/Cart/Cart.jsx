import React, { useState } from "react";
import "./Cart.css";
import CartProduct from "../CartProduct/CartProduct";
function Cart({ CartArray, setCartArray }) {
  let totalPrice = 0;
  for (let i = 0; i < CartArray.length; i++) {
    totalPrice += CartArray[i].price * CartArray[i].count;
  }
  const [Total, setTotal] = useState(0);

  return (
    <>
      <div className="container mx-auto my-3 py-4">
        <div className="mb-8 flex items-center justify-center gap-4 align-middle">
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            version="1.2"
            baseProfile="tiny"
            viewBox="0 0 24 24"
            color="red"
            className="h-8 w-10"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: "red" }}
          >
            <g>
              <path d="M20.756 5.345c-.191-.219-.466-.345-.756-.345h-13.819l-.195-1.164c-.08-.482-.497-.836-.986-.836h-2.25c-.553 0-1 .447-1 1s.447 1 1 1h1.403l1.86 11.164.045.124.054.151.12.179.095.112.193.13.112.065c.116.047.238.075.367.075h11.001c.553 0 1-.447 1-1s-.447-1-1-1h-10.153l-.166-1h11.319c.498 0 .92-.366.99-.858l1-7c.041-.288-.045-.579-.234-.797zm-1.909 1.655l-.285 2h-3.562v-2h3.847zm-4.847 0v2h-3v-2h3zm0 3v2h-3v-2h3zm-4-3v2h-3l-.148.03-.338-2.03h3.486zm-2.986 3h2.986v2h-2.653l-.333-2zm7.986 2v-2h3.418l-.285 2h-3.133z"></path>
              <circle cx="8.5" cy="19.5" r="1.5"></circle>
              <circle cx="17.5" cy="19.5" r="1.5"></circle>
            </g>
          </svg>
          <h1 className="text-mainGreyDark text-2xl font-semibold">
            Shopping Cart
          </h1>
        </div>
        <div className="flex flex-col justify-between gap-10 md:flex-row lg:gap-0">
          <div className="flex flex-col items-center justify-center lg:w-3/4">
            {CartArray.map((cart, id) => (
              <CartProduct
                key={id}
                cart={cart}
                CartArray={CartArray}
                setCartArray={setCartArray}
                setTotal={setTotal}
                Total={Total}
              />
            ))}
          </div>
          <div className="md:w-1/4">
            <div className="bg-mainWhite rounded-lg p-6 shadow-md">
              <h2 className="mb-4 text-lg font-semibold">Summary</h2>
              <div className="mb-2 flex justify-between">
                <span>Subtotal</span>
                <span>${parseFloat(totalPrice).toFixed(2)}</span>
              </div>
              <div className="mb-2 flex justify-between">
                <span>Taxes</span>
                <span>$0</span>
              </div>
              <div className="mb-2 flex justify-between">
                <span>Shipping</span>
                <span>$0.00</span>
              </div>
              <hr className="my-2" />
              <div className="mb-2 flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">
                  ${parseFloat(totalPrice).toFixed(2)}
                </span>
              </div>
              <button
                className="mt-4 w-full select-none rounded-lg bg-red-700 px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Cart;
