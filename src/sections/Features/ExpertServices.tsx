import React from "react";
import SectionBadge from "../../components/ui/SectionBadge";
import ExpandingCard from "../../components/ui/SliderBar";

const ExpertServices = () => {
  return (
    <div className="max-w-3xl mx-auto my-6 min-h-[50vh] ">
      <div className="flex justify-center items-center">
        <SectionBadge label="What we do" />
      </div>
      <p className="text-2xl my-2 text-center leading-loose">
        Expert Services Designed to Empower You
      </p>

      <div className="flex w-full flex-col gap-3 my-6 relative">
        <ExpandingCard
          startWidth="60%"
          title="Product Design"
          colorFrom="#FFDFAF"
          colorTo="#B5B5FF1A"
        />

        <div className="w-full rounded-full border border-[#B5B5FF] p-1">
          <ExpandingCard
            startWidth="80%"
            title="Web Design"
            colorFrom="#FFF0D9"
            colorTo="#B5B5FF"
          />
        </div>

        <ExpandingCard
          startWidth="60%"
          title="UI/UX Design"
          colorFrom="#B5B5FF1A"
          colorTo="#FFE4BB"
        />
        <ExpandingCard
          startWidth="50%"
          title="Brand Identity "
          colorFrom="#B5B5FF1A"
          colorTo="#B5B5FF  "
        />

        <div
          className="absolute pointer-events-none z-0"
          style={{
            width: "300px",
            height: "300px",
            bottom: 0,
            right: 0,
            background: "#8CD5FE3D",
            filter: "blur(50px)",
          }}
        />
      </div>
    </div>
  );
};

export default ExpertServices;
