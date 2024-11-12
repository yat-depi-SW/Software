import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import UserMenu from "@/components/user/UserMenu";

import { Link, useLocation, useNavigate } from "react-router-dom";
function Navbar({ logged, setLogged, userDetails }) {
  const location = useLocation();
  const navigate = useNavigate();
  let [currentPath, setcurrentPath] = useState(location.pathname);
  useEffect(() => {
    const checkCartLength = () => {
      const cartArray = JSON.parse(localStorage.getItem("CartArray")) || [];
      // console.log(cartArray.length);
    };
    checkCartLength();
    const intervalId = setInterval(checkCartLength, 3000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <nav className="">
      <div className="container-xl py-3">
        <div className="flex items-center justify-between">
          <div className="col-lg-3 col-md-6">
            <Link to={""} className="text-2xl">
              <div className="flex select-none items-baseline gap-x-1 text-3xl font-bold">
                Vibe Wear <div className="rounded-full bg-[#e86f51] p-[3px]" />
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="row justify-content-end justify-content-lg-center">
              <h4 className="link">
                <Link
                  to={""}
                  className={currentPath == "/" ? "active" : ""}
                  onClick={() => {
                    setcurrentPath("/");
                  }}
                >
                  Home
                </Link>
              </h4>
              <h4 className="link">
                <Link
                  to={"shop"}
                  className={currentPath == "/shop" ? "active" : ""}
                  onClick={() => {
                    location.pathname = "/shop";
                    setcurrentPath("/shop");
                  }}
                >
                  Shop
                </Link>
              </h4>
            </div>
          </div>
          <div className="col-lg-3 col-md-12 mt-lg-0 mt-3">
            <div className="flex items-center gap-x-7">
              <ModeToggle />

              <div
                className="btn btn-green btn-font position-relative px-4 py-2"
                onClick={() => {
                  setcurrentPath("/cart");
                  navigate("/cart");
                }}
              >
                <span className="position-absolute bg-danger rounded-circle circlaya h-6 w-6 pt-1">
                  {JSON.parse(localStorage.getItem("CartArray"))?.length
                    ? JSON.parse(localStorage.getItem("CartArray")).length
                    : 0}
                </span>
                <Link to={"cart"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-shopping-cart"
                  >
                    <circle cx="8" cy="21" r="1"></circle>
                    <circle cx="19" cy="21" r="1"></circle>
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                  </svg>
                </Link>
              </div>
              {logged ? (
                <UserMenu setLogged={setLogged} userDetails={userDetails} />
              ) : (
                <Link to="/login">
                  <Button
                    size="lg"
                    className="group gap-x-1.5 rounded-lg bg-[#14532d]"
                  >
                    Login
                    <ArrowRight className="size-3.5 transition-all duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
