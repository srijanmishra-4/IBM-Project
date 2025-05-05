import React from "react";
import { Loader2 } from "lucide-react"; // Optional: for rotating icon (from lucide-react)

const LoaderComponent = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-blue-50 to-blue-100 text-gray-800">
      <Loader2 className="animate-spin w-12 h-12 text-blue-600 mb-4" />
      <h1 className="text-2xl font-semibold animate-pulse text-center px-4">
        Creating your Quiz...
      </h1>
      <p className="mt-2 text-lg font-medium text-gray-600 animate-pulse">
        High-tight Questions on the way!
      </p>
    </div>
  );
};

export default LoaderComponent;
