import React from "react";
import ExpandingCard from "../../components/ui/SliderBar";

const Feedback = () => {
  return (
    <div className="w-full max-w-6xl mx-auto min-h-[50vh] flex flex-col space-y-6">
      <div className="flex justify-between items-center ">
        <div className="flex items-center gap-3">
          <span
            className="w-3 h-3 rounded-full "
            style={{
              background: "linear-gradient(to right, #5A4B99, #FDCD86)",
            }}
          ></span>
          <p>Client feedback</p>
        </div>
        <div className="w-xl">
          <ExpandingCard title="C.O.O Tiwa Ayodeji" />
        </div>
      </div>
      <div className="my-6">
        <div className="w-full h-[50vh] mb-2 border border-[#FFC46A] rounded-2xl"></div>

        <p className="max-w-2xl leading-loose text-sm">
          We’re a creative agency driven by design, strategy, and storytelling.
          Our mission is to help brands stand out through bold ideas, thoughtful
          design, and impactful digital experiences.
        </p>
      </div>
    </div>
  );
};

export default Feedback;
