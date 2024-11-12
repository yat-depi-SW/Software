import React, { useEffect } from "react";
import "./Shop.css";
import Card from "../Card/Card";
function Shop({ cards, CartArray, setCartArray }) {
  // let cards = [
  //   {
  //     id: 0,
  //     img: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
  //     category: "jewelery",
  //     title:
  //       "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
  //     price: 10,
  //     count: 0,
  //     rate: 4.6,
  //     reviews: 400,
  //   },
  //   {
  //     id: 1,
  //     img: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
  //     category: "jewelery",
  //     title: "Solid Gold Petite Micropave",
  //     price: 20,
  //     rate: 3.9,
  //     reviews: 70,
  //     count: 0,
  //   },
  //   {
  //     id: 2,
  //     img: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
  //     category: "jewelery",
  //     title: "White Gold Plated Princess",
  //     price: 500,
  //     rate: 3,
  //     reviews: 400,
  //     count: 0,
  //   },
  //   {
  //     id: 3,
  //     img: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
  //     category: "jewelery",
  //     title: "Pierced Owl Rose Gold Plated Stainless Steel Double",
  //     price: 10.99,
  //     rate: 1.9,
  //     reviews: 100,
  //     count: 0,
  //   },
  //   {
  //     id: 4,
  //     img: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
  //     category: "Electronics",
  //     title: "WD 2TB Elements Portable External Hard Drive - USB 3.0",
  //     price: 64,
  //     rate: 3.3,
  //     reviews: 203,
  //     count: 0,
  //   },
  //   {
  //     id: 5,
  //     img: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
  //     category: "Electronics",
  //     title: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
  //     price: 109,
  //     rate: 2.9,
  //     reviews: 470,
  //     count: 0,
  //   },
  //   {
  //     id: 6,
  //     img: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
  //     category: "Electronics",
  //     title:
  //       "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
  //     price: 109,
  //     rate: 4.8,
  //     reviews: 319,
  //     count: 0,
  //   },
  //   {
  //     id: 7,
  //     img: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
  //     category: "Electronics",
  //     title:
  //       "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
  //     price: 114,
  //     rate: 4.8,
  //     reviews: 400,
  //     count: 0,
  //   },
  //   {
  //     id: 8,
  //     img: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
  //     category: "Electronics",
  //     title: "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
  //     price: 599,
  //     rate: 2.9,
  //     reviews: 250,
  //     count: 0,
  //   },
  //   {
  //     id: 9,
  //     img: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
  //     category: "Electronics",
  //     title:
  //       "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED",
  //     price: 999.99,
  //     rate: 2.2,
  //     reviews: 140,
  //     count: 0,
  //   },
  //   {
  //     id: 10,
  //     img: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
  //     category: "women's clothing",
  //     title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
  //     price: 56.99,
  //     rate: 2.6,
  //     reviews: 235,
  //     count: 0,
  //   },
  //   {
  //     id: 11,
  //     img: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
  //     category: "women's clothing",
  //     title:
  //       "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
  //     price: 29.95,
  //     rate: 2.9,
  //     reviews: 340,
  //     count: 0,
  //   },
  //   {
  //     id: 12,
  //     img: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
  //     category: "women's clothing",
  //     title: "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
  //     price: 39.99,
  //     rate: 3.8,
  //     reviews: 679,
  //     count: 0,
  //   },
  //   {
  //     id: 13,
  //     img: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
  //     category: "women's clothing",
  //     title: "MBJ Women's Solid Short Sleeve Boat Neck V",
  //     price: 9.85,
  //     rate: 4.7,
  //     reviews: 130,
  //     count: 0,
  //   },
  //   {
  //     id: 14,
  //     img: "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
  //     category: "women's clothing",
  //     title: "Opna Women's Short Sleeve Moisture",
  //     price: 7.95,
  //     rate: 4.5,
  //     reviews: 146,
  //     count: 0,
  //   },
  //   {
  //     id: 15,
  //     img: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
  //     category: "women's clothing",
  //     title: "DANVOUY Womens T Shirt Casual Cotton Short",
  //     price: 12.99,
  //     rate: 3.6,
  //     reviews: 145,
  //     count: 0,
  //   },
  // ];

  localStorage.setItem("cards", JSON.stringify(cards));
  return (
    <>
      <div className="container-xl">
        <h2 className="header-shop text-center">
          <span>PRODUCTS</span>
        </h2>
        <div className="row mb-4">
          {cards.map((card, id) => (
            <Card
              key={id}
              card={card}
              CartArray={CartArray}
              setCartArray={setCartArray}
            />
          ))}
        </div>
      </div>
    </>
  );
}
export default Shop;
