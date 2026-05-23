import React, { useEffect, useRef, useState } from "react";

interface ExpandingCardProps {
  title: string;
  onClick?: () => void;
  startWidth?: string;
  delay?: number; // stagger delay in ms, default 0
}

const ExpandingCard: React.FC<ExpandingCardProps> = ({
  title,
  startWidth,
  onClick,
  delay = 0,
}) => {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [collapsedWidth, setCollapsedWidth] = useState(startWidth ?? "0px");
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (startWidth || !contentRef.current) return;

    const updateCollapsedWidth = () => {
      if (!contentRef.current) return;
      setCollapsedWidth(`${contentRef.current.scrollWidth + 4}px`);
    };

    updateCollapsedWidth();
    window.addEventListener("resize", updateCollapsedWidth);

    return () => window.removeEventListener("resize", updateCollapsedWidth);
  }, [startWidth, title]);

  return (
    <div ref={ref} className="w-full flex justify-start">
      <div
        className="overflow-hidden rounded-full"
        onMouseEnter={() => setExpanded(true)}
        style={{
          width: expanded ? "100%" : collapsedWidth,
          background: expanded
            ? "linear-gradient(105deg, #FFDFAF 0%, rgba(181,181,255,0.4) 60%, rgba(181,181,255,0.1) 100%)"
            : "linear-gradient(105deg, #FFDFAF 0%, rgba(181,181,255,0.15) 100%)",
          boxShadow: expanded
            ? "0 0 40px rgba(255,210,150,0.25), 0 0 80px rgba(181,181,255,0.15)"
            : "none",
          opacity: visible ? 1 : 0.6,
          transition: `width 700ms ${delay}ms ease-out, background 700ms ${delay}ms ease-out, box-shadow 700ms ${delay}ms ease-out, opacity 500ms ${delay}ms ease-out`,
        }}
      >
        <div
          ref={contentRef}
          className="flex w-full items-center justify-between gap-4 px-5 py-4"
        >
          <span
            className="whitespace-nowrap text-sm font-medium text-gray-700"
            style={{
              opacity: visible ? 1 : 0,
              transition: `opacity 400ms ${delay + 300}ms ease-out`,
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
              background:
                "linear-gradient(160deg, #f5f5f8 0%, #e8e8ef 100%)",
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
