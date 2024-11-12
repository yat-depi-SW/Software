import { Spinner } from "@material-tailwind/react";
import React from "react";

export default function BlurSpinner() {
  return (
    <div className=" absolute h-screen items-center flex justify-center w-screen">
      <Spinner className="h-16 w-16 text-gray-900/50 z-20 "/>
      <div className="absolute h-screen w-screen blur-sm z-10 backdrop-blur-sm"></div>
    </div>
  );
}
