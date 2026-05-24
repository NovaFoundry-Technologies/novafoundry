import SectionBadge from "../../components/ui/SectionBadge";
import ExpandingCard from "../../components/ui/SliderBar";

const ExpertServices = () => {
  return (
    <div className="mx-auto my-14 min-h-0 w-full max-w-3xl px-4 max-sm:overflow-x-clip sm:my-6 sm:min-h-[50vh]">
      <div className="flex justify-center items-center">
        <SectionBadge label="What we do" />
      </div>
      <div className="mt-2 text-center font-[Syne] text-xl leading-tight sm:text-2xl">
        <p>Expert Services Designed to</p>
        <p className="bg-gradient-to-r from-[#6b5bd6] via-[#8c5cf6] to-[#a56dff] bg-clip-text text-transparent">
          Empower You
        </p>
      </div>
      <div className="pointer-events-none relative z-0 hidden h-32 sm:block lg:h-full">
        <div
          className="absolute pointer-events-none z-30"
          style={{
            width: "360px",
            height: "260px",
            top: "80%",

            transform: "translate(-50%, -50%)",
            background: "#FFC46A42",
            filter: "blur(50px)",
          }}
        />
        <div
          className="absolute pointer-events-none z-30"
          style={{
            width: "360px",
            height: "260px",
            top: "90%",
            left: "30%",
            transform: "translate(-50%, -50%)",
            background: "#8CD5FE3D",
            filter: "blur(50px)",
          }}
        />
        <div
          className="absolute pointer-events-none z-30"
          style={{
            width: "360px",
            height: "260px",
            top: "60%",
            left: "100%",
            transform: "translate(-50%, -50%)",
            background: "#8CD5FE3D",
            filter: "blur(50px)",
          }}
        />
      </div>
      <div className="relative my-6 flex w-full flex-col gap-3 max-sm:overflow-hidden">
        <ExpandingCard
          startWidth="60%"
          title="Product Design"
          colorFrom="#FFDFAF"
          colorTo="#B5B5FF1A"
          delay={0}
        />

        <div className="w-full rounded-full border border-[#B5B5FF] p-1">
          <ExpandingCard
            startWidth="80%"
            title="Web Design"
            colorFrom="#FFF0D9"
            colorTo="#B5B5FF"
            delay={300}
          />
        </div>

        <ExpandingCard
          startWidth="60%"
          title="UI/UX Design"
          colorFrom="#B5B5FF1A"
          colorTo="#FFE4BB"
          delay={600}
        />

        <ExpandingCard
          startWidth="50%"
          title="Brand Identity"
          colorFrom="#B5B5FF1A"
          colorTo="#B5B5FF"
          delay={900}
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
