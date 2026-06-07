import { memo, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import SectionBadge from "../../components/ui/SectionBadge";
import { testimonialItems } from "../../components/ui/Card";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

const StarIcon = memo(() => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#F59E0B" className="sm:w-5 sm:h-5">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
));

const TestimonialCard = memo(
  ({ item }: { item: (typeof testimonialItems)[0] }) => (
  <div className="mx-1 my-2 flex w-[min(82vw,340px)] shrink-0 flex-col gap-4 rounded-2xl bg-[#F6F6F9] p-5 font-[inter] shadow-md sm:p-6">
    <div className="flex items-center gap-0.5">
      {Array.from({ length: item.rating }).map((_, i) => (
        <StarIcon key={i} />
      ))}
    </div>
    <p className="text-sm text-gray-700 leading-relaxed sm:text-base">{item.review}</p>
      <div className="flex items-center gap-3 mt-auto pt-3 border-t border-gray-100">
      <img
        src={item.avatar}
        alt={item.name}
        className="w-11 h-11 rounded-full object-cover sm:w-12 sm:h-12"
      />
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-900 sm:text-base">{item.name}</span>
        <span className="text-xs text-gray-500 sm:text-sm">
          {item.role} at {item.company}
        </span>
      </div>
    </div>
  </div>
  ),
);

const track = [...testimonialItems, ...testimonialItems];

const ClientReviews = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="mx-auto my-14 w-full max-w-6xl overflow-hidden px-4 sm:my-10 sm:mt-37 sm:px-0">
      <motion.div
        className="my-6 flex flex-col items-center justify-center font-[Syne]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.div variants={fadeUp} custom={0}>
          <SectionBadge label="Feedback" />
        </motion.div>
        <motion.h1
          className="mt-2 text-center font-[Syne] text-xl sm:text-2xl"
          variants={fadeUp}
          custom={1}
        >
          Feedback from
        </motion.h1>
        <motion.span
          className="font-[Syne] text-xl sm:text-2xl"
          variants={fadeUp}
          custom={2}
          style={{
            background: "linear-gradient(to bottom, #2F2F82, #AD72FF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Our clients
        </motion.span>
      </motion.div>

      <div ref={containerRef} className="relative w-full overflow-hidden">
        <div className="ml-2 flex items-center gap-3 sm:ml-12">
          <span
            className="w-3 h-3 rounded-full "
            style={{
              background: "linear-gradient(to right, #5A4B99, #FDCD86)",
            }}
          ></span>
          <p className="text-sm">Client feedback</p>
        </div>
        <div
          className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-10 sm:w-24"
          style={{
            background: "linear-gradient(to right, white, transparent)",
          }}
        />
        <div
          className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-10 sm:w-24"
          style={{ background: "linear-gradient(to left, white, transparent)" }}
        />

        <motion.div
          className="flex w-max gap-3 sm:gap-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 18,
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

export default memo(ClientReviews);
