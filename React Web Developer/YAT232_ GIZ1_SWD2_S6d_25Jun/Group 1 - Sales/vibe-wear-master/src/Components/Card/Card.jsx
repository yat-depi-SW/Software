import React, { useState } from "react";
import "./Card.css";
import Star from "../Star/Star";
import { useLocation, useNavigate } from "react-router-dom";
function Card({ card, setCartArray, CartArray }) {
  console.log(card);

  localStorage.setItem("CartArray", JSON.stringify(CartArray));
  const location = useLocation();
  const navigate = useNavigate();
  let [currentPath, setcurrentPath] = useState(location.pathname);

  const rating = parseInt(card.rating.rate);
  let colorStars = [];
  let solidStars = [];
  for (let i = 0; i < rating; i++) {
    colorStars.push(1);
  }
  for (let i = 0; i < 5 - rating; i++) {
    solidStars.push(1);
  }

  return (
    <div className="col-xl-3 col-lg-4 col-md-6 my-3">
      <div className="mx-auto flex w-72 flex-col items-center justify-center rounded-xl bg-blue-gray-200 pt-2 shadow-md duration-500 hover:scale-105 hover:shadow-xl lg:w-72">
        <img
          src={card.image}
          alt="Product"
          className="h-[10em] w-[10em] rounded-t-xl object-contain"
        />
        <div className="mx-auto w-72 px-3 py-3 text-center">
          <span className="text-mainGreyDark mr-3 text-xs uppercase">
            {card.category}
          </span>
          <p className="text-mainGreyDark block truncate text-lg font-bold capitalize">
            {card.title}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-mainGreyDark my-3 block cursor-auto truncate text-lg font-semibold capitalize">
              ${card.price}
            </p>
            <button
              className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg bg-blue-gray-900/10 text-center align-middle font-sans text-xs font-medium uppercase text-blue-gray-900 shadow-none shadow-gray-900/10 transition-all hover:scale-105 hover:shadow-none hover:shadow-gray-900/20 focus:scale-105 focus:opacity-[0.85] focus:shadow-none active:scale-100 active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={() => {
                card.count = 1;
                setCartArray([...(CartArray || []), card]);
                localStorage.setItem("CartArray", JSON.stringify(CartArray));

                setcurrentPath("/cart");
                navigate("/cart");
              }}
            >
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  version="1.2"
                  baseProfile="tiny"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path d="M20.756 5.345c-.191-.219-.466-.345-.756-.345h-13.819l-.195-1.164c-.08-.482-.497-.836-.986-.836h-2.25c-.553 0-1 .447-1 1s.447 1 1 1h1.403l1.86 11.164.045.124.054.151.12.179.095.112.193.13.112.065c.116.047.238.075.367.075h11.001c.553 0 1-.447 1-1s-.447-1-1-1h-10.153l-.166-1h11.319c.498 0 .92-.366.99-.858l1-7c.041-.288-.045-.579-.234-.797zm-1.909 1.655l-.285 2h-3.562v-2h3.847zm-4.847 0v2h-3v-2h3zm0 3v2h-3v-2h3zm-4-3v2h-3l-.148.03-.338-2.03h3.486zm-2.986 3h2.986v2h-2.653l-.333-2zm7.986 2v-2h3.418l-.285 2h-3.133z"></path>
                    <circle cx="8.5" cy="19.5" r="1.5"></circle>
                    <circle cx="17.5" cy="19.5" r="1.5"></circle>
                  </g>
                </svg>
              </span>
            </button>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center justify-center gap-2">
              <span className="text-mainGreyDark border-b-2 border-blue-gray-500">
                {card.rating.rate}
              </span>
              <div className="inline-flex items-center">
                {colorStars.map((val, id) => (
                  <Star flag={true} key={id} />
                ))}
                {solidStars.map((val, id) => (
                  <Star flag={false} key={id} />
                ))}
              </div>
            </div>
            <p className="text-mainGreyDark font-small review review block text-center font-sans text-sm leading-normal antialiased">
              Based on {card.rating.count} Reviews
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Card;
