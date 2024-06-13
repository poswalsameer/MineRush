"use client";

import React from "react";

function ReShuffle() {
  return (
    <div className=" h-24 w-72 bg-[#1A2C38] border-[3px] border-[#557086] rounded-xl absolute top-[45%] left-[45%] ">
      <div className="h-full w-full flex justify-center items-center">

        <h1 className="font-extrabold text-white">Re-shuffling the board</h1>

        <div className=" mx-4 loader-wrapper">
          <span className="loader">
            <span className="loader-inner"></span>
          </span>
        </div>

      </div>
    </div>
  );
}

export default ReShuffle;
