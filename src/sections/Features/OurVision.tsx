import React from "react";
import VisionVideo from "../../assets/About Image (1).png";
import SectionBadge from "../../components/ui/SectionBadge";
import ExpandingCard from "../../components/ui/SliderBar";
import Positive from "../../assets/positive.svg";
import Worked from "../../assets/worked.svg";
import Partner from "../../assets/partner.svg";

const OurVision = () => {
  return (
    <div className="w-full max-w-5xl mx-auto my-10">
      <div className=" space-y-3">
        <div className="flex items-center gap-3">
          <span
            className="w-3 h-3 rounded-full "
            style={{
              background: "linear-gradient(to right, #5A4B99, #FDCD86)",
            }}
          ></span>
          <p>Client feedback</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Image  */}
          <div className="w-full h-100 relative">
            <img src={VisionVideo} alt="" />

            <div
              className="absolute pointer-events-none z-0"
              style={{
                width: "300px",
                height: "500px",
                bottom: -200,
                left: 0,
                background: "#FFC46A42",
                filter: "blur(80px)",
                borderRadius: "100%",
              }}
            />
          </div>

          {/* left grid */}

          <div className="mt-20 pl-6 space-y-4 relative ">
            <SectionBadge label="Vision" />

            <p className="text-xs max-w-xs text-gray-700 leading-loose">
              “We’re a Digital agency driven by design, strategy, and
              storytelling. Our mission is to help brands stand out through bold
              ideas,.’’
            </p>

            <div className="my-10">
              <ExpandingCard
                title="C.E.O Aderinto Samson"
                startWidth="80%"
                colorFrom="#FFDFAF"
                colorTo="#B5B5FF1A"
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center text-[10px] gap-1 ">
                <span className="p-1  text-gray-700 border border-[#FBB040] rounded-md">
                  <img src={Partner} className="w-2.5" alt="" />
                </span>
                Worked with 100+ client
              </div>
              <div className="flex items-center text-[10px] gap-1 ">
                <span className="p-1  text-gray-700 border border-[#FBB040] rounded-md">
                  <img src={Worked} className="w-2.5" alt="" />
                </span>
                Worked with 100+ client
              </div>
              <div className="flex items-center text-[10px] gap-1 ">
                <span className="p-1  text-gray-700 border border-[#FBB040] rounded-md">
                  <img src={Positive} className="w-2.5" alt="" />
                </span>
                90% Positive responses
              </div>
            </div>

            <div
              className="absolute pointer-events-none z-0"
              style={{
                width: "300px",
                height: "500px",
                bottom: -200,
                left: 0,
                background: "#B5B5FF59",
                filter: "blur(70px)",
                borderRadius: "100%",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurVision;
