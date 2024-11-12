import { Spinner } from "@material-tailwind/react";
import React from "react";

export default function PendingPage() {
  return (
    <div className="absolute h-screen flex items-center justify-center w-screen bg-gray-50 z-10 dark:bg-gray-800 transition-colors duration-300">
      <Spinner color="gray" className="h-16 w-16 z-20" />
    </div>
  );
}
