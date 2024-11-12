import React from "react";
import footerLogo from "../images/mainAssets/footer-logo.png";
import payment from "../images/footer/payment.png";
import client1 from "../images/footer/clients/client-1.png";
import client2 from "../images/footer/clients/client-3.png";
import client3 from "../images/footer/clients/client-4.png";
import client4 from "../images/footer/clients/client-5.png";

const MainFooter = () => {
  return (
    <div className="bg-[#263238] text-white font-sans p-4">
      <div className="flex flex-wrap gap-3 p-4 justify-center">
        <div className="w-[20%]">
          <img src={footerLogo} alt="" />
          <p className="py-7 font-[.9rem]">
            The customer is at the heart of our unique bussiness model, which
            includes design.
          </p>
          <img src={payment} alt="" />
        </div>
        <div className="w-[20%] ml-12">
          <h1 className="font-[1rem]">SHOPPING</h1>
          <p className="font-[.75rem] font-normal  py-3">Home</p>
          <p className="font-[.75rem] py-3">Shop</p>
          <p className="font-[.75rem] py-3">About Us</p>
        </div>
        <div className="w-[20%]">
          <p className="font-[1rem]">PARTNER</p>
          <div className="grid grid-cols-2 grid-rows-2 pt-4">
            <img src={client1} alt="" className="w-10 h-10" />
            <img src={client2} alt="" className="w-10 h-10" />
            <img src={client3} alt="" className="w-10 h-10" />
            <img src={client4} alt="" className="w-10 h-10" />
          </div>
        </div>
        <div className="w-[20%]">
          <p className="font-[1rem] pb-4">NEWLETTER</p>
          <p>
            Be the first to know about new arrivals, look books, sales & promos
          </p>
          <input
            type="text"
            placeholder="Your E-mail"
            className="outline-none bg-transparent border-solid border-white border-b-2 pt-4"
          />
        </div>
      </div>
      <div className="text-center">© Designed by GROUP_2</div>
    </div>
  );
};

export default MainFooter;
