import React from "react";
import ShopContent from "../components/ShopContent";

const Shop = ({ allProducts, addToCart }) => {
  return (
    <div>
      <ShopContent allProducts={allProducts} addToCart={addToCart} />
    </div>
  );
};

export default Shop;
