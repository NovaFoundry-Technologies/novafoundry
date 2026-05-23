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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) {
          setVisible(true);
          setExpanded(true);
          // after expand (700ms) + hold (400ms), shrink back
          setTimeout(() => setExpanded(false), delay + 700 + 400);
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [visible, delay]);

  const currentWidth = expanded ? "100%" : startWidth;

  return (
    <div ref={ref} className="w-full flex justify-start">
      <div
        className="flex items-center justify-between px-5 py-4 rounded-full"
        style={{
          width: visible ? currentWidth : startWidth,
          background: `linear-gradient(105deg, ${colorFrom} 0%, ${colorTo} 100%)`,
          boxShadow: expanded
            ? `0 0 40px ${colorFrom}60, 0 0 80px ${colorTo}`
            : "none",
          opacity: visible ? 1 : 0.6,
          transition: `width 700ms ${expanded ? delay : 0}ms ease-in-out, box-shadow 700ms ease-out, opacity 500ms ${delay}ms ease-out`,
        }}
      >
        <span
          className="text-sm font-medium text-gray-800"
          style={{
            opacity: visible ? 1 : 0,
            transition: `opacity 400ms ${delay + 300}ms ease-out`,
          }}
        >
          {title}
        </span>

        <button
          onClick={onClick}
          className="flex items-center justify-center rounded-full active:scale-95 hover:brightness-105 transition-transform duration-150"
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
  );
};

export default ExpandingCard;
