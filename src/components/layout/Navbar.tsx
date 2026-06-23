import { memo, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import Logo from "../../assets/novahero.png";
import Button from "../ui/Button";

type NavItem = {
  label: string;
  targetId?: string;
  href?: string;
};

const navItems: NavItem[] = [
  { label: "Home", targetId: "home" },
  { label: "About", targetId: "about" },
  { label: "Service", targetId: "services" },
  { label: "Internship", href: "/internship" },
  { label: "Contact", targetId: "contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    let animationFrameId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    };

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollToSection = (targetId: string) => {
    const target = document.getElementById(targetId);
    if (!target) return;

    setMenuOpen(false);
    lenisRef.current?.scrollTo(target, { offset: -96 });
  };

  return (
    <div
      className={`
        fixed top-0 left-0 right-0
        w-full z-50
        border-b border-gray-300
      `}
    >
      <div
        className={`
          w-full
          bg-white
          border-b border-gray-100
          shadow-[0px_1px_2px_rgba(16,24,40,0.04),0px_6px_12px_rgba(16,24,40,0.06)]
        `}
      >
        <div className="flex justify-between items-center py-2 px-4 max-w-5xl mx-auto">
          <motion.img
            src={Logo}
            className="h-9 sm:h-10"
            alt="nova logo"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          />

          <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-black">
            {navItems.map((item, i) => (
              <li key={item.label}>
                <motion.a
                  href={item.href}
                  className="relative cursor-pointer py-1 block"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.2 + i * 0.08,
                    ease: "easeOut",
                  }}
                  onHoverStart={() => setHoveredItem(item.label)}
                  onHoverEnd={() => setHoveredItem(null)}
                  onClick={(e) => {
                    if (item.targetId) {
                      e.preventDefault();
                      scrollToSection(item.targetId);
                    }
                  }}
                >
                  <motion.span
                    animate={{
                      color: hoveredItem === item.label ? "#000000" : "#111827",
                    }}
                    transition={{ duration: 0.15 }}
                  >
                    {item.label}
                  </motion.span>
                  <motion.span
                    className="absolute bottom-0 left-0 h-[1.5px] rounded-full"
                    style={{ background: "#B5B5FF" }}
                    initial={{ width: "0%" }}
                    animate={{ width: hoveredItem === item.label ? "100%" : "0%" }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  />
                </motion.a>
              </li>
            ))}
          </ul>

          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
          >
            <Button />
          </motion.div>

          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden flex flex-col gap-[5px] p-2.5 rounded-lg hover:bg-gray-100 transition-colors min-h-[44px] min-w-[44px] items-center justify-center"
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-[22px] h-[2px] bg-orange-400 rounded origin-center"
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              className="block w-[22px] h-[2px] bg-orange-400 rounded"
              animate={
                menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }
              }
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-[22px] h-[2px] bg-orange-400 rounded origin-center"
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden mt-2"
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "top right" }}
          >
            <div
              className="rounded-2xl overflow-hidden border border-[#B5B5FF40] ml-auto"
              style={{
                width: "min(100%, 240px)",
                marginLeft: "auto",
                background: "rgba(181, 181, 255, 0.12)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                boxShadow:
                  "0 8px 32px rgba(181,181,255,0.18), 0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              <ul className="flex flex-col gap-0.5 p-2">
                {navItems.map((item, i) => (
                  <li key={item.label}>
                    <motion.a
                      href={item.href}
                      className="block cursor-pointer rounded-xl px-4 py-2.5 text-sm font-medium text-[#4a4a8a] hover:bg-[#B5B5FF22] transition-colors"
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.2,
                        delay: i * 0.05,
                        ease: "easeOut",
                      }}
                      onClick={(e) => {
                        if (item.targetId) {
                          e.preventDefault();
                          scrollToSection(item.targetId);
                        }
                      }}
                    >
                      {item.label}
                    </motion.a>
                  </li>
                ))}
              </ul>

              <div className="px-3 pb-3 pt-1 border-t border-[#B5B5FF30] flex justify-center">
                <Button />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(Navbar);
