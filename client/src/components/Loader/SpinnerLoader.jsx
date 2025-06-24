import React from "react";

const SpinnerLoader = () => {
  return (
    <div role="status" className="flex justify-center items-center">
      <svg
        aria-hidden="true"
        className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-gray-500"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5C100 78.3 77.6 100.5 50 100.5C22.4 100.5 0 78.3 0 50.5C0 22.7 22.4 0.5 50 0.5C77.6 0.5 100 22.7 100 50.5ZM9.1 50.5C9.1 73.3 27.2 91.5 50 91.5C72.8 91.5 90.9 73.3 90.9 50.5C90.9 27.7 72.8 9.5 50 9.5C27.2 9.5 9.1 27.7 9.1 50.5Z"
          fill="currentColor"
        />
        <path
          d="M93.9 39.1C96.8 38.3 98.5 35 97.4 32.2C95.2 26.6 91.8 21.6 87.3 17.5C82.7 13.4 77.1 10.3 71 8.6C68.1 7.8 64.8 9.5 64 12.4C63.2 15.3 64.9 18.6 67.8 19.4C71.9 20.6 75.7 22.7 78.8 25.6C81.8 28.5 84.1 32.1 85.4 36.1C86.3 39 90.2 40.4 93.9 39.1Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
    
  );
};

export default SpinnerLoader;
