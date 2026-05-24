import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../../assets/novahero.png";
import Button from "../ui/Button";

const navItems = ["Who We Are", "What We Do", "Case Studies", "Contact"];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const updateNavbarPosition = () => {
      setIsScrolled(window.scrollY > 8);
    };
    updateNavbarPosition();
    window.addEventListener("scroll", updateNavbarPosition, { passive: true });
    return () => window.removeEventListener("scroll", updateNavbarPosition);
  }, []);

  return (
    <div
      className={`
        fixed top-0 left-0 right-0
        w-full max-w-5xl mx-auto
        z-50 px-3
        ${isScrolled ? "mt-0" : "mt-4"}
      `}
    >
      <motion.div
        className={`
          w-full
          bg-white
          border border-gray-100
          shadow-[0px_1px_2px_rgba(16,24,40,0.04),0px_6px_12px_rgba(16,24,40,0.06)]
          ${isScrolled ? "rounded-b-2xl rounded-t-none" : "rounded-2xl"}
        `}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{
          y: -2,
          boxShadow:
            "0px 2px 4px rgba(16,24,40,0.05),0px 10px 18px rgba(16,24,40,0.08)",
        }}
      >
        <div className="flex justify-between items-center py-2 px-4">
          <motion.img
            src={Logo}
            className="h-10"
            alt="nova logo"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          />

          <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            {navItems.map((item, i) => (
              <motion.li
                key={item}
                className="relative cursor-pointer py-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.2 + i * 0.08,
                  ease: "easeOut",
                }}
                onHoverStart={() => setHoveredItem(item)}
                onHoverEnd={() => setHoveredItem(null)}
              >
                <motion.span
                  animate={{
                    color: hoveredItem === item ? "#111827" : "#4B5563",
                  }}
                  transition={{ duration: 0.15 }}
                >
                  {item}
                </motion.span>
                <motion.span
                  className="absolute bottom-0 left-0 h-[1.5px] rounded-full"
                  style={{ background: "#B5B5FF" }}
                  initial={{ width: "0%" }}
                  animate={{ width: hoveredItem === item ? "100%" : "0%" }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                />
              </motion.li>
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
            className="md:hidden flex flex-col gap-[5px] p-2 rounded-lg hover:bg-gray-100 transition-colors"
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
      </motion.div>

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
                  <motion.li
                    key={item}
                    className="cursor-pointer rounded-xl px-4 py-2.5 text-sm font-medium text-[#4a4a8a] hover:bg-[#B5B5FF22] transition-colors"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.2,
                      delay: i * 0.05,
                      ease: "easeOut",
                    }}
                  >
                    {item}
                  </motion.li>
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

export default Navbar;
