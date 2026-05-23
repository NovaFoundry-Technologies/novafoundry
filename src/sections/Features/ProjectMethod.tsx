import React, { useEffect, useRef, useState } from "react";
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

const StatItem: React.FC<{ stat: Stat; started: boolean; index: number }> = ({
  stat,
  started,
  index,
}) => {
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
        className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {started ? display : stat.value}
      </span>
      <span className="text-xs text-gray-500 text-center whitespace-nowrap">
        {stat.label}
      </span>
    </div>
  );
};

const StatDivider = () => <div className="w-px h-8 shrink-0" />;

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
    <section className="w-full max-w-6xl mx-auto my-4 px-2">
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center gap-6 mb-10">
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
              top: "60%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "#8CD5FE3D",
              filter: "blur(50px)",
            }}
          />
        </div>
      </div>

      <div
        ref={statsRef}
        className="relative w-full rounded-2xl px-6 py-6 overflow-hidden"
      >
        <div className="absolute inset-0 rounded-2xl" />

        <div className="absolute top-0 left-6 right-6 h-px" />

        <div className="relative flex items-center justify-between gap-4">
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

export default ProjectMethod;
