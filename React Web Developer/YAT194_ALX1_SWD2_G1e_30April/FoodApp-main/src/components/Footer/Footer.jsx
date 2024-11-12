import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem id amet unde iste rem aut quae officiis voluptatum provident consequatur</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>

        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IS TOUCH</h2>
            <ul>
                <li>+2-1000-777-450</li>
                <li>contact@tomato.com</li>

            </ul>

        </div>

      </div>
      <hr/>
      <p className="footer-copyright">
        Copyright 2024 	&#169; Tomato.com - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
