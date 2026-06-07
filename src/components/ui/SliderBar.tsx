import React, { memo, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

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
  const [isMobile, setIsMobile] = useState(false);
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const touchPreviewTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const prefersReducedMotion = useReducedMotion();
  const productItems =
    products ?? (Array.isArray(product) ? product : product ? [product] : []);

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

  useEffect(() => {
    return () => {
      if (touchPreviewTimerRef.current) {
        clearTimeout(touchPreviewTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const updateViewportState = () => setIsMobile(mediaQuery.matches);

    updateViewportState();
    mediaQuery.addEventListener("change", updateViewportState);

    return () => mediaQuery.removeEventListener("change", updateViewportState);
  }, []);

  useEffect(() => {
    if (!isMobile || productItems.length <= 1) return;

    const rotationTimer = window.setInterval(() => {
      setActiveProductIndex((currentIndex) =>
        (currentIndex + 1) % productItems.length,
      );
    }, 2400);

    return () => window.clearInterval(rotationTimer);
  }, [isMobile, productItems.length]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "touch" && event.pointerType !== "pen") return;

    setHovered(true);

    if (touchPreviewTimerRef.current) {
      clearTimeout(touchPreviewTimerRef.current);
    }

    touchPreviewTimerRef.current = setTimeout(() => {
      setHovered(false);
    }, 2800);
  };

  const isWide = expanded || hovered;
  const currentWidth = isWide ? "100%" : startWidth;
  const activeProduct =
    productItems.length > 0
      ? productItems[activeProductIndex % productItems.length]
      : undefined;
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
        className="relative min-h-16 rounded-full sm:min-h-[72px]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onPointerDown={handlePointerDown}
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
          className="pointer-events-none absolute inset-0 z-20 grid w-full grid-cols-[minmax(6.5rem,7.5rem)_minmax(0,1fr)_44px] items-center gap-2 overflow-hidden px-4 py-3 sm:grid-cols-[minmax(9.5rem,11.5rem)_minmax(0,1fr)_50px] sm:gap-4 sm:px-5 sm:py-4"
          style={productRevealStyle}
        >
          <div className="col-start-2 hidden min-w-0 items-center gap-x-4 overflow-hidden sm:flex">
            {productItems.map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap text-sm font-normal font-[inter] font text-gray-500"
              >
                <span className="size-1.5 shrink-0 rounded-full bg-gray-500" />
                {item}
              </span>
            ))}
          </div>

          <div className="col-start-2 flex min-w-0 items-center overflow-hidden sm:hidden">
            <AnimatePresence mode="wait" initial={false}>
              {activeProduct ? (
                <motion.span
                  key={`${activeProduct}-${activeProductIndex}`}
                  className="inline-flex min-w-0 items-center gap-2 text-sm font-normal text-gray-500"
                  initial={{
                    opacity: 0,
                    y: prefersReducedMotion ? 0 : 4,
                  }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    y: prefersReducedMotion ? 0 : -4,
                  }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.45,
                    ease: "easeOut",
                  }}
                >
                  <span className="size-1.5 shrink-0 rounded-full bg-gray-500" />
                  <span className="min-w-0 truncate">{activeProduct}</span>
                </motion.span>
              ) : null}
            </AnimatePresence>
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
            className="pointer-events-auto flex h-10 w-11 items-center justify-center rounded-full transition-transform duration-150 hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 active:scale-95 sm:w-[50px]"
            onClick={onClick}
            style={{
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
