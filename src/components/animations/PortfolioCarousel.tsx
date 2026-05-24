import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

type PortfolioCarouselProps<T> = {
  className?: string;
  intervalMs?: number;
  items: T[];
  itemKey: (item: T) => string | number;
  renderItem: (item: T, index: number, isShortPosition: boolean) => ReactNode;
  visibleCount?: number;
};

export default function PortfolioCarousel<T>({
  className = "",
  intervalMs = 2800,
  items,
  itemKey,
  renderItem,
  visibleCount = 4,
}: PortfolioCarouselProps<T>) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;

    const intervalId = setInterval(() => {
      setOffset((currentOffset) => (currentOffset + 1) % items.length);
    }, intervalMs);

    return () => clearInterval(intervalId);
  }, [intervalMs, items.length]);

  const visibleItems = useMemo(
    () =>
      Array.from({ length: Math.min(visibleCount, items.length) }, (_, index) =>
        items[(index + offset) % items.length],
      ),
    [items, offset, visibleCount],
  );

  return (
    <div className={className}>
      <AnimatePresence initial={false} mode="popLayout">
        {visibleItems.map((item, index) => (
          <motion.div
            key={itemKey(item)}
            layout
            initial={{ opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -48 }}
            transition={{
              opacity: { duration: 0.22, ease: "easeOut" },
              x: { duration: 0.36, ease: [0.22, 1, 0.36, 1] },
              layout: {
                duration: 0.38,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
          >
            {renderItem(item, index, index === 0 || index === 2)}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
