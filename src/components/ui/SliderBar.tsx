import React, { useEffect, useRef, useState } from "react";

interface ExpandingCardProps {
  title: string;
  onClick?: () => void;
  startWidth?: string;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
}

const ExpandingCard: React.FC<ExpandingCardProps> = ({
  title,
  onClick,
  startWidth = "40%",
  delay = 0,
  colorFrom = "#FFDFAF",
  colorTo = "#B5B5FF1A",
}) => {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) {
          setVisible(true);
          setTimeout(() => {
            setExpanded(true);
            // hold at full width for 1.2s then slowly collapse back
            setTimeout(() => setExpanded(false), 1200);
          }, delay);
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [visible, delay]);

  const isWide = expanded || hovered;

  return (
    <div ref={ref} className="w-full flex justify-start">
      <div
        className="overflow-hidden rounded-full"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: isWide ? "100%" : startWidth,
          background: `linear-gradient(105deg, ${colorFrom} 0%, ${colorTo} 100%)`,
          boxShadow: isWide
            ? `0 0 40px ${colorFrom}60, 0 0 80px ${colorTo}`
            : "none",
          opacity: visible ? 1 : 0.6,
          // expand: 1400ms   collapse: 1200ms — both very slow and cinematic
          transition: `width ${isWide ? 1400 : 1200}ms cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 800ms ease-out, opacity 600ms ${delay}ms ease-out`,
        }}
      >
        <div className="flex w-full items-center justify-between gap-4 px-5 py-4">
          <span
            className="whitespace-nowrap text-sm font-medium text-gray-700"
            style={{
              opacity: visible ? 1 : 0,
              transition: `opacity 500ms ${delay + 400}ms ease-out`,
            }}
          >
            {title}
          </span>

          <button
            className="flex items-center justify-center rounded-full active:scale-95 hover:brightness-105 transition-transform duration-150"
            onClick={onClick}
            style={{
              width: "50px",
              height: "40px",
              flexShrink: 0,
              background: "linear-gradient(160deg, #f5f5f8 0%, #e8e8ef 100%)",
              boxShadow:
                "0 2px 0 rgba(255,255,255,0.9) inset, 0 -1px 0 rgba(0,0,0,0.08) inset, 0 3px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)",
              border: "0.5px solid rgba(0,0,0,0.06)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="#555"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpandingCard;
