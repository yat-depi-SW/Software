import React from "react";
import HeroHome1 from "../components/HeroHome1";

const Home = ({ allProducts }) => {
  return (
    <div>
      <HeroHome1 allProducts={allProducts} />
    </div>
  );
};

export default Home;
