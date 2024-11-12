import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-9xl font-bold text-blue-600">404</h1>
      <div className="w-24 h-1 bg-blue-600 my-8 rounded-full"></div>
      <h2 className="logo text-3xl font-bold text-gray-800 mb-4">Page Not Found</h2>
      <p className="text-gray-600 max-w-md mb-8">
        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
      </p>
      <Link to="/">
      <Button className="group gap-x-2 px-5 rounded-lg">
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
        Back to Home
      </Button>
      </Link>
    </div>

  );
};

export default NotFound;
