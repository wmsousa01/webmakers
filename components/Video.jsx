import React from "react";
import { PiYoutubeLogoLight } from "react-icons/pi";


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
        <div className="">
          <video
          controls
            src="/assets/videos/video-1.mp4"
            style={{
              width: "100%",
              height: "100%",
            }}
            className="rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default video;
