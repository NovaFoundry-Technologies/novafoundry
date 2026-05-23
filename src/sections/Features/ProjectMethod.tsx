import React from "react";
import SectionBadge from "../../components/ui/SectionBadge";

const ProjectMethod = () => {
  return (
    <section className="w-full max-w-6xl h-[40vh] mx-auto my-4 px-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center gap-6">
        <div className="flex flex-col space-y-4">
          <SectionBadge label="Who we are" />
          <h1 className="text-2xl">Novafoundry's Method</h1>
        </div>

        <div>
          <p className="leading-loose text-sm">
            We're a Digital agency driven by design, strategy, and storytelling.
            Our mission is to help brands stand out through bold ideas,
            thoughtful design, and impactful digital experiences.
          </p>
        </div>

        <div className="relative h-32 lg:h-full">
          <div
            className="absolute pointer-events-none"
            style={{
              width: "260px",
              height: "260px",
              top: "10%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "#8CD5FE3D",
              filter: "blur(40px)",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default ProjectMethod;
