import React from "react";
import Intro from "../components/home_components/Intro";
import Services from "../components/home_components/Services";
import ProductSample from "../components/home_components/ProductSample";

const Home = () => {
  return (
    <div>
      <Intro />
      <Services />
      <div className="bg-seperator-bg text-white py-3 text-center">
        <h2 className="block antialiased tracking-normal font-sans text-4xl font-semibold leading-[1.3] text-inherit">
          Free shipping, 30-day return or refund guarantee
        </h2>
      </div>
      <ProductSample />
    </div>
  );
};

export default Home;
