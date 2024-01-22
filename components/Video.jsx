import React from "react";
import { PiYoutubeLogoLight } from "react-icons/pi";
import Iframe from "react-iframe";

const video = () => {
  return (
    <div id="services" className="container mx-auto text-black p-5 ">
      <div className="grid justify-items-center  ">
        <div className="grid text-center text-2xl text-black  p-4 ">
          <h2 className="p-4">Os planos na pratica!</h2>
          <div className="flex items-center justify-center ">
            <PiYoutubeLogoLight />
            <p className="p-2">Video demonstrativo</p>
          </div>
        </div>
        <div className="justify-center w-full h-[550px] lg:w-2/3">
          <Iframe
            url="https://www.youtube.com/embed/HWJ7FI6ieCA"
            width="100%"
            height="100%"
            className="rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default video;
