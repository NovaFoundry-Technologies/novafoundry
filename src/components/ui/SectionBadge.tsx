import React from "react";
import BadgeDivider from "../../assets/BadgeDivider.svg";

interface SectionBadgeProps {
  label: string;
  className?: string;
}

const SectionBadge: React.FC<SectionBadgeProps> = ({
  label,
  className = "",
}) => {
  return (
    <div
      className={`inline-flex w-fit items-center gap-2 select-none pointer-events-none ${className}`}
    >
      <img src={BadgeDivider} alt="" />

      <span
        className="relative inline-flex items-center px-4 py-2 rounded-full text-sm font-medium"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(255,230,160,0.9) 0%, rgba(255,195,85,0.55) 60%, rgba(255,175,50,0.3) 100%)",
          border: "1px solid rgba(255,210,110,0.6)",
          boxShadow:
            "inset 0 1.5px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(200,120,0,0.08), 0 4px 20px rgba(255,185,60,0.25)",
          color: "#7a4d00",
          letterSpacing: "0.02em",
        }}
      >
        <span
          className="absolute inset-0 rounded-full pointer-events-none z-[1]"
          style={{
            background:
              "radial-gradient(ellipse at 45% 25%, rgba(255,255,255,0.5) 0%, transparent 60%)",
          }}
        />

        <span className="relative z-[2]">{label}</span>
      </span>

      <img src={BadgeDivider} alt="" className="rotate-180" />
    </div>
  );
};

export default SectionBadge;
