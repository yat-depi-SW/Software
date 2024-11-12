import React from "react";
import "./Footer.css";
import { Link, useLocation } from "react-router-dom";
function Footer() {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className="footer pb-2 pt-4">
      <div className="container-xl pb-0">
        <div className="row">
          <div className="col-lg-4 col-md-12 mb-lg-0 mb-3">
            <div className="flex-column footer-head flex">
              <img src="/footer-logo.png" className="" alt="" />
              <p className="my-3">
                The customer is at the heart of our unique bussiness model,
                which includes design.
              </p>
              <img src="/payment.png" alt="" />
            </div>
          </div>
          <div className="col-lg-4 col-md-5 mb-lg-0 mb-3">
            <div className="row">
              <div className="col-6">
                <ul className="shopping flex flex-col gap-3">
                  <li>
                    <h4 className="header text-uppercase">Shopping</h4>
                  </li>
                  <li>
                    <h5>
                      <Link to={""}>Home</Link>
                    </h5>
                  </li>
                  <li>
                    <h5>
                      <Link to={"shop"}>Shop</Link>
                    </h5>
                  </li>
                  <li>
                    <h5>About Us</h5>
                  </li>
                </ul>
              </div>
              <div className="col-6">
                <ul className="shopping flex flex-col gap-3">
                  <li>
                    <h4 className="header text-uppercase">PARTNER</h4>
                  </li>
                  <li>
                    <div className="row client">
                      <img src="/client-1.png" alt="" />
                      <img src="/client-3.png" alt="" />
                    </div>
                  </li>
                  <li>
                    <div className="row client">
                      <img src="/client-4.png" alt="" />
                      <img src="/client-5.png" alt="" />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-7 mb-lg-0 mb-3">
            <ul className="newletter flex flex-col gap-3">
              <li>
                <h4 className="header text-uppercase">NEWLETTER</h4>
              </li>
              <li>
                <p>
                  Be the first to know about new arrivals, look books, sales &
                  promos
                </p>
              </li>
              <li>
                <input
                  type="email"
                  name="email"
                  id=""
                  placeholder="Your E-mail"
                />
              </li>
            </ul>
          </div>
        </div>
        <div className="row justify-content-center pt-4">
          <div className="col-6 text-center">
            <h3 className="copyWrite text-white">
              © Designed by Vibe Wear
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
