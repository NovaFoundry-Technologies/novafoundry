import React, { memo, useEffect, useRef, useState } from "react";
import SectionBadge from "../../components/ui/SectionBadge";

interface Stat {
  value: string;
  number: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: "8K+", number: 8, suffix: "K+", label: "Brands Designed" },
  { value: "46%", number: 46, suffix: "%", label: "Conversion Rate" },
  { value: "5.3K+", number: 5.3, suffix: "K+", label: "Projects Delivered" },
  { value: "100+", number: 100, suffix: "+", label: "Measurable Results" },
];

const useCountUp = (target: number, duration = 1800, started: boolean) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * target).toFixed(1)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return count;
};

const StatItem = memo(({
  stat,
  started,
  index,
}: { stat: Stat; started: boolean; index: number }) => {
  const count = useCountUp(stat.number, 1800 + index * 200, started);
  const display =
    stat.suffix === "%"
      ? `${Math.round(count)}%`
      : stat.suffix === "K+"
        ? `${count % 1 === 0 ? count.toFixed(0) : count.toFixed(1)}K+`
        : `${Math.round(count)}+`;

  return (
    <div className="flex flex-col items-center gap-1 flex-1 min-w-0">
      <span
        className="font-[inter] text-xl font-bold tracking-tight text-gray-900 sm:text-4xl"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {started ? display : stat.value}
      </span>
      <span className="text-center font-[inter] text-[10px] leading-tight text-gray-500 sm:whitespace-nowrap sm:text-xs">
        {stat.label}
      </span>
    </div>
  );
});

const StatDivider = memo(() => <div className="h-7 w-px shrink-0 sm:h-8" />);

const ProjectMethod = () => {
  const [started, setStarted] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.4 },
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="who-we-are"
      className="relative mx-auto my-8 w-full max-w-6xl scroll-mt-24 px-4 max-sm:overflow-x-clip sm:my-4 sm:px-2"
    >
      {/* Grid */}
      <div className="mb-6 grid grid-cols-1 items-center gap-4 text-center sm:mb-10 sm:grid-cols-2 sm:gap-6 sm:text-left lg:grid-cols-3">
        <div className="flex flex-col items-center space-y-3 sm:items-start sm:space-y-4">
          <SectionBadge label="Who we are" />
          <h1 className="bg-gradient-to-r from-[#1b1d2a] via-[#2f3554] to-[#7c4dff] bg-clip-text font-[Syne] text-xl font-semibold text-transparent sm:text-2xl">
            Novafoundry's Method
          </h1>
        </div>

        <div>
          <p className="mx-auto max-w-md font-[Syne] text-xs leading-loose text-gray-700 sm:mx-0 sm:text-sm">
            We're a Digital agency driven by design, strategy, and storytelling.
            Our mission is to help brands stand out through bold ideas,
            thoughtful design, and impactful digital experiences.
          </p>
        </div>

        <div className="pointer-events-none relative z-0 hidden h-32 sm:block lg:h-full">

            <div
            className="absolute pointer-events-none z-30"
            style={{
              width: "260px",
              height: "260px", 
              top: "80%",
              left: "30%",
              transform: "translate(-50%, -50%)",
              background: "#FFC46A42",
              filter: "blur(50px)",
            }}
          />
          <div
            className="absolute pointer-events-none z-30"
            style={{
              width: "260px",
              height: "260px", 
              top: "60%",
              left: "90%",
              transform: "translate(-50%, -50%)",
              background: "#8CD5FE3D",
              filter: "blur(50px)",
            }}
          />
        </div>
      </div>

      <div
        ref={statsRef}
        className="relative z-10 w-full overflow-hidden rounded-2xl px-2 py-4 sm:overflow-visible sm:px-6 sm:py-6"
      >
        <div className="absolute inset-0 rounded-2xl" />

        <div className="absolute top-0 left-6 right-6 h-px" />

        <div className="relative z-20 flex items-center justify-between gap-2 sm:gap-4">
          {stats.map((stat, i) => (
            <React.Fragment key={stat.label}>
              <StatItem stat={stat} started={started} index={i} />
              {i < stats.length - 1 && <StatDivider />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(ProjectMethod);
