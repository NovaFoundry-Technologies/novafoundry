import React, { useEffect, useRef, useState } from "react";

interface ExpandingCardProps {
  title: string;
  onClick?: () => void;
  startWidth?: string; // default "40%"
  delay?: number; // stagger delay in ms, default 0
}

const ExpandingCard: React.FC<ExpandingCardProps> = ({
  title,
  startWidth = "40%",
  delay = 0,
}) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full flex justify-start">
      <div
        className="flex items-center justify-between px-5 py-4 rounded-full"
        style={{
          width: visible ? "100%" : startWidth,
          background: visible
            ? "linear-gradient(105deg, #FFDFAF 0%, rgba(181,181,255,0.4) 60%, rgba(181,181,255,0.1) 100%)"
            : "linear-gradient(105deg, #FFDFAF 0%, rgba(181,181,255,0.15) 100%)",
          boxShadow: visible
            ? "0 0 40px rgba(255,210,150,0.25), 0 0 80px rgba(181,181,255,0.15)"
            : "none",
          opacity: visible ? 1 : 0.6,
          transition: `width 700ms ${delay}ms ease-out, background 700ms ${delay}ms ease-out, box-shadow 700ms ${delay}ms ease-out, opacity 500ms ${delay}ms ease-out`,
        }}
      >
        <span
          className="text-sm font-medium text-gray-700"
          style={{
            opacity: visible ? 1 : 0,
            transition: `opacity 400ms ${delay + 300}ms ease-out`,
          }}
        >
          {title}
        </span>

        <button
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
