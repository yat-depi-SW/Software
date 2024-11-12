import React, { useState } from "react";
import "./CartProduct.css";
function CartProduct({ cart, CartArray, setCartArray, setTotal, Total }) {
  const [changeLayout, setchangeLayout] = useState(0);
  return (
    <>
      <div className="bg-mainWhite left-div flex flex-col items-center gap-3 transition duration-700 md:w-4/5 lg:flex-row">
        <div className="bg-mainWhite mb-4 w-full rounded-lg p-6 shadow-md">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left font-semibold">Product</th>
                <th className="text-left font-semibold">Price</th>
                <th className="text-left font-semibold">Quantity</th>
                <th className="text-left font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="w-1/2 py-4">
                  <div className="flex items-center">
                    <img
                      className="mr-4 h-16 w-16"
                      src={cart.image}
                      alt="Product image"
                    />
                    <span className="flex-grow text-left font-semibold">
                      {cart.title}
                    </span>
                  </div>
                </td>
                <td className="py-4 text-left">${cart.price}</td>
                <td className="py-4">
                  <div className="flex items-center">
                    <button
                      disabled=""
                      className="mr-2 rounded-md border bg-gray-200 px-3 py-2"
                      onClick={() => {
                        let newCartProd = CartArray;
                        for (let i = 0; i < newCartProd.length; i++) {
                          if (cart.id == newCartProd[i].id && cart.count > 1) {
                            newCartProd[i].count--;
                            localStorage.setItem(
                              "CartArray",
                              JSON.stringify(newCartProd),
                            );
                            setCartArray(newCartProd);
                            setchangeLayout(changeLayout + 1);
                            setTotal(Total + 1);
                          }
                        }
                      }}
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{cart.count}</span>
                    <button
                      className="ml-2 rounded-md border px-3 py-2"
                      onClick={() => {
                        let newCartProd = CartArray;
                        for (let i = 0; i < newCartProd.length; i++) {
                          if (cart.id == newCartProd[i].id) {
                            newCartProd[i].count++;
                            localStorage.setItem(
                              "CartArray",
                              JSON.stringify(newCartProd),
                            );
                            setCartArray(newCartProd);
                            setchangeLayout(changeLayout + 1);
                            setTotal(Total + 1);
                          }
                        }
                      }}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="py-4 text-left">
                  ${parseFloat(cart.price * cart.count).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button
          className="text-mainGreyDark delete relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full bg-transparent text-center align-middle font-sans text-xs font-medium uppercase opacity-0 shadow-none shadow-gray-900/10 transition-opacity delay-150 duration-300 ease-in-out hover:shadow-none hover:shadow-gray-900/20 focus:scale-105 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          <span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
            onClick={() => {
              let newCartProd = CartArray;
              for (let i = 0; i < newCartProd.length; i++) {
                if (cart.id == newCartProd[i].id) {
                  newCartProd.splice(i, 1);
                  localStorage.setItem(
                    "CartArray",
                    JSON.stringify(newCartProd),
                  );
                  setCartArray(newCartProd);
                  setchangeLayout(changeLayout + 1);
                  setTotal(Total + 1);
                }
              }
            }}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 1024 1024"
              className="h-5 w-5"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z"></path>
            </svg>
          </span>
        </button>
      </div>
    </>
  );
}

export default CartProduct;
