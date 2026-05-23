import React, { useRef } from "react";
import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import SectionBadge from "../../components/ui/SectionBadge";
import { testimonialItems } from "../../components/ui/Card";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const TestimonialCard = ({ item }: { item: (typeof testimonialItems)[0] }) => (
  <div className="flex flex-col gap-4 p-6 mx-1 my-2 rounded-2xl bg-white shrink-0 w-[340px] shadow-md font-[inter]">
    <div className="flex items-center gap-0.5">
      {Array.from({ length: item.rating }).map((_, i) => (
        <StarIcon key={i} />
      ))}
    </div>
    <p className="text-sm text-gray-600 leading-relaxed ">{item.review}</p>
    <div className="flex items-center gap-3 mt-auto pt-2 border-t border-gray-50">
      <img
        src={item.avatar}
        alt={item.name}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-900">{item.name}</span>
        <span className="text-xs text-gray-400">
          {item.role} at {item.company}
        </span>
      </div>
    </div>
  </div>
);

const track = [...testimonialItems, ...testimonialItems];

const ClientReviews = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full max-w-6xl mx-auto my-10 overflow-hidden mt-47">
      <motion.div
        className="flex flex-col justify-center items-center font-[Syne] my-6 "
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.div variants={fadeUp} custom={0}>
          <SectionBadge label="Feedback" />
        </motion.div>
        <motion.h1
          className="text-2xl text-center mt-2 "
          variants={fadeUp}
          custom={1}
        >
          What Our Clients Say About
        </motion.h1>
        <motion.span
          className="text-2xl"
          variants={fadeUp}
          custom={2}
          style={{
            background: "linear-gradient(to bottom, #2F2F82, #AD72FF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Working With Us
        </motion.span>
      </motion.div>

      <div ref={containerRef} className="relative w-full overflow-hidden">
        <div className="ml-12 flex items-center gap-3">
          <span
            className="w-3 h-3 rounded-full "
            style={{
              background: "linear-gradient(to right, #5A4B99, #FDCD86)",
            }}
          ></span>
          <p>Client feedback</p>
        </div>
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, white, transparent)",
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, white, transparent)" }}
        />

        <motion.div
          className="flex gap-6 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 28,
            ease: "linear",
            repeat: Infinity,
          }}
          whileHover={{ animationPlayState: "paused" }}
        >
          {track.map((item, i) => (
            <TestimonialCard key={`${item.id}-${i}`} item={item} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ClientReviews;
