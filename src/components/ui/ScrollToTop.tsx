import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [0, -6, 0] }}
          exit={{ opacity: 0, y: 20 }}
          transition={{
            opacity: { duration: 0.3, ease: "easeOut" },
            y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
          }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 overflow-hidden
                     rounded-full border border-orange-400/40 bg-orange-50 backdrop-blur-sm
                     text-orange-400 shadow-lg shadow-orange-400/10 px-3 py-2 cursor-pointer"
          aria-label="Back to top"
        >
          <ArrowUp size={16} />

          <AnimatePresence>
            {hovered && (
              <motion.span
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="text-xs font-medium whitespace-nowrap overflow-hidden"
              >
                Scroll to top
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
