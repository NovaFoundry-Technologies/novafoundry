import React, { memo, useEffect, useRef, useState } from "react";

interface ExpandingCardProps {
  title: string;
  product?: string | string[];
  products?: string[];
  onClick?: () => void;
  startWidth?: string;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
}

const ExpandingCard: React.FC<ExpandingCardProps> = ({
  title,
  product,
  products,
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
  const currentWidth = isWide ? "100%" : startWidth;
  const productItems =
    products ?? (Array.isArray(product) ? product : product ? [product] : []);
  const widthTransition = `width ${isWide ? 1400 : 1200}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
  const buttonMaskOffset = "70px";
  const productRevealStyle = {
    opacity: visible ? 1 : 0,
    clipPath: `inset(0 calc(100% - ${currentWidth} + ${buttonMaskOffset}) 0 0)`,
    transition: `clip-path ${isWide ? 1400 : 1200}ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 500ms ${delay + 400}ms ease-out`,
  };

  return (
    <div ref={ref} className="w-full">
      <div
        className="relative min-h-[72px] rounded-full"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="absolute inset-y-0 left-0 z-10 overflow-hidden rounded-full"
          style={{
            width: currentWidth,
            background: `linear-gradient(105deg, ${colorFrom} 0%, ${colorTo} 100%)`,
            boxShadow: isWide
              ? `0 0 40px ${colorFrom}60, 0 0 80px ${colorTo}`
              : "none",
            opacity: visible ? 1 : 0.6,
            transition: `${widthTransition}, box-shadow 800ms ease-out, opacity 600ms ${delay}ms ease-out`,
          }}
        >
          <div className="flex h-full w-full items-center px-5 py-4">
            <span className="whitespace-nowrap text-sm font-medium text-gray-700">
              {title}
            </span>
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-20 grid w-full grid-cols-[minmax(7.5rem,9.5rem)_minmax(0,1fr)_50px] items-center gap-3 overflow-hidden px-5 py-4 sm:grid-cols-[minmax(9.5rem,11.5rem)_minmax(0,1fr)_50px] sm:gap-4"
          style={productRevealStyle}
        >
          <div className="col-start-2 flex min-w-0 items-center gap-x-4 overflow-hidden">
            {productItems.map((item) => (
              <span
                key={item}
                className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap text-sm font-normal font-[inter] font text-gray-500"
              >
                <span className="size-1.5 shrink-0 rounded-full bg-gray-500" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-30 flex items-center justify-end overflow-hidden rounded-full px-5 py-4"
          style={{
            width: currentWidth,
            transition: widthTransition,
          }}
        >
          <button
            className="pointer-events-auto flex items-center justify-center rounded-full transition-transform duration-150 hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 active:scale-95"
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

export default memo(ExpandingCard);
